"use client";

import { useState } from "react";
import Topbar from "@/components/Topbar";
import { workflows, agents } from "@/lib/data";
import { cn } from "@/lib/utils";
import {
  Plus, Play, Pause, GitBranch, CheckCircle2, Clock,
  Zap, AlertTriangle, Users, ArrowRight, MoreHorizontal,
  Timer, Bot
} from "lucide-react";

const extendedWorkflows = [
  ...workflows,
  {
    id: "wf5", name: "Daily SEO Audit", client: "Bloom Agency",
    status: "completed", steps: 5, completedSteps: 5,
    triggeredAt: "Yesterday 06:00", agents: ["AnalyticsAgent", "ContentAgent"],
  },
  {
    id: "wf6", name: "Churn Risk Detection", client: "TechStart Labs",
    status: "running", steps: 6, completedSteps: 2,
    triggeredAt: "1hr ago", agents: ["AnalyticsAgent", "StrategyAgent"],
  },
];

const statusCfg = {
  running: { color: "#34d399", label: "Running", icon: Play },
  pending: { color: "#f59e0b", label: "Pending", icon: Clock },
  completed: { color: "#22d3ee", label: "Completed", icon: CheckCircle2 },
  failed: { color: "#f87171", label: "Failed", icon: AlertTriangle },
};

const workflowTemplates = [
  { name: "Lead Nurture Sequence", agents: 3, steps: 7, icon: "🎯", popular: true },
  { name: "Weekly Analytics Report", agents: 2, steps: 4, icon: "📊", popular: false },
  { name: "Social Media Automation", agents: 2, steps: 6, icon: "📱", popular: true },
  { name: "Support Ticket Triage", agents: 2, steps: 3, icon: "💬", popular: false },
  { name: "Campaign Performance Review", agents: 3, steps: 8, icon: "📈", popular: false },
  { name: "New Client Onboarding", agents: 4, steps: 12, icon: "🚀", popular: true },
];

