
import {
  getCurrentUser,
  getLeads,
  getContacts,
  getCommunicationLogs,
  getTasks,
  getOrganizations,
  getUsers,
} from "@/lib/storage"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

export function DashboardPage() {
  const currentUser = getCurrentUser()
  const leads = getLeads()
  const contacts = getContacts()
  const communicationLogs = getCommunicationLogs()
  const tasks = getTasks()
  const organizations = getOrganizations()
  const users = getUsers()

  const org = currentUser?.role === "admin" ? organizations.find((o) => o.adminId === currentUser.id) : null
  const managers = org ? users.filter((u) => org.managers?.includes(u.id)) : []

  const totalLeads = leads.length
  const convertedLeads = leads.filter((l) => l.stage === "Converted").length
  const pendingFollowUps = tasks.filter((t) => t.status === "pending").length
  const avgSatisfaction =
    communicationLogs.length > 0
      ? ((communicationLogs.filter((l) => l.sentiment === "positive").length / communicationLogs.length) * 100).toFixed(
          1,
        )
      : 0

  const stageData = [
    { name: "New", value: leads.filter((l) => l.stage === "New").length },
    { name: "Contacted", value: leads.filter((l) => l.stage === "Contacted").length },
    { name: "Interested", value: leads.filter((l) => l.stage === "Interested").length },
    { name: "Converted", value: leads.filter((l) => l.stage === "Converted").length },
    { name: "Lost", value: leads.filter((l) => l.stage === "Lost").length },
  ]

  const communicationData = [
    { name: "Call", value: communicationLogs.filter((l) => l.type === "call").length },
    { name: "Email", value: communicationLogs.filter((l) => l.type === "email").length },
    { name: "SMS", value: communicationLogs.filter((l) => l.type === "sms").length },
    { name: "WhatsApp", value: communicationLogs.filter((l) => l.type === "whatsapp").length },
  ]

  const conversionRate = totalLeads > 0 ? ((convertedLeads / totalLeads) * 100).toFixed(1) : 0

  const COLORS = [
    "hsl(var(--color-chart-1))",
    "hsl(var(--color-chart-2))",
    "hsl(var(--color-chart-3))",
    "hsl(var(--color-chart-4))",
    "hsl(var(--color-chart-5))",
  ]

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to your CRM analytics overview</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Leads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalLeads}</div>
            <p className="text-xs text-muted-foreground mt-1">Active leads in system</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Converted Leads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{convertedLeads}</div>
            <p className="text-xs text-muted-foreground mt-1">Conversion rate: {conversionRate}%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending Follow-ups</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{pendingFollowUps}</div>
            <p className="text-xs text-muted-foreground mt-1">Tasks awaiting action</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Satisfaction Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{avgSatisfaction}%</div>
            <p className="text-xs text-muted-foreground mt-1">Positive interactions</p>
          </CardContent>
        </Card>
      </div>

      {currentUser?.role === "admin" && (
        <Card>
          <CardHeader>
            <CardTitle>Managers</CardTitle>
            <CardDescription>Managers registered under your organization</CardDescription>
          </CardHeader>
          <CardContent>
            {managers.length === 0 ? (
              <p className="text-muted-foreground">No managers registered yet</p>
            ) : (
              <div className="space-y-3">
                {managers.map((manager) => (
                  <div
                    key={manager.id}
                    className="flex items-center justify-between p-3 border border-input rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{manager.name}</p>
                      <p className="text-sm text-muted-foreground">{manager.email}</p>
                    </div>
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">Manager</span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Lead Stage Distribution</CardTitle>
            <CardDescription>Breakdown of leads by stage</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                value: { label: "Leads", color: "hsl(var(--color-chart-1))" },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={stageData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {stageData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Communication Channels</CardTitle>
            <CardDescription>Distribution by communication type</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                value: { label: "Count", color: "hsl(var(--color-chart-2))" },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={communicationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="value" fill="hsl(var(--color-chart-2))" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
