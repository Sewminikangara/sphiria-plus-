"use client";

import { useState } from "react";
import Topbar from "@/components/Topbar";
import { agents } from "@/lib/data";
import { cn } from "@/lib/utils";
import {
  Play, Pause, RotateCcw, Settings, ChevronRight,
  Activity, Clock, Shield, Zap, CheckCircle2, AlertTriangle,
  BarChart3, Bot
} from "lucide-react";
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip
} from "recharts";

const statusConfig = {
  active: { label: "Active", color: "#34d399", bg: "rgba(52,211,153,0.1)", cls: "badge-active" },
  idle: { label: "Idle", color: "#fbbf24", bg: "rgba(251,191,36,0.1)", cls: "badge-idle" },
  processing: { label: "Processing", color: "#a78bfa", bg: "rgba(167,139,250,0.1)", cls: "badge-processing" },
  error: { label: "Error", color: "#f87171", bg: "rgba(248,113,113,0.1)", cls: "badge-error" },
};

function AgentCard({ agent, onClick, selected }: { agent: typeof agents[0]; onClick: () => void; selected: boolean }) {
  const cfg = statusConfig[agent.status as keyof typeof statusConfig];
  return (
    <div
      className={cn("agent-card", selected && "active")}
      onClick={onClick}
      style={selected ? { borderColor: agent.color + "80", boxShadow: `0 0 30px ${agent.color}20` } : {}}
    >
      {/* Color bar */}
      <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl"
        style={{ background: `linear-gradient(90deg, ${agent.color}, transparent)` }} />

      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl"
            style={{ background: `${agent.color}15` }}>
            {agent.icon}
          </div>
          <div>
            <h3 className="font-semibold text-white text-sm">{agent.name}</h3>
            <p className="text-[11px] text-white/35 mt-0.5">{agent.role}</p>
          </div>
        </div>
        <div className={cn("badge", cfg.cls)}>
          <div className={cn(
            "w-1.5 h-1.5 rounded-full",
            agent.status === "active" || agent.status === "processing" ? "animate-pulse" : ""
          )} style={{ background: cfg.color }} />
          {cfg.label}
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {[
          { label: "Tasks", value: agent.tasksCompleted.toLocaleString(), icon: CheckCircle2 },
          { label: "Accuracy", value: `${agent.accuracy}%`, icon: Shield },
          { label: "Response", value: agent.avgResponseTime, icon: Clock },
        ].map(stat => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="rounded-lg p-2 text-center"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
              <Icon className="w-3 h-3 mx-auto mb-1 text-white/25" />
              <div className="text-sm font-bold text-white">{stat.value}</div>
              <div className="text-[10px] text-white/30">{stat.label}</div>
            </div>
          );
        })}
      </div>

      {/* Last action */}
      <div className="rounded-lg p-2.5" style={{ background: "rgba(255,255,255,0.03)" }}>
        <p className="text-[11px] text-white/35 mb-1">Last Action</p>
        <p className="text-xs text-white/60 line-clamp-2">{agent.lastAction}</p>
      </div>

      {/* Uptime */}
      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center gap-1.5">
          <Activity className="w-3 h-3 text-white/25" />
          <span className="text-[11px] text-white/30">Uptime: <span className="text-emerald-400 font-semibold">{agent.uptime}</span></span>
        </div>
        <ChevronRight className="w-4 h-4 text-white/20" />
      </div>
    </div>
  );
}

