import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress";
import { BarChart, Bar, PieChart, Pie, Cell, Tooltip, XAxis, YAxis, ResponsiveContainer, LineChart, Line, Area, AreaChart } from "recharts";
import { TrendingUp, Users, MessageSquare, ArrowUpRight } from "lucide-react";

const Dashboard = () => {
  const totalLeads = 120;
  const leadStatus = [
    { name: "Converted", value: 60, color: "bg-emerald-500" },
    { name: "Pending", value: 40, color: "bg-amber-500" },
    { name: "Lost", value: 20, color: "bg-red-500" },
  ];

  const commData = [
    { name: "Calls", value: 50 },
    { name: "Emails", value: 30 },
    { name: "WhatsApp", value: 20 },
  ];

  const conversionTrendData = [
    { week: "Week 1", converted: 10, pending: 8, lost: 2 },
    { week: "Week 2", converted: 18, pending: 12, lost: 5 },
    { week: "Week 3", converted: 35, pending: 25, lost: 8 },
    { week: "Week 4", converted: 45, pending: 28, lost: 10 },
    { week: "Week 5", converted: 55, pending: 35, lost: 15 },
    { week: "Week 6", converted: 60, pending: 40, lost: 20 },
  ];

  const stats = [
    { label: "Total Leads", value: "120", change: "+12%", icon: Users, color: "bg-blue-100 text-blue-600" },
    { label: "Converted", value: "60", change: "+8%", icon: TrendingUp, color: "bg-emerald-100 text-emerald-600" },
    { label: "Messages", value: "156", change: "+24%", icon: MessageSquare, color: "bg-orange-100 text-orange-600" },
  ];

  return (
    <div className="p-8 flex flex-col gap-8 max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="flex flex-col gap-4 mb-6">
        <div>
          <span className="text-xs font-bold uppercase text-orange-600 tracking-widest">CRM Overview</span>
          <h1 className="text-4xl font-bold text-gray-900 mt-2 leading-tight">
            Manage your sales pipeline with ease
          </h1>
        </div>
        <p className="text-lg text-gray-600 max-w-2xl">
          Track your leads, monitor conversion trends, and optimize your communication channels in real-time.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                  <ArrowUpRight className="w-3 h-3" /> {stat.change}
                </span>
              </div>
              <p className="text-sm text-gray-600 font-medium">{stat.label}</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lead Status Distribution */}
        <Card className="lg:col-span-1 bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
          <CardHeader className="border-b border-gray-100">
            <CardTitle className="flex items-center gap-2 text-lg">
              <TrendingUp className="w-5 h-5 text-orange-600" />
              Lead Status
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-6">
              <div className="text-center mb-6">
                <p className="text-sm text-gray-600 font-medium">Total Leads</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{totalLeads}</p>
              </div>
              {leadStatus.map((status, idx) => (
                <ProgressBar
                  key={idx}
                  label={status.name}
                  value={status.value}
                  max={totalLeads}
                  color={status.color}
                  showPercentage={true}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Lead Conversion Trend */}
        <Card className="lg:col-span-2 bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
          <CardHeader className="border-b border-gray-100">
            <CardTitle className="text-lg">Lead Conversion Trend</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={conversionTrendData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                <defs>
                  <linearGradient id="colorConverted" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorPending" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="week" stroke="#9ca3af" style={{ fontSize: "12px" }} />
                <YAxis stroke="#9ca3af" style={{ fontSize: "12px" }} />
                <Tooltip contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb", borderRadius: "8px" }} />
                <Area type="monotone" dataKey="converted" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorConverted)" name="Converted" />
                <Area type="monotone" dataKey="pending" stroke="#f59e0b" strokeWidth={2} fillOpacity={1} fill="url(#colorPending)" name="Pending" />
                <Line type="monotone" dataKey="lost" stroke="#ef4444" strokeWidth={2} name="Lost" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Communication Channels */}
        <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
          <CardHeader className="border-b border-gray-100">
            <CardTitle className="text-lg">Communication Channels</CardTitle>
          </CardHeader>
          <CardContent className="pt-6 flex justify-center">
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie data={commData} dataKey="value" nameKey="name" outerRadius={100} label>
                  {commData.map((_, index) => (
                    <Cell key={index} fill={["#6366f1", "#10b981", "#f59e0b"][index % 3]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb", borderRadius: "8px" }} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Communication Distribution */}
        <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
          <CardHeader className="border-b border-gray-100">
            <CardTitle className="text-lg">Communication Distribution</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-6">
              {commData.map((comm, idx) => (
                <ProgressBar
                  key={idx}
                  label={comm.name}
                  value={comm.value}
                  max={100}
                  color={["bg-indigo-600", "bg-emerald-500", "bg-amber-500"][idx]}
                  showPercentage={true}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
