"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export function AnalyticsPage() {
  const [leads, setLeads] = useState([]);
  const [communicationLogs, setCommunicationLogs] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const savedLeads = localStorage.getItem("leads");
    const savedLogs = localStorage.getItem("communicationLogs");
    const savedTasks = localStorage.getItem("tasks");
    if (savedLeads) setLeads(JSON.parse(savedLeads));
    if (savedLogs) setCommunicationLogs(JSON.parse(savedLogs));
    if (savedTasks) setTasks(JSON.parse(savedTasks));
  }, []);

  const COLORS = [
    "hsl(var(--color-chart-1))",
    "hsl(var(--color-chart-2))",
    "hsl(var(--color-chart-3))",
    "hsl(var(--color-chart-4))",
    "hsl(var(--color-chart-5))",
  ];

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          Analytics & Reports
        </h1>
        <p className="text-muted-foreground">
          Comprehensive insights into your CRM performance
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Lead Conversion Funnel</CardTitle>
            <CardDescription>Leads by stage</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                count: { label: "Leads", color: "hsl(var(--color-chart-1))" },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    {
                      stage: "New",
                      count: leads.filter((l) => l.stage === "New").length,
                    },
                    {
                      stage: "Contacted",
                      count: leads.filter((l) => l.stage === "Contacted")
                        .length,
                    },
                    {
                      stage: "Interested",
                      count: leads.filter((l) => l.stage === "Interested")
                        .length,
                    },
                    {
                      stage: "Converted",
                      count: leads.filter((l) => l.stage === "Converted")
                        .length,
                    },
                    {
                      stage: "Lost",
                      count: leads.filter((l) => l.stage === "Lost").length,
                    },
                  ]}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="stage" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="count" fill="hsl(var(--color-chart-1))" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Communication Performance</CardTitle>
            <CardDescription>Interactions by channel</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                count: { label: "Total", color: "hsl(var(--color-chart-2))" },
                positive: {
                  label: "Positive",
                  color: "hsl(var(--color-chart-3))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    {
                      type: "Call",
                      count: communicationLogs.filter((l) => l.type === "call")
                        .length,
                      positive: communicationLogs.filter(
                        (l) => l.type === "call" && l.sentiment === "positive"
                      ).length,
                    },
                    {
                      type: "Email",
                      count: communicationLogs.filter((l) => l.type === "email")
                        .length,
                      positive: communicationLogs.filter(
                        (l) => l.type === "email" && l.sentiment === "positive"
                      ).length,
                    },
                    {
                      type: "SMS",
                      count: communicationLogs.filter((l) => l.type === "sms")
                        .length,
                      positive: communicationLogs.filter(
                        (l) => l.type === "sms" && l.sentiment === "positive"
                      ).length,
                    },
                    {
                      type: "WhatsApp",
                      count: communicationLogs.filter(
                        (l) => l.type === "whatsapp"
                      ).length,
                      positive: communicationLogs.filter(
                        (l) =>
                          l.type === "whatsapp" && l.sentiment === "positive"
                      ).length,
                    },
                  ]}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="type" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar dataKey="count" fill="hsl(var(--color-chart-2))" />
                  <Bar dataKey="positive" fill="hsl(var(--color-chart-3))" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sentiment Distribution</CardTitle>
            <CardDescription>Overall interaction sentiment</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                value: { label: "Count", color: "hsl(var(--color-chart-1))" },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      {
                        name: "Positive",
                        value: communicationLogs.filter(
                          (l) => l.sentiment === "positive"
                        ).length,
                      },
                      {
                        name: "Neutral",
                        value: communicationLogs.filter(
                          (l) => l.sentiment === "neutral"
                        ).length,
                      },
                      {
                        name: "Negative",
                        value: communicationLogs.filter(
                          (l) => l.sentiment === "negative"
                        ).length,
                      },
                    ]}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {[
                      {
                        name: "Positive",
                        value: communicationLogs.filter(
                          (l) => l.sentiment === "positive"
                        ).length,
                      },
                      {
                        name: "Neutral",
                        value: communicationLogs.filter(
                          (l) => l.sentiment === "neutral"
                        ).length,
                      },
                      {
                        name: "Negative",
                        value: communicationLogs.filter(
                          (l) => l.sentiment === "negative"
                        ).length,
                      },
                    ].map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
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
            <CardTitle>Task Completion Rate</CardTitle>
            <CardDescription>Pending vs completed tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                value: { label: "Tasks", color: "hsl(var(--color-chart-4))" },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      {
                        name: "Completed",
                        value: tasks.filter((t) => t.status === "completed")
                          .length,
                      },
                      {
                        name: "Pending",
                        value: tasks.filter((t) => t.status === "pending")
                          .length,
                      },
                    ]}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {[
                      {
                        name: "Completed",
                        value: tasks.filter((t) => t.status === "completed")
                          .length,
                      },
                      {
                        name: "Pending",
                        value: tasks.filter((t) => t.status === "pending")
                          .length,
                      },
                    ].map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
