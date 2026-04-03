"use client";

import Topbar from "@/components/Topbar";
import { clients } from "@/lib/data";
import { cn } from "@/lib/utils";
import {
  Plus, Search, Filter, TrendingUp, Users, DollarSign,
  Activity, MoreHorizontal, ArrowUpRight, Zap, CheckCircle, Clock
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";

const planColors: Record<string, string> = {
  Starter: "#6366f1",
  Growth: "#8b5cf6",
  Scale: "#22d3ee",
  Enterprise: "#f59e0b",
};

const statusColors: Record<string, { color: string; bg: string }> = {
  active: { color: "#34d399", bg: "rgba(52,211,153,0.12)" },
  trial: { color: "#f59e0b", bg: "rgba(245,158,11,0.12)" },
  paused: { color: "#64748b", bg: "rgba(100,116,139,0.12)" },
};

function ClientCard({ client, index }: { client: typeof clients[0]; index: number }) {
  const statusCfg = statusColors[client.status] || statusColors.active;
  const planColor = planColors[client.plan] || "#8b5cf6";

  return (
    <div className="glass-card rounded-2xl p-5 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer animate-fadeInUp"
      style={{ animationDelay: `${index * 60}ms` }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl flex items-center justify-center text-lg font-bold text-white shrink-0"
            style={{ background: `linear-gradient(135deg, ${client.color}40, ${client.color}20)`, border: `1px solid ${client.color}30` }}>
            {client.avatar}
          </div>
          <div>
            <h3 className="font-semibold text-white">{client.name}</h3>
            <p className="text-xs text-white/35">{client.industry}</p>
          </div>
        </div>
        <button className="p-1.5 rounded-lg hover:bg-white/[0.05] text-white/25 hover:text-white/70 transition-all">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>

      {/* Plan + Status */}
      <div className="flex items-center gap-2 mb-4">
        <span className="badge text-[10px] font-bold" style={{ background: `${planColor}15`, color: planColor, border: `1px solid ${planColor}25` }}>
          {client.plan}
        </span>
        <span className="badge text-[10px]" style={{ background: statusCfg.bg, color: statusCfg.color, border: `1px solid ${statusCfg.color}30` }}>
          <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: statusCfg.color }} />
          {client.status}
        </span>
        <span className="ml-auto text-xs text-white/30">{client.lastActive}</span>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {[
          { label: "MRR", value: client.mrr, icon: DollarSign },
          { label: "Agents", value: client.agents, icon: Zap },
          { label: "Health", value: `${client.health}%`, icon: Activity },
        ].map(m => {
          const Icon = m.icon;
          return (
            <div key={m.label} className="rounded-lg p-2 text-center"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
              <Icon className="w-3 h-3 mx-auto mb-1 text-white/25" />
              <div className="text-sm font-bold text-white">{m.value}</div>
              <div className="text-[10px] text-white/30">{m.label}</div>
            </div>
          );
        })}
      </div>

      {/* Health bar */}
      <div className="mb-3">
        <div className="flex justify-between mb-1">
          <span className="text-[11px] text-white/30">Account Health</span>
          <span className="text-[11px] font-semibold" style={{ color: client.health > 90 ? "#34d399" : client.health > 75 ? "#f59e0b" : "#f87171" }}>{client.health}%</span>
        </div>
        <div className="progress-bar">
          <div className="h-full rounded-full transition-all duration-700"
            style={{
              width: `${client.health}%`,
              background: client.health > 90 ? "linear-gradient(90deg,#34d39980,#34d399)" : client.health > 75 ? "linear-gradient(90deg,#f59e0b80,#f59e0b)" : "linear-gradient(90deg,#f8717180,#f87171)"
            }} />
        </div>
      </div>

      {/* Integrations */}
      <div className="flex items-center gap-1.5 flex-wrap">
        {client.integrations.map((intg, i) => (
          <span key={i} className="text-[10px] px-2 py-0.5 rounded-full text-white/40"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)" }}>
            {intg}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function ClientsPage() {
  const totalMrr = clients.reduce((acc, c) => {
    const val = parseFloat(c.mrr.replace(/[$,]/g, ""));
    return acc + val;
  }, 0);

  const mrrByPlan = [
    { plan: "Starter", value: 99 },
    { plan: "Growth", value: 299 },
    { plan: "Scale", value: 798 * 2 },
    { plan: "Enterprise", value: 2200 },
  ];

  return (
    <div className="flex flex-col h-full">
      <Topbar title="Clients" subtitle={`${clients.length} active clients · $${totalMrr.toLocaleString()} MRR`} />

      <div className="flex-1 overflow-y-auto p-6 space-y-6">

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: "Total Clients", value: clients.length, color: "#8b5cf6", icon: Users },
            { label: "Total MRR", value: `$${totalMrr.toLocaleString()}`, color: "#34d399", icon: DollarSign },
            { label: "Avg Health", value: `${Math.round(clients.reduce((a, c) => a + c.health, 0) / clients.length)}%`, color: "#22d3ee", icon: Activity },
            { label: "On Trial", value: clients.filter(c => c.status === "trial").length, color: "#f59e0b", icon: Clock },
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
          {/* Clients grid */}
          <div className="xl:col-span-2">
            {/* Toolbar */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex-1 input-field flex items-center gap-2 max-w-xs">
                <Search className="w-4 h-4 text-white/30 shrink-0" />
                <input className="bg-transparent text-sm text-white/70 placeholder-white/25 outline-none w-full" placeholder="Search clients..." />
              </div>
              <button className="btn-secondary">
                <Filter className="w-4 h-4" /> Filter
              </button>
              <button className="btn-primary ml-auto">
                <Plus className="w-4 h-4" /> Add Client
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {clients.map((client, i) => (
                <ClientCard key={client.id} client={client} index={i} />
              ))}
            </div>
          </div>

          {/* Right panel */}
          <div className="space-y-4">
            {/* MRR by Plan */}
            <div className="glass-card rounded-2xl p-5">
              <h3 className="font-display font-semibold text-white mb-1">MRR by Plan</h3>
              <p className="text-xs text-white/35 mb-4">Revenue distribution</p>
              <ResponsiveContainer width="100%" height={160}>
                <BarChart data={mrrByPlan} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <XAxis dataKey="plan" tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10 }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ background: "rgba(13,14,20,0.95)", border: "1px solid rgba(139,92,246,0.3)", borderRadius: "12px", fontSize: "12px" }}
                    formatter={(v: any) => [`$${v}`, "MRR"]}
                  />
                  <Bar dataKey="value" fill="#8b5cf6" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Top clients list */}
            <div className="glass-card rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display font-semibold text-white">Top Clients</h3>
                <TrendingUp className="w-4 h-4 text-white/25" />
              </div>
              <div className="space-y-3">
                {clients.sort((a, b) => parseFloat(b.mrr.replace(/[$,]/g, "")) - parseFloat(a.mrr.replace(/[$,]/g, ""))).map((c, i) => (
                  <div key={c.id} className="flex items-center gap-3">
                    <span className="text-xs font-bold text-white/25 w-4">{i + 1}</span>
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold text-white"
                      style={{ background: `${c.color}25` }}>
                      {c.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white/80 truncate">{c.name}</p>
                      <p className="text-[10px] text-white/30">{c.plan}</p>
                    </div>
                    <span className="text-sm font-semibold text-emerald-400">{c.mrr}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick actions */}
            <div className="glass-card rounded-2xl p-5">
              <h3 className="font-display font-semibold text-white mb-3">Quick Actions</h3>
              <div className="space-y-2">
                {[
                  { label: "Send All Weekly Reports", icon: "📊" },
                  { label: "Review At-Risk Accounts", icon: "⚠️" },
                  { label: "Export Client Data (CSV)", icon: "📥" },
                  { label: "Schedule Strategy Calls", icon: "📅" },
                ].map((a, i) => (
                  <button key={i} className="btn-ghost w-full justify-start text-xs gap-3">
                    <span>{a.icon}</span> {a.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
