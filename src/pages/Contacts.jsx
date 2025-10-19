import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, User, Mail, Phone as PhoneIcon, Building2, History, Trash2 } from "lucide-react";

const initialClients = [
  {
    id: 1,
    name: "Rahul Sharma",
    email: "rahul@example.com",
    phone: "9876543210",
    company: "ABC Pvt Ltd",
    notes: "Very responsive client",
    callHistory: ["2025-10-01 Call - positive", "2025-10-05 Email - neutral"],
  },
  {
    id: 2,
    name: "Priya Malhotra",
    email: "priya@example.com",
    phone: "9876500001",
    company: "XYZ Corporation",
    notes: "Interested in premium plan",
    callHistory: ["2025-10-08 Call - interested", "2025-10-12 Email - follow-up"],
  },
];

export default function Contacts() {
  const [clients, setClients] = useState(initialClients);
  const [newClient, setNewClient] = useState({ name: "", email: "", phone: "", company: "", notes: "", callHistory: "" });

  const handleAdd = () => {
    if (newClient.name && newClient.email && newClient.phone && newClient.company) {
      setClients([...clients, { ...newClient, id: Date.now(), callHistory: newClient.callHistory ? [newClient.callHistory] : [] }]);
      setNewClient({ name: "", email: "", phone: "", company: "", notes: "", callHistory: "" });
    }
  };

  const handleDelete = (id) => {
    setClients(clients.filter(c => c.id !== id));
  };

  return (
    <div className="p-8 flex flex-col gap-8 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col gap-4">
        <div>
          <span className="text-xs font-bold uppercase text-orange-600 tracking-widest">Contact Management</span>
          <h1 className="text-4xl font-bold text-gray-900 mt-2">Client & Contacts</h1>
        </div>
        <p className="text-lg text-gray-600 max-w-2xl">Manage your client relationships and maintain all contact information in one place</p>
      </div>

      {/* Quick Stats */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 font-medium">Total Contacts</p>
            <p className="text-4xl font-bold text-gray-900 mt-2">{clients.length}</p>
          </div>
          <User className="w-12 h-12 text-orange-100 stroke-orange-600" strokeWidth={1.5} />
        </div>
      </div>

      {/* Add New Contact Form */}
      <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
        <CardHeader className="border-b border-gray-100">
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5 text-orange-600" />
            Add New Contact
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input placeholder="Full Name" value={newClient.name} onChange={(e) => setNewClient({ ...newClient, name: e.target.value })} className="border-gray-300" />
            <Input placeholder="Email Address" type="email" value={newClient.email} onChange={(e) => setNewClient({ ...newClient, email: e.target.value })} className="border-gray-300" />
            <Input placeholder="Phone Number" value={newClient.phone} onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })} className="border-gray-300" />
            <Input placeholder="Company Name" value={newClient.company} onChange={(e) => setNewClient({ ...newClient, company: e.target.value })} className="border-gray-300" />
            <Textarea placeholder="Notes & Important Details" value={newClient.notes} onChange={(e) => setNewClient({ ...newClient, notes: e.target.value })} className="border-gray-300 md:col-span-2" />
            <Textarea placeholder="Call History / Interaction" value={newClient.callHistory} onChange={(e) => setNewClient({ ...newClient, callHistory: e.target.value })} className="border-gray-300 md:col-span-2" />
            <Button onClick={handleAdd} className="w-full md:col-span-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold">
              <Plus className="w-4 h-4 mr-2" /> Add Contact
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* All Contacts */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">All Contacts</h2>
          <span className="text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full">{clients.length} contacts</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clients.map((client) => (
            <Card key={client.id} className="bg-white border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-200">
              <CardHeader className="border-b border-gray-100">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-12 h-12 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-lg">
                      {client.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-lg text-gray-900">{client.name}</CardTitle>
                      <p className="text-xs text-gray-500 mt-1 truncate">{client.company}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(client.id)} className="hover:bg-red-50 flex-shrink-0">
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-gray-500 uppercase">Email</p>
                    <a href={`mailto:${client.email}`} className="text-orange-600 hover:text-orange-700 font-medium truncate">
                      {client.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-sm">
                  <PhoneIcon className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-500 uppercase">Phone</p>
                    <a href={`tel:${client.phone}`} className="text-orange-600 hover:text-orange-700 font-medium">
                      {client.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-sm">
                  <Building2 className="w-4 h-4 text-gray-400 flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-500 uppercase">Company</p>
                    <p className="text-gray-900 font-semibold">{client.company}</p>
                  </div>
                </div>

                {client.notes && (
                  <div className="pt-3 border-t border-gray-100">
                    <p className="text-xs font-medium text-gray-500 uppercase mb-1">Notes</p>
                    <p className="text-sm text-gray-700">{client.notes}</p>
                  </div>
                )}

                {client.callHistory.length > 0 && (
                  <div className="pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-2 mb-2">
                      <History className="w-4 h-4 text-gray-500" />
                      <p className="text-xs font-medium text-gray-500 uppercase">Call History</p>
                    </div>
                    <ul className="space-y-1">
                      {client.callHistory.map((entry, idx) => (
                        <li key={idx} className="text-xs text-gray-700 flex items-start">
                          <span className="text-orange-600 mr-2">•</span>
                          <span>{entry}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
