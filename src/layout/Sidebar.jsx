import { NavLink } from "react-router-dom";
import { LayoutDashboard, Users, Phone, MessageSquare, CheckSquare, BarChart3, Settings } from "lucide-react";

const Sidebar = () => {
  const menu = [
    { name: "Dashboard", path: "/", icon: LayoutDashboard },
    { name: "Leads", path: "/leads", icon: Users },
    { name: "Contacts", path: "/contacts", icon: Phone },
    { name: "Communication", path: "/communication", icon: MessageSquare },
    { name: "Tasks", path: "/tasks", icon: CheckSquare },
    { name: "Analytics", path: "/analytics", icon: BarChart3 },
    { name: "Settings", path: "/settings", icon: Settings },
  ];

  return (
    <div className="w-64 h-[calc(100vh-56px)] bg-white border-r border-gray-200 p-6 flex flex-col sticky top-14 shadow-sm">
      <div className="mb-8">
        <h2 className="text-xs font-bold uppercase text-gray-500 tracking-widest">Menu</h2>
      </div>
      
      <nav className="flex flex-col gap-1 flex-1">
        {menu.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive 
                    ? "bg-orange-100 text-orange-700 font-semibold" 
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm">{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="border-t border-gray-200 pt-4">
        <button className="w-full px-4 py-3 rounded-lg bg-orange-600 text-white text-sm font-semibold hover:bg-orange-700 transition-colors duration-200">
          New Lead
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
