import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle2, Clock, AlertCircle, Plus, Trash2 } from "lucide-react";

const initialTasks = [
  { id: 1, task: "Follow up Rahul Sharma", lead: "Rahul Sharma", due: "2025-10-20", status: "Pending" },
  { id: 2, task: "Send proposal to Priya Das", lead: "Priya Das", due: "2025-10-18", status: "In Progress" },
  { id: 3, task: "Schedule call with ABC Pvt Ltd", lead: "ABC Corp", due: "2025-10-25", status: "Pending" },
];

const statusConfig = {
  "Pending": { icon: AlertCircle, color: "text-amber-600", bg: "bg-amber-50", borderColor: "border-amber-200", badgeBg: "bg-amber-100" },
  "In Progress": { icon: Clock, color: "text-blue-600", bg: "bg-blue-50", borderColor: "border-blue-200", badgeBg: "bg-blue-100" },
  "Completed": { icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50", borderColor: "border-emerald-200", badgeBg: "bg-emerald-100" },
};

export default function Tasks() {
  const [tasks, setTasks] = useState(initialTasks);
  const [newTask, setNewTask] = useState({ task: "", lead: "", due: "", status: "Pending" });

  const handleAdd = () => {
    if (newTask.task && newTask.lead && newTask.due) {
      setTasks([...tasks, { ...newTask, id: Date.now() }]);
      setNewTask({ task: "", lead: "", due: "", status: "Pending" });
    }
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const completedCount = tasks.filter(t => t.status === "Completed").length;
  const inProgressCount = tasks.filter(t => t.status === "In Progress").length;
  const pendingCount = tasks.filter(t => t.status === "Pending").length;

  return (
    <div className="p-8 flex flex-col gap-8 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col gap-4">
        <div>
          <span className="text-xs font-bold uppercase text-orange-600 tracking-widest">Task Management</span>
          <h1 className="text-4xl font-bold text-gray-900 mt-2">Tasks & Follow-ups</h1>
        </div>
        <p className="text-lg text-gray-600 max-w-2xl">Organize and track all your action items and follow-up activities</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600 font-medium">Pending Tasks</p>
            <AlertCircle className="w-5 h-5 text-amber-600" />
          </div>
          <p className="text-4xl font-bold text-gray-900">{pendingCount}</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600 font-medium">In Progress</p>
            <Clock className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-4xl font-bold text-gray-900">{inProgressCount}</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600 font-medium">Completed</p>
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          </div>
          <p className="text-4xl font-bold text-gray-900">{completedCount}</p>
        </div>
      </div>

      {/* Add New Task Form */}
      <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
        <CardHeader className="border-b border-gray-100">
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5 text-orange-600" />
            Add New Task
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              placeholder="Task description"
              value={newTask.task}
              onChange={(e) => setNewTask({ ...newTask, task: e.target.value })}
              className="border-gray-300 md:col-span-2"
            />
            <Input
              placeholder="Lead/Contact name"
              value={newTask.lead}
              onChange={(e) => setNewTask({ ...newTask, lead: e.target.value })}
              className="border-gray-300"
            />
            <Input
              type="date"
              value={newTask.due}
              onChange={(e) => setNewTask({ ...newTask, due: e.target.value })}
              className="border-gray-300"
            />
            <Button onClick={handleAdd} className="w-full md:col-span-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold">
              <Plus className="w-4 h-4 mr-2" /> Add Task
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* All Tasks */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">All Tasks</h2>
          <span className="text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full">{tasks.length} tasks</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task) => {
            const config = statusConfig[task.status];
            const Icon = config.icon;
            return (
              <Card key={task.id} className="bg-white border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-200">
                <CardHeader className="border-b border-gray-100">
                  <div className="flex justify-between items-start gap-3">
                    <div className="flex-1">
                      <CardTitle className="text-lg text-gray-900 mb-2">{task.task}</CardTitle>
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${config.badgeBg} ${config.color}`}>
                        {task.status}
                      </span>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(task.id)} className="hover:bg-red-50 flex-shrink-0">
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <Icon className={`w-5 h-5 ${config.color} flex-shrink-0`} />
                    <div className="flex-1">
                      <p className="text-xs font-medium text-gray-500 uppercase">Lead/Contact</p>
                      <p className="text-sm font-semibold text-gray-900">{task.lead}</p>
                    </div>
                  </div>
                  <div className="pt-3 border-t border-gray-100">
                    <p className="text-xs font-medium text-gray-500 uppercase mb-1">Due Date</p>
                    <p className="text-sm font-semibold text-gray-900">{task.due}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