function AgentDetail({ agent }: { agent: typeof agents[0] }) {
  const radarData = [
    { subject: "Speed", value: agent.avgResponseTime.includes("0.") ? 95 : agent.avgResponseTime.includes("1.") ? 85 : agent.avgResponseTime.includes("2.") ? 75 : 60 },
    { subject: "Accuracy", value: agent.accuracy },
    { subject: "Reliability", value: parseFloat(agent.uptime) },
    { subject: "Throughput", value: Math.min(100, Math.round(agent.tasksCompleted / 35)) },
    { subject: "Coverage", value: 78 + Math.round(Math.random() * 15) },
    { subject: "Learning", value: 70 + Math.round(Math.random() * 25) },
  ];

  return (
    <div className="glass-card rounded-2xl p-6 h-full animate-fadeInLeft">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl"
          style={{ background: `${agent.color}20`, border: `1px solid ${agent.color}40` }}>
          {agent.icon}
        </div>
        <div className="flex-1">
          <h2 className="font-display font-bold text-white text-xl">{agent.name}</h2>
          <p className="text-sm text-white/40">{agent.role}</p>
        </div>
        <div className="flex gap-2">
          <button className="p-2 rounded-xl hover:bg-white/[0.05] transition-all" title="Pause">
            <Pause className="w-4 h-4 text-white/40" />
          </button>
          <button className="p-2 rounded-xl hover:bg-white/[0.05] transition-all" title="Restart">
            <RotateCcw className="w-4 h-4 text-white/40" />
          </button>
          <button className="p-2 rounded-xl hover:bg-white/[0.05] transition-all" title="Settings">
            <Settings className="w-4 h-4 text-white/40" />
          </button>
        </div>
      </div>

      {/* Radar Chart */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-white/60 mb-3">Performance Profile</h3>
        <ResponsiveContainer width="100%" height={220}>
          <RadarChart data={radarData}>
            <PolarGrid stroke="rgba(255,255,255,0.06)" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 11 }} />
            <Radar name={agent.name} dataKey="value" stroke={agent.color} fill={agent.color} fillOpacity={0.15} strokeWidth={2} />
            <Tooltip
              contentStyle={{ background: "rgba(13,14,20,0.95)", border: `1px solid ${agent.color}40`, borderRadius: "12px", fontSize: "12px" }}
              labelStyle={{ color: "rgba(255,255,255,0.6)" }}
              itemStyle={{ color: agent.color }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Key metrics */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {[
          { label: "Total Tasks Completed", value: agent.tasksCompleted.toLocaleString(), icon: CheckCircle2, color: "#34d399" },
          { label: "Accuracy Rate", value: `${agent.accuracy}%`, icon: Shield, color: "#8b5cf6" },
          { label: "Average Response", value: agent.avgResponseTime, icon: Clock, color: "#22d3ee" },
          { label: "System Uptime", value: agent.uptime, icon: Activity, color: "#f59e0b" },
        ].map(m => {
          const Icon = m.icon;
          return (
            <div key={m.label} className="rounded-xl p-3"
              style={{ background: `${m.color}08`, border: `1px solid ${m.color}20` }}>
              <Icon className="w-4 h-4 mb-2" style={{ color: m.color }} />
              <div className="text-lg font-bold text-white">{m.value}</div>
              <div className="text-[11px] text-white/35 mt-0.5">{m.label}</div>
            </div>
          );
        })}
      </div>

      {/* Last action */}
      <div className="rounded-xl p-4" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="flex items-center gap-2 mb-2">
          <Zap className="w-3.5 h-3.5" style={{ color: agent.color }} />
          <span className="text-xs font-semibold text-white/50">Last Executed</span>
        </div>
        <p className="text-sm text-white/70 leading-relaxed">{agent.lastAction}</p>
      </div>

      {/* Action button */}
      <button className="btn-primary w-full mt-4 justify-center" style={{
        background: `linear-gradient(135deg, ${agent.color} 0%, ${agent.color}aa 100%)`
      }}>
        <Play className="w-4 h-4" /> Trigger Agent
      </button>
    </div>
  );
}

export default function AgentsPage() {
  const [selectedId, setSelectedId] = useState("analytics");
  const selectedAgent = agents.find(a => a.id === selectedId)!;

  const activeCount = agents.filter(a => a.status === "active").length;
  const processingCount = agents.filter(a => a.status === "processing").length;

  return (
    <div className="flex flex-col h-full">
      <Topbar title="Agent Mesh" subtitle={`${activeCount} active · ${processingCount} processing · ${agents.length} total`} />

      <div className="flex-1 overflow-hidden flex flex-col p-6 gap-6">

        {/* Summary Bar */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: "Total Agents", value: agents.length, icon: Bot, color: "#8b5cf6" },
            { label: "Active Now", value: activeCount, icon: Activity, color: "#34d399" },
            { label: "Tasks Today", value: "1,204", icon: Zap, color: "#22d3ee" },
            { label: "Avg Accuracy", value: `${Math.round(agents.reduce((a, b) => a + b.accuracy, 0) / agents.length)}%`, icon: Shield, color: "#f59e0b" },
          ].map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="stat-card animate-fadeInUp" style={{ animationDelay: `${i * 60}ms` }}>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ background: `${s.color}15` }}>
                    <Icon className="w-4 h-4" style={{ color: s.color }} />
                  </div>
                  <div>
                    <div className="text-xl font-bold font-display text-white">{s.value}</div>
                    <div className="text-xs text-white/35">{s.label}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-hidden grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Agent Grid */}
          <div className="xl:col-span-2 overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {agents.map(agent => (
                <AgentCard
                  key={agent.id}
                  agent={agent}
                  selected={agent.id === selectedId}
                  onClick={() => setSelectedId(agent.id)}
                />
              ))}
            </div>
          </div>

          {/* Agent Detail Panel */}
          <div className="overflow-y-auto">
            <AgentDetail agent={selectedAgent} />
          </div>
        </div>
      </div>
    </div>
  );
}
