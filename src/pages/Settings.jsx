import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Settings as SettingsIcon, Shield, Mic, Save, User, Lock } from "lucide-react";

const rolesList = ["Admin", "Agent", "Manager", "Supervisor"];

const initialSettings = {
  role: "Agent",
  canManageLeads: false,
  canManageClients: false,
  customCallScript: "",
  voiceSetting: "Default",
};

const voiceOptions = ["Default", "Friendly", "Formal", "AI Assistant"];

export default function Settings() {
  const [settings, setSettings] = useState(initialSettings);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="p-8 flex flex-col gap-8 max-w-4xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col gap-4">
        <div>
          <span className="text-xs font-bold uppercase text-orange-600 tracking-widest">Configuration</span>
          <h1 className="text-4xl font-bold text-gray-900 mt-2 flex items-center gap-3">
            <SettingsIcon className="w-8 h-8 text-orange-600" />
            Settings
          </h1>
        </div>
        <p className="text-lg text-gray-600 max-w-2xl">Manage your preferences, access controls, and system configuration</p>
      </div>

      {/* Role & Permissions */}
      <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
        <CardHeader className="border-b border-gray-100">
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-orange-600" />
            Role & Permissions
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          <div>
            <label className="text-sm font-semibold text-gray-900 block mb-3">User Role</label>
            <Select value={settings.role} onValueChange={(val) => setSettings({ ...settings, role: val })}>
              <SelectTrigger className="border-gray-300"><SelectValue placeholder="Select Role" /></SelectTrigger>
              <SelectContent>
                {rolesList.map((role) => <SelectItem key={role} value={role}>{role}</SelectItem>)}
              </SelectContent>
            </Select>
            <p className="text-xs text-gray-600 mt-2">Current role: <span className="font-semibold text-orange-600">{settings.role}</span></p>
          </div>

          <div className="border-t border-gray-100 pt-6">
            <h3 className="font-semibold text-gray-900 mb-4">Access Permissions</h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={settings.canManageLeads}
                  onChange={(e) => setSettings({ ...settings, canManageLeads: e.target.checked })}
                  className="w-5 h-5 rounded border-gray-300 text-orange-600 cursor-pointer"
                />
                <div className="flex-1">
                  <p className="font-medium text-gray-900">Manage All Leads</p>
                  <p className="text-xs text-gray-600 mt-1">Create, edit, and delete lead records</p>
                </div>
              </label>

              <label className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={settings.canManageClients}
                  onChange={(e) => setSettings({ ...settings, canManageClients: e.target.checked })}
                  className="w-5 h-5 rounded border-gray-300 text-orange-600 cursor-pointer"
                />
                <div className="flex-1">
                  <p className="font-medium text-gray-900">Manage Clients</p>
                  <p className="text-xs text-gray-600 mt-1">Create, edit, and delete client records</p>
                </div>
              </label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Voice & Call Scripts */}
      <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
        <CardHeader className="border-b border-gray-100">
          <CardTitle className="flex items-center gap-2">
            <Mic className="w-5 h-5 text-orange-600" />
            Voice & Call Scripts
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          <div>
            <label className="text-sm font-semibold text-gray-900 block mb-3">Voice Setting</label>
            <Select value={settings.voiceSetting} onValueChange={(val) => setSettings({ ...settings, voiceSetting: val })}>
              <SelectTrigger className="border-gray-300"><SelectValue placeholder="Select Voice Setting" /></SelectTrigger>
              <SelectContent>
                {voiceOptions.map((voice) => <SelectItem key={voice} value={voice}>{voice}</SelectItem>)}
              </SelectContent>
            </Select>
            <p className="text-xs text-gray-600 mt-2">Current voice: <span className="font-semibold text-orange-600">{settings.voiceSetting}</span></p>
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-900 block mb-3">Custom Call Script</label>
            <Textarea
              placeholder="Write your custom call scripts and templates here..."
              value={settings.customCallScript}
              onChange={(e) => setSettings({ ...settings, customCallScript: e.target.value })}
              className="min-h-40 border-gray-300"
            />
            <p className="text-xs text-gray-600 mt-2">{settings.customCallScript.length} / 2000 characters</p>
          </div>

          <Button onClick={handleSave} className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold" size="lg">
            <Save className="w-5 h-5 mr-2" />
            {saved ? "✓ Settings Saved" : "Save Settings"}
          </Button>
          {saved && (
            <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200">
              <p className="text-sm font-medium text-emerald-800">✓ Your settings have been saved successfully.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Account Information */}
      <Card className="bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200 shadow-sm">
        <CardHeader className="border-b border-orange-200">
          <CardTitle className="flex items-center gap-2 text-orange-900">
            <User className="w-5 h-5" />
            Account Information
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-xs font-bold uppercase text-orange-700 tracking-widest mb-2">Email</p>
              <p className="text-lg font-semibold text-gray-900">user@example.com</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase text-orange-700 tracking-widest mb-2">Account Status</p>
              <p className="text-lg font-semibold text-emerald-600">Active</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase text-orange-700 tracking-widest mb-2">Last Login</p>
              <p className="text-lg font-semibold text-gray-900">Today at 10:30 AM</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase text-orange-700 tracking-widest mb-2">Member Since</p>
              <p className="text-lg font-semibold text-gray-900">January 2025</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security Section */}
      <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
        <CardHeader className="border-b border-gray-100">
          <CardTitle className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-orange-600" />
            Security
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <Button variant="outline" className="w-full border-gray-300 hover:bg-gray-50 text-gray-900 font-semibold">
              <Lock className="w-4 h-4 mr-2" />
              Change Password
            </Button>
            <Button variant="outline" className="w-full border-gray-300 hover:bg-gray-50 text-gray-900 font-semibold">
              Enable Two-Factor Authentication
            </Button>
            <p className="text-xs text-gray-600 mt-4">Two-factor authentication is not currently enabled on your account. We recommend enabling it for enhanced security.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