function WorkflowCard({ wf }: { wf: typeof workflows[0] }) {
  const cfg = statusCfg[wf.status as keyof typeof statusCfg];
  const Icon = cfg.icon;
  const pct = Math.round((wf.completedSteps / wf.steps) * 100);

  return (
    <div className="glass-card rounded-2xl p-5 hover:border-white/10 transition-all duration-300 hover:-translate-y-0.5">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold text-white">{wf.name}</h3>
          <p className="text-xs text-white/35 mt-1">{wf.client}</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold"
            style={{ background: `${cfg.color}15`, color: cfg.color, border: `1px solid ${cfg.color}30` }}>
            <Icon className="w-3 h-3" />
            {cfg.label}
          </div>
          <button className="p-1.5 rounded-lg hover:bg-white/[0.05] text-white/25 hover:text-white/70 transition-all">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Progress */}
      <div className="mb-4">
        <div className="flex justify-between mb-2">
          <span className="text-xs text-white/35">{wf.completedSteps} / {wf.steps} steps</span>
          <span className="text-xs font-semibold" style={{ color: cfg.color }}>{pct}%</span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${cfg.color}80, ${cfg.color})` }} />
        </div>
      </div>

      {/* Step dots */}
      <div className="flex gap-1.5 mb-4">
        {Array.from({ length: wf.steps }).map((_, i) => (
          <div key={i} className="flex-1 h-1.5 rounded-full transition-all duration-500"
            style={{
              background: i < wf.completedSteps ? cfg.color : "rgba(255,255,255,0.08)",
              boxShadow: i < wf.completedSteps ? `0 0 8px ${cfg.color}60` : "none"
            }} />
        ))}
      </div>

      {/* Agents */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bot className="w-3.5 h-3.5 text-white/25" />
          <div className="flex gap-1">
            {wf.agents.slice(0, 3).map((a, i) => {
              const agent = agents.find(ag => ag.name === a);
              return (
                <div key={i} title={a}
                  className="w-6 h-6 rounded-full flex items-center justify-center text-xs"
                  style={{
                    background: agent?.color ? `${agent.color}20` : "rgba(255,255,255,0.05)",
                    border: `1px solid ${agent?.color || "rgba(255,255,255,0.1)"}40`,
                  }}>
                  {agent?.icon || "🤖"}
                </div>
              );
            })}
            {wf.agents.length > 3 && (
              <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] text-white/40"
                style={{ background: "rgba(255,255,255,0.05)" }}>
                +{wf.agents.length - 3}
              </div>
            )}
          </div>
          <span className="text-xs text-white/30">{wf.agents.length} agents</span>
        </div>
        <div className="flex items-center gap-1 text-xs text-white/30">
          <Timer className="w-3.5 h-3.5" />
          {wf.triggeredAt}
        </div>
      </div>
    </div>
  );
}

function TemplateCard({ t }: { t: typeof workflowTemplates[0] }) {
  return (
    <div className="flex items-center gap-3 p-4 rounded-xl transition-all duration-200 cursor-pointer hover:-translate-y-0.5"
      style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="text-2xl shrink-0">{t.icon}</div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold text-white/85 truncate">{t.name}</p>
          {t.popular && <span className="text-[10px] px-1.5 py-0.5 rounded-full font-bold text-violet-300" style={{ background: "rgba(139,92,246,0.15)" }}>Popular</span>}
        </div>
        <p className="text-xs text-white/30 mt-0.5">{t.steps} steps · {t.agents} agents</p>
      </div>
      <button className="btn-secondary text-xs px-3 py-1.5">Use</button>
    </div>
  );
}

export default function WorkflowsPage() {
  const [filter, setFilter] = useState("all");

  const filteredWorkflows = filter === "all"
    ? extendedWorkflows
    : extendedWorkflows.filter(w => w.status === filter);

  const counts = {
    all: extendedWorkflows.length,
    running: extendedWorkflows.filter(w => w.status === "running").length,
    pending: extendedWorkflows.filter(w => w.status === "pending").length,
    completed: extendedWorkflows.filter(w => w.status === "completed").length,
  };

  return (
    <div className="flex flex-col h-full">
      <Topbar title="Workflows" subtitle={`${counts.running} active · ${counts.pending} pending · ${counts.completed} completed`} />

      <div className="flex-1 overflow-y-auto p-6 space-y-6">

        {/* Header actions */}
        <div className="flex items-center justify-between">
          <div className="flex gap-1 p-1 rounded-xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
            {(["all", "running", "pending", "completed"] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 capitalize",
                  filter === f ? "bg-violet-500/20 text-violet-300" : "text-white/35 hover:text-white/60"
                )}
              >
                {f} {counts[f] !== undefined && <span className="ml-1 opacity-60">({counts[f]})</span>}
              </button>
            ))}
          </div>
          <button className="btn-primary">
            <Plus className="w-4 h-4" /> New Workflow
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: "Total Workflows", value: extendedWorkflows.length, color: "#8b5cf6", icon: GitBranch },
            { label: "Running", value: counts.running, color: "#34d399", icon: Play },
            { label: "Tasks Automated", value: "8,024", color: "#22d3ee", icon: Zap },
            { label: "Time Saved", value: "214hr", color: "#f59e0b", icon: Timer },
          ].map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="stat-card animate-fadeInUp" style={{ animationDelay: `${i * 60}ms` }}>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${s.color}15` }}>
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

        {/* Main grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 space-y-4">
            <h2 className="font-display font-semibold text-white/70 text-sm uppercase tracking-wider">Active Workflows</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredWorkflows.map(wf => (
                <WorkflowCard key={wf.id} wf={wf as any} />
              ))}
            </div>
          </div>

          {/* Templates */}
          <div>
            <h2 className="font-display font-semibold text-white/70 text-sm uppercase tracking-wider mb-4">Quick Templates</h2>
            <div className="glass-card rounded-2xl p-4 space-y-3">
              {workflowTemplates.map((t, i) => (
                <TemplateCard key={i} t={t} />
              ))}
              <button className="btn-ghost w-full justify-center mt-2 text-xs">
                Browse all templates <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
