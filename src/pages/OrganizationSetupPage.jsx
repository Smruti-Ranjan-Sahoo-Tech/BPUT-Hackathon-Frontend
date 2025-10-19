import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  getCurrentUser,
  createOrganization,
  updateUser,
  getUsers,
  setCurrentUser,
} from "@/lib/storage";
import { useNavigate } from "react-router-dom";

export default function OrganizationSetupPage() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUserState] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [adminSetup, setAdminSetup] = useState({
    orgName: "",
    address: "",
    numManagers: "",
  });

  const [managerSetup, setManagerSetup] = useState({
    adminEmail: "",
    orgId: "",
  });

  useEffect(() => {
    // load current user from storage on mount
    const user = getCurrentUser();
    setCurrentUserState(user || null);
    setLoading(false);
  }, []);

  const handleAdminSetup = (e) => {
    e.preventDefault();
    setError("");

    if (!adminSetup.orgName || !adminSetup.address || !adminSetup.numManagers) {
      setError("Please fill in all fields");
      return;
    }

    if (!currentUser) {
      setError("No current user found");
      return;
    }

    // <CHANGE> Using storage utility instead of context
    const org = createOrganization({
      adminId: currentUser.id,
      orgName: adminSetup.orgName,
      address: adminSetup.address,
      numManagers: Number.parseInt(adminSetup.numManagers),
    });

    const updatedUser = updateUser(currentUser.id, {
      role: "admin",
      orgId: org.id,
      setupCompleted: true,
    });

    // persist and update local state
    setCurrentUser(updatedUser);
    setCurrentUserState(updatedUser);

    navigate("/dashboard");
  };

  const handleManagerSetup = (e) => {
    e.preventDefault();
    setError("");

    if (!managerSetup.adminEmail || !managerSetup.orgId) {
      setError("Please fill in all fields");
      return;
    }

    if (!currentUser) {
      setError("No current user found");
      return;
    }

    // <CHANGE> Using storage utility instead of context
    const users = getUsers();
    const admin = users.find((u) => u.email === managerSetup.adminEmail);
    if (!admin) {
      setError("Admin email not found");
      return;
    }

    const updatedUser = updateUser(currentUser.id, {
      role: "manager",
      orgId: managerSetup.orgId,
      setupCompleted: true,
    });

    // persist and update local state
    setCurrentUser(updatedUser);
    setCurrentUserState(updatedUser);

    navigate("/dashboard");
  };

  if (loading) return null;
  if (!currentUser) return null;

  const role = currentUser.role;

  if (role === "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Organization Setup</CardTitle>
            <CardDescription>Enter your organization details</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAdminSetup} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Organization Name
                </label>
                <input
                  type="text"
                  value={adminSetup.orgName}
                  onChange={(e) =>
                    setAdminSetup({ ...adminSetup, orgName: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Your Organization"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Address
                </label>
                <input
                  type="text"
                  value={adminSetup.address}
                  onChange={(e) =>
                    setAdminSetup({ ...adminSetup, address: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="123 Main St, City, State"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Number of Managers
                </label>
                <input
                  type="number"
                  value={adminSetup.numManagers}
                  onChange={(e) =>
                    setAdminSetup({
                      ...adminSetup,
                      numManagers: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="5"
                />
              </div>
              {error && <div className="text-sm text-destructive">{error}</div>}
              <Button type="submit" className="w-full">
                Complete Setup
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (role === "manager") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Manager Setup</CardTitle>
            <CardDescription>Enter your admin details</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleManagerSetup} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Admin Email
                </label>
                <input
                  type="email"
                  value={managerSetup.adminEmail}
                  onChange={(e) =>
                    setManagerSetup({
                      ...managerSetup,
                      adminEmail: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="admin@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Organization ID
                </label>
                <input
                  type="text"
                  value={managerSetup.orgId}
                  onChange={(e) =>
                    setManagerSetup({ ...managerSetup, orgId: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="org_123456"
                />
              </div>
              {error && <div className="text-sm text-destructive">{error}</div>}
              <Button type="submit" className="w-full">
                Complete Setup
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return null;
}
