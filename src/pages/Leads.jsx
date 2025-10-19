import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Pencil, Trash2, Plus, User, Mail, Phone as PhoneIcon, TrendingUp } from "lucide-react";

const initialLeads = [
  {
    id: 1,
    name: "Rahul Sharma",
    email: "rahul@example.com",
    phone: "9876543210",
    stage: "Contacted",
    agent: "Smruti",
    aiSummary: "Rahul seems interested in the pricing plans.",
  },
  {
    id: 2,
    name: "Priya Das",
    email: "priya@example.com",
    phone: "9876500000",
    stage: "New",
    agent: "Amit",
    aiSummary: "Initial contact pending.",
  },
];

const stages = ["New", "Contacted", "Interested", "Converted", "Lost"];
const agents = ["Smruti", "Amit", "Riya", "Kunal"];

const stageConfig = {
  "New": { color: "text-blue-600", bg: "bg-blue-50", borderColor: "border-blue-200", badgeBg: "bg-blue-100" },
  "Contacted": { color: "text-indigo-600", bg: "bg-indigo-50", borderColor: "border-indigo-200", badgeBg: "bg-indigo-100" },
  "Interested": { color: "text-purple-600", bg: "bg-purple-50", borderColor: "border-purple-200", badgeBg: "bg-purple-100" },
  "Converted": { color: "text-emerald-600", bg: "bg-emerald-50", borderColor: "border-emerald-200", badgeBg: "bg-emerald-100" },
  "Lost": { color: "text-red-600", bg: "bg-red-50", borderColor: "border-red-200", badgeBg: "bg-red-100" },
};

