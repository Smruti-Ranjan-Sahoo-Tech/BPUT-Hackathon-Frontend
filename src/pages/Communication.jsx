import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress";
import { Phone, Mail, MessageSquare, ThumbsUp, Minus, ThumbsDown } from "lucide-react";

const initialLogs = [
  { id: 1, type: "Call", contact: "Rahul Sharma", date: "2025-10-10", sentiment: "Positive", summary: "Discussed pricing plan." },
  { id: 2, type: "Email", contact: "Priya Das", date: "2025-10-12", sentiment: "Neutral", summary: "Sent product brochure." },
  { id: 3, type: "WhatsApp", contact: "Amit Kumar", date: "2025-10-15", sentiment: "Positive", summary: "Quick follow-up on proposal." },
  { id: 4, type: "Call", contact: "Neha Singh", date: "2025-10-14", sentiment: "Negative", summary: "Client requested more information." },
  { id: 5, type: "Email", contact: "Rajesh Patel", date: "2025-10-16", sentiment: "Neutral", summary: "Shared demo video link." },
  { id: 6, type: "Call", contact: "Meera Gupta", date: "2025-10-17", sentiment: "Positive", summary: "Scheduled next meeting." },
];

const sentimentConfig = {
  "Positive": { icon: ThumbsUp, color: "text-emerald-600", bg: "bg-emerald-50", borderColor: "border-emerald-200", badgeBg: "bg-emerald-100" },
  "Neutral": { icon: Minus, color: "text-amber-600", bg: "bg-amber-50", borderColor: "border-amber-200", badgeBg: "bg-amber-100" },
  "Negative": { icon: ThumbsDown, color: "text-red-600", bg: "bg-red-50", borderColor: "border-red-200", badgeBg: "bg-red-100" },
};

const channelConfig = {
  "Call": { icon: Phone, color: "text-blue-600" },
  "Email": { icon: Mail, color: "text-indigo-600" },
  "WhatsApp": { icon: MessageSquare, color: "text-green-600" },
};

export default function Communication() {
  const [logs] = useState(initialLogs);

  const channelCounts = {
    "Call": logs.filter(l => l.type === "Call").length,
    "Email": logs.filter(l => l.type === "Email").length,
    "WhatsApp": logs.filter(l => l.type === "WhatsApp").length,
  };

  const sentimentCounts = {
    "Positive": logs.filter(l => l.sentiment === "Positive").length,
    "Neutral": logs.filter(l => l.sentiment === "Neutral").length,
    "Negative": logs.filter(l => l.sentiment === "Negative").length,
  };

  const totalLogs = logs.length;

  return (
    <div className="p-8 flex flex-col gap-8 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col gap-4">
        <div>
          <span className="text-xs font-bold uppercase text-orange-600 tracking-widest">Communication Logs</span>
          <h1 className="text-4xl font-bold text-gray-900 mt-2">Track All Interactions</h1>
        </div>
        <p className="text-lg text-gray-600 max-w-2xl">Monitor communication channels and analyze sentiment across all your lead interactions</p>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600 font-medium">Total Communications</p>
            <MessageSquare className="w-5 h-5 text-orange-600" />
          </div>
          <p className="text-4xl font-bold text-gray-900">{totalLogs}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600 font-medium">Positive Sentiment</p>
            <ThumbsUp className="w-5 h-5 text-emerald-600" />
          </div>
          <p className="text-4xl font-bold text-gray-900">{sentimentCounts.Positive}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600 font-medium">Calls Placed</p>
            <Phone className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-4xl font-bold text-gray-900">{channelCounts.Call}</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Communication Channels */}
        <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
          <CardHeader className="border-b border-gray-100">
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-orange-600" />
              Communication Channels
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            {Object.entries(channelCounts).map(([channel, count]) => {
              const config = channelConfig[channel];
              const Icon = config.icon;
              return (
                <div key={channel} className="flex items-center gap-4">
                  <Icon className={`w-5 h-5 ${config.color} flex-shrink-0`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-900">{channel}</span>
                      <span className="text-sm font-bold text-gray-700">{count}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${config.color.replace('text', 'bg')}`}
                        style={{ width: `${(count / totalLogs) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Sentiment Analysis */}
        <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
          <CardHeader className="border-b border-gray-100">
            <CardTitle className="flex items-center gap-2">
              <ThumbsUp className="w-5 h-5 text-orange-600" />
              Sentiment Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            {Object.entries(sentimentCounts).map(([sentiment, count]) => {
              const config = sentimentConfig[sentiment];
              return (
                <div key={sentiment} className="flex items-center gap-4">
                  <div className={`p-2 rounded-lg ${config.bg}`}>
                    <config.icon className={`w-5 h-5 ${config.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-900">{sentiment}</span>
                      <span className="text-sm font-bold text-gray-700">{count}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${config.color.replace('text', 'bg')}`}
                        style={{ width: `${(count / totalLogs) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>

      {/* Recent Communications */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Recent Communications</h2>
          <span className="text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full">{logs.length} total</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {logs.map((log) => {
            const logSentimentConfig = sentimentConfig[log.sentiment];
            const logChannelConfig = channelConfig[log.type];
            const SentimentIcon = logSentimentConfig.icon;
            const ChannelIcon = logChannelConfig.icon;

            return (
              <Card key={log.id} className="bg-white border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-200">
                <CardHeader className="border-b border-gray-100">
                  <div className="flex justify-between items-start gap-3">
                    <div className="flex-1">
                      <CardTitle className="text-lg text-gray-900">{log.contact}</CardTitle>
                      <div className="flex items-center gap-2 mt-2">
                        <ChannelIcon className={`w-4 h-4 ${logChannelConfig.color}`} />
                        <span className="text-xs font-medium text-gray-600">{log.type}</span>
                      </div>
                    </div>
                    <div className={`p-2 rounded-lg ${logSentimentConfig.bg}`}>
                      <SentimentIcon className={`w-5 h-5 ${logSentimentConfig.color}`} />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase mb-1">Date</p>
                    <p className="text-sm font-semibold text-gray-900">{log.date}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase mb-2">Sentiment</p>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${logSentimentConfig.badgeBg} ${logSentimentConfig.color}`}>
                      {log.sentiment}
                    </span>
                  </div>
                  <div className="pt-3 border-t border-gray-100">
                    <p className="text-xs font-medium text-gray-500 uppercase mb-1">Summary</p>
                    <p className="text-sm text-gray-700">{log.summary}</p>
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
