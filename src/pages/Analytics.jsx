import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, Area, AreaChart } from "recharts";
import { BarChart3, PieChart as PieChartIcon, TrendingUp, Users, MessageSquare } from "lucide-react";

const conversionData = [
  { name: "New", value: 40 },
  { name: "Contacted", value: 30 },
  { name: "Interested", value: 20 },
  { name: "Converted", value: 10 },
];

const commData = [
  { name: "Calls", value: 50 },
  { name: "Emails", value: 30 },
  { name: "WhatsApp", value: 20 },
];

const performanceData = [
  { month: "Jan", leads: 24, converted: 12, pending: 8, lost: 4 },
  { month: "Feb", leads: 34, converted: 18, pending: 12, lost: 4 },
  { month: "Mar", leads: 42, converted: 22, pending: 14, lost: 6 },
  { month: "Apr", leads: 55, converted: 28, pending: 18, lost: 9 },
  { month: "May", leads: 68, converted: 35, pending: 22, lost: 11 },
  { month: "Jun", leads: 85, converted: 42, pending: 28, lost: 15 },
];

const totalLeads = conversionData.reduce((sum, item) => sum + item.value, 0);
const totalComm = commData.reduce((sum, item) => sum + item.value, 0);
const conversionRate = Math.round((conversionData[3].value / totalLeads) * 100);

export default function Analytics() {
  return (
    <div className="p-8 flex flex-col gap-8 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col gap-4">
        <div>
          <span className="text-xs font-bold uppercase text-orange-600 tracking-widest">Analytics & Reports</span>
          <h1 className="text-4xl font-bold text-gray-900 mt-2">Performance Analytics</h1>
        </div>
        <p className="text-lg text-gray-600 max-w-2xl">Comprehensive insights into your sales pipeline, conversion metrics, and communication performance</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-gray-600 font-medium">Total Leads</p>
            <Users className="w-5 h-5 text-orange-100 stroke-orange-600" strokeWidth={1.5} />
          </div>
          <p className="text-4xl font-bold text-gray-900">{totalLeads}</p>
          <p className="text-xs text-gray-500 mt-2">Across all stages</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-gray-600 font-medium">Conversion Rate</p>
            <TrendingUp className="w-5 h-5 text-emerald-600" />
          </div>
          <p className="text-4xl font-bold text-gray-900">{conversionRate}%</p>
          <p className="text-xs text-gray-500 mt-2">{conversionData[3].value} converted leads</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-gray-600 font-medium">Total Communications</p>
            <MessageSquare className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-4xl font-bold text-gray-900">{totalComm}</p>
          <p className="text-xs text-gray-500 mt-2">Across all channels</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Lead Stages Distribution */}
        <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
          <CardHeader className="border-b border-gray-100">
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-orange-600" />
              Lead Stages Distribution
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-6">
              {conversionData.map((stage, idx) => (
                <ProgressBar
                  key={idx}
                  label={stage.name}
                  value={stage.value}
                  max={totalLeads}
                  color={["bg-blue-500", "bg-indigo-500", "bg-purple-500", "bg-emerald-500"][idx]}
                  showPercentage={true}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Communication Channels */}
        <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
          <CardHeader className="border-b border-gray-100">
            <CardTitle className="flex items-center gap-2">
              <PieChartIcon className="w-5 h-5 text-orange-600" />
              Communication Channels
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-6">
              {commData.map((comm, idx) => (
                <ProgressBar
                  key={idx}
                  label={comm.name}
                  value={comm.value}
                  max={totalComm}
                  color={["bg-indigo-600", "bg-emerald-500", "bg-amber-500"][idx]}
                  showPercentage={true}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Performance Trend */}
      <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
        <CardHeader className="border-b border-gray-100">
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-orange-600" />
            Monthly Performance Trend
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={performanceData} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
              <defs>
                <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorConverted" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="month" stroke="#9ca3af" style={{ fontSize: "12px" }} />
              <YAxis stroke="#9ca3af" style={{ fontSize: "12px" }} />
              <Tooltip contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb", borderRadius: "8px" }} />
              <Area type="monotone" dataKey="leads" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#colorLeads)" name="Total Leads" />
              <Area type="monotone" dataKey="converted" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorConverted)" name="Converted" />
              <Line type="monotone" dataKey="pending" stroke="#f59e0b" strokeWidth={2} name="Pending" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Lead Stages Bar Chart */}
      <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
        <CardHeader className="border-b border-gray-100">
          <CardTitle>Lead Stages (Bar Chart)</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={conversionData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
              <XAxis dataKey="name" stroke="#9ca3af" style={{ fontSize: "12px" }} />
              <YAxis stroke="#9ca3af" style={{ fontSize: "12px" }} />
              <Tooltip contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb", borderRadius: "8px" }} />
              <Bar dataKey="value" fill="#6366f1" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Communication Distribution Pie Chart */}
      <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
        <CardHeader className="border-b border-gray-100">
          <CardTitle>Communication Distribution (Pie Chart)</CardTitle>
        </CardHeader>
        <CardContent className="pt-6 flex justify-center">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={commData} dataKey="value" nameKey="name" outerRadius={100} label>
                {commData.map((_, i) => <Cell key={i} fill={["#6366f1", "#10b981", "#f59e0b"][i % 3]} />)}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb", borderRadius: "8px" }} />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