export default function Leads() {
  const [leads, setLeads] = useState(initialLeads);
  const [newLead, setNewLead] = useState({ name: "", email: "", phone: "", stage: "New", agent: "", aiSummary: "" });
  const [editLead, setEditLead] = useState(null);

  const handleAdd = () => {
    if (newLead.name && newLead.email && newLead.phone && newLead.agent) {
      setLeads([...leads, { ...newLead, id: Date.now() }]);
      setNewLead({ name: "", email: "", phone: "", stage: "New", agent: "", aiSummary: "" });
    }
  };

  const handleEdit = (id, updated) => {
    setLeads(leads.map(l => (l.id === id ? updated : l)));
    setEditLead(null);
  };

  const handleDelete = (id) => {
    setLeads(leads.filter(l => l.id !== id));
  };

  const stageCounts = stages.reduce((acc, stage) => {
    acc[stage] = leads.filter(l => l.stage === stage).length;
    return acc;
  }, {});

  return (
    <div className="p-8 flex flex-col gap-8 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col gap-4">
        <div>
          <span className="text-xs font-bold uppercase text-orange-600 tracking-widest">Lead Management</span>
          <h1 className="text-4xl font-bold text-gray-900 mt-2">Manage Your Sales Leads</h1>
        </div>
        <p className="text-lg text-gray-600 max-w-2xl">Track and manage your sales leads across different stages of the conversion funnel</p>
      </div>

      {/* Stage Overview */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {stages.map((stage) => {
          const config = stageConfig[stage];
          return (
            <div key={stage} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
              <p className="text-xs font-medium text-gray-600 uppercase mb-2">{stage}</p>
              <p className="text-3xl font-bold text-gray-900">{stageCounts[stage]}</p>
            </div>
          );
        })}
      </div>

      {/* Add New Lead Form */}
      <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
        <CardHeader className="border-b border-gray-100">
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5 text-orange-600" />
            Add New Lead
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input placeholder="Full Name" value={newLead.name} onChange={(e) => setNewLead({ ...newLead, name: e.target.value })} className="border-gray-300" />
            <Input placeholder="Email Address" type="email" value={newLead.email} onChange={(e) => setNewLead({ ...newLead, email: e.target.value })} className="border-gray-300" />
            <Input placeholder="Phone Number" value={newLead.phone} onChange={(e) => setNewLead({ ...newLead, phone: e.target.value })} className="border-gray-300" />
            <Select value={newLead.stage} onValueChange={(val) => setNewLead({ ...newLead, stage: val })}>
              <SelectTrigger className="border-gray-300"><SelectValue placeholder="Select Stage" /></SelectTrigger>
              <SelectContent>{stages.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
            </Select>
            <Select value={newLead.agent} onValueChange={(val) => setNewLead({ ...newLead, agent: val })}>
              <SelectTrigger className="border-gray-300"><SelectValue placeholder="Assign Agent" /></SelectTrigger>
              <SelectContent>{agents.map(a => <SelectItem key={a} value={a}>{a}</SelectItem>)}</SelectContent>
            </Select>
            <div></div>
            <Textarea placeholder="AI Summary / Notes" value={newLead.aiSummary} onChange={(e) => setNewLead({ ...newLead, aiSummary: e.target.value })} className="border-gray-300 md:col-span-2" />
            <Button onClick={handleAdd} className="w-full md:col-span-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold">
              <Plus className="w-4 h-4 mr-2" /> Add Lead
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* All Leads */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">All Leads</h2>
          <span className="text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full">{leads.length} leads</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {leads.map((lead) => {
            const config = stageConfig[lead.stage];
            return (
              <Card key={lead.id} className="bg-white border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-200">
                <CardHeader className="border-b border-gray-100">
                  <div className="flex justify-between items-start gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-lg">
                          {lead.name.charAt(0)}
                        </div>
                        <CardTitle className="text-lg text-gray-900">{lead.name}</CardTitle>
                      </div>
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${config.badgeBg} ${config.color}`}>
                        {lead.stage}
                      </span>
                    </div>
                    <div className="flex gap-1">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="icon" className="hover:bg-gray-100">
                            <Pencil className="w-4 h-4 text-gray-600" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader><DialogTitle>Edit Lead</DialogTitle></DialogHeader>
                          <div className="space-y-3">
                            <Input defaultValue={lead.name} onChange={(e) => setEditLead({ ...lead, name: e.target.value })} />
                            <Input defaultValue={lead.email} onChange={(e) => setEditLead({ ...lead, email: e.target.value })} />
                            <Input defaultValue={lead.phone} onChange={(e) => setEditLead({ ...lead, phone: e.target.value })} />
                            <Select defaultValue={lead.stage} onValueChange={(val) => setEditLead({ ...lead, stage: val })}>
                              <SelectTrigger><SelectValue placeholder="Select Stage" /></SelectTrigger>
                              <SelectContent>{stages.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                            </Select>
                            <Select defaultValue={lead.agent} onValueChange={(val) => setEditLead({ ...lead, agent: val })}>
                              <SelectTrigger><SelectValue placeholder="Assign Agent" /></SelectTrigger>
                              <SelectContent>{agents.map(a => <SelectItem key={a} value={a}>{a}</SelectItem>)}</SelectContent>
                            </Select>
                            <Textarea defaultValue={lead.aiSummary} onChange={(e) => setEditLead({ ...lead, aiSummary: e.target.value })} />
                            <Button onClick={() => handleEdit(lead.id, editLead)} className="w-full bg-orange-600 hover:bg-orange-700">Save Changes</Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(lead.id)} className="hover:bg-red-50">
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <div className="flex-1">
                      <p className="text-xs font-medium text-gray-500 uppercase">Email</p>
                      <p className="text-gray-700 truncate">{lead.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <PhoneIcon className="w-4 h-4 text-gray-400" />
                    <div className="flex-1">
                      <p className="text-xs font-medium text-gray-500 uppercase">Phone</p>
                      <p className="text-gray-700">{lead.phone}</p>
                    </div>
                  </div>
                  <div className="pt-3 border-t border-gray-100">
                    <p className="text-xs font-medium text-gray-500 uppercase mb-1">Assigned Agent</p>
                    <p className="text-sm font-semibold text-gray-900">{lead.agent}</p>
                  </div>
                  {lead.aiSummary && (
                    <div className="pt-3 border-t border-gray-100">
                      <p className="text-xs font-medium text-gray-500 uppercase mb-1">Summary</p>
                      <p className="text-sm text-gray-700">{lead.aiSummary}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
