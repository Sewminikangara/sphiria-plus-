"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Topbar from "@/components/Topbar";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line
} from "recharts";
import {
  TrendingUp, TrendingDown, ArrowUpRight, ArrowRight,
  Zap, Eye, CheckCircle, AlertTriangle, Info, ChevronRight, Bot, Activity
} from "lucide-react";
import { kpiMetrics, revenueChartData, activityFeed, agents, insightCards, workflows } from "@/lib/data";
import { cn } from "@/lib/utils";

/* ── Custom Tooltip ── */
function CustomTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="glass-strong rounded-xl p-3 text-xs shadow-2xl"
        style={{ border: "1px solid rgba(139,92,246,0.3)" }}>
        <p className="text-white/50 mb-2 font-medium">{label}</p>
        {payload.map((p: any, i: number) => (
          <p key={i} style={{ color: p.color }} className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full inline-block" style={{ background: p.color }} />
            <span className="text-white/60">{p.name}:</span>
            <span className="font-semibold text-white">{typeof p.value === "number" && p.name === "revenue" ? `$${p.value.toLocaleString()}` : p.value.toLocaleString()}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
}

/* ── Mini Sparkline ── */
function Sparkline({ data, color }: { data: number[]; color: string }) {
  const chartData = data.map((v, i) => ({ v }));
  return (
    <ResponsiveContainer width={80} height={36}>
      <LineChart data={chartData}>
        <Line type="monotone" dataKey="v" stroke={color} strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}

/* ── KPI Card ── */
function KpiCard({ metric, index }: { metric: typeof kpiMetrics[0]; index: number }) {
  const isUp = metric.trend === "up";
  return (
    <div className="stat-card animate-fadeInUp" style={{ animationDelay: `${index * 80}ms` }}>
      {/* Top glow accent */}
      <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl"
        style={{ background: `linear-gradient(90deg, ${metric.color}60, transparent)` }} />

      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-xs font-medium text-white/40 mb-1">{metric.label}</p>
          <p className="text-2xl font-bold font-display text-white">{metric.value}</p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className={cn("badge", isUp ? "badge-active" : "badge-error")}>
            {isUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            {isUp ? "+" : ""}{metric.change}%
          </div>
          <Sparkline data={metric.sparkline} color={metric.color} />
        </div>
      </div>

      <p className="text-[11px] text-white/25 mt-1">vs last month</p>
    </div>
  );
}

/* ── Insight Card ── */
function InsightCard({ insight }: { insight: typeof insightCards[0] }) {
  const typeConfig = {
    opportunity: { icon: TrendingUp, color: "#22d3ee", bg: "rgba(34,211,238,0.08)", border: "rgba(34,211,238,0.2)", label: "Opportunity" },
    warning: { icon: AlertTriangle, color: "#f59e0b", bg: "rgba(245,158,11,0.08)", border: "rgba(245,158,11,0.2)", label: "Warning" },
    success: { icon: CheckCircle, color: "#34d399", bg: "rgba(52,211,153,0.08)", border: "rgba(52,211,153,0.2)", label: "Success" },
  };
  const cfg = typeConfig[insight.type as keyof typeof typeConfig];
  const Icon = cfg.icon;

  return (
    <div className="rounded-2xl p-4 transition-all duration-300 hover:scale-[1.01]"
      style={{ background: cfg.bg, border: `1px solid ${cfg.border}` }}>
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: `${cfg.color}20` }}>
          <Icon className="w-4 h-4" style={{ color: cfg.color }} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: cfg.color }}>{cfg.label}</span>
            <span className="text-[10px] text-white/25">{insight.time}</span>
          </div>
          <h4 className="text-sm font-semibold text-white mb-1">{insight.title}</h4>
          <p className="text-xs text-white/45 leading-relaxed">{insight.body}</p>
          <div className="flex items-center justify-between mt-3">
            <span className="text-[10px] text-white/25">by {insight.agent} · {insight.confidence}% confidence</span>
            <button className="text-xs font-semibold flex items-center gap-1 hover:gap-2 transition-all duration-200"
              style={{ color: cfg.color }}>
              {insight.action} <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Activity Item ── */
function ActivityItem({ item, index }: { item: typeof activityFeed[0]; index: number }) {
  const typeColor = { success: "#34d399", warning: "#f59e0b", error: "#f87171" };
  const color = typeColor[item.type as keyof typeof typeColor];
  return (
    <div className="flex items-start gap-3 py-3 border-b border-white/[0.04] last:border-0 animate-fadeInUp"
      style={{ animationDelay: `${index * 50}ms` }}>
      <div className="w-7 h-7 rounded-lg flex items-center justify-center text-sm shrink-0"
        style={{ background: `${color}15` }}>
        {item.icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-white/70 leading-relaxed">{item.action}</p>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-[10px] font-medium" style={{ color }}>{item.agent}</span>
          <span className="text-[10px] text-white/25">{item.time}</span>
        </div>
      </div>
      <div className="w-1.5 h-1.5 rounded-full shrink-0 mt-1.5" style={{ background: color, opacity: 0.7 }} />
    </div>
  );
}

/* ── Agent Mini Row ── */
function AgentMiniRow({ agent, index }: { agent: typeof agents[0]; index: number }) {
  const statusColor = { active: "#34d399", idle: "#fbbf24", processing: "#a78bfa", error: "#f87171" };
  const color = statusColor[agent.status as keyof typeof statusColor];

  return (
    <div className="flex items-center gap-3 py-2.5 border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02] px-2 -mx-2 rounded-lg transition-all duration-200"
      style={{ animationDelay: `${index * 40}ms` }}>
      <div className="text-lg shrink-0">{agent.icon}</div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-white/85 truncate">{agent.name}</span>
          <div className={cn("badge text-[10px] py-0.5", agent.status === "active" ? "badge-active" : agent.status === "processing" ? "badge-processing" : "badge-idle")}>
            <div className={cn("w-1.5 h-1.5 rounded-full", agent.status === "active" ? "bg-emerald-400 animate-pulse" : "bg-amber-400")} />
            {agent.status}
          </div>
        </div>
        <p className="text-[11px] text-white/30 truncate mt-0.5">{agent.lastAction}</p>
      </div>
      <div className="text-right shrink-0">
        <div className="text-xs font-semibold text-white/70">{agent.tasksCompleted}</div>
        <div className="text-[10px] text-white/25">tasks</div>
      </div>
    </div>
  );
}

/* ── Workflow Row ── */
function WorkflowRow({ wf, index }: { wf: typeof workflows[0]; index: number }) {
  const pct = Math.round((wf.completedSteps / wf.steps) * 100);
  const statusColor = { running: "#34d399", pending: "#f59e0b", completed: "#22d3ee" };
  const color = statusColor[wf.status as keyof typeof statusColor] || "#34d399";

  return (
    <div className="p-3 rounded-xl mb-2 last:mb-0 transition-all duration-200 hover:bg-white/[0.03]"
      style={{ border: "1px solid rgba(255,255,255,0.05)", animationDelay: `${index * 60}ms` }}>
      <div className="flex items-start justify-between mb-2">
        <div>
          <p className="text-sm font-semibold text-white/85">{wf.name}</p>
          <p className="text-[11px] text-white/30 mt-0.5">{wf.client} · {wf.triggeredAt}</p>
        </div>
        <div className="badge text-[10px]" style={{ background: `${color}15`, color, border: `1px solid ${color}30` }}>
          {wf.status === "running" && <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: color }} />}
          {wf.status}
        </div>
      </div>
      <div className="progress-bar mb-1.5">
        <div className="progress-fill" style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${color}80, ${color})` }} />
      </div>
      <div className="flex justify-between">
        <span className="text-[10px] text-white/25">{wf.completedSteps}/{wf.steps} steps</span>
        <span className="text-[10px] font-medium" style={{ color }}>{pct}%</span>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   MAIN DASHBOARD PAGE
═══════════════════════════════════════════ */
export default function DashboardPage() {
  const [chartView, setChartView] = useState<"revenue" | "leads" | "automations">("revenue");
  const [liveCount, setLiveCount] = useState(8024);

  // Simulate live counter
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveCount(c => c + Math.floor(Math.random() * 3));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const chartColorMap = {
    revenue: "#8b5cf6",
    leads: "#22d3ee",
    automations: "#34d399",
  };

  return (
    <div className="flex flex-col h-full">
      <Topbar title="Dashboard" subtitle="Sphiria+ Intelligence Overview" />

      <div className="flex-1 overflow-y-auto p-6 space-y-6">

        {/* ─── Banner ─── */}
        <div className="relative rounded-2xl overflow-hidden p-6 animate-fadeInUp"
          style={{
            background: "linear-gradient(135deg, rgba(139,92,246,0.2) 0%, rgba(99,102,241,0.15) 50%, rgba(34,211,238,0.1) 100%)",
            border: "1px solid rgba(139,92,246,0.25)"
          }}>
          <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />
          <div className="absolute top-0 right-0 w-64 h-64 opacity-20 pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(139,92,246,0.6) 0%, transparent 70%)" }} />
          <div className="relative flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-semibold text-emerald-400 tracking-wide uppercase">Platform Live</span>
              </div>
              <h2 className="font-display text-2xl font-bold text-white mb-1">
                Good morning, <span className="gradient-brand-text">Sphiria</span> 👋
              </h2>
              <p className="text-white/45 text-sm">
                8 agents active · 4 workflows running · 23 campaigns live · <span className="text-emerald-400 font-semibold">{liveCount.toLocaleString()} tasks automated</span>
              </p>
            </div>
            <div className="hidden md:flex items-center gap-3">
              <button className="btn-primary">
                <Zap className="w-4 h-4" /> Run Campaign
              </button>
              <button className="btn-secondary">
                <Bot className="w-4 h-4" /> Spawn Agent
              </button>
            </div>
          </div>
        </div>

        {/* ─── KPI Cards ─── */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          {kpiMetrics.map((m, i) => <KpiCard key={m.id} metric={m} index={i} />)}
        </div>

        {/* ─── Main Grid ─── */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

          {/* Revenue Chart (2/3) */}
          <div className="xl:col-span-2 glass-card rounded-2xl p-5 animate-fadeInUp">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="font-display font-semibold text-white text-base">Platform Performance</h3>
                <p className="text-xs text-white/35 mt-0.5">7-month growth overview</p>
              </div>
              <div className="flex gap-1 p-1 rounded-xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                {(["revenue", "leads", "automations"] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setChartView(tab)}
                    className={cn(
                      "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 capitalize",
                      chartView === tab
                        ? "text-white"
                        : "text-white/35 hover:text-white/60"
                    )}
                    style={chartView === tab ? { background: chartColorMap[tab] + "25", color: chartColorMap[tab] } : {}}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={revenueChartData} margin={{ top: 5, right: 5, bottom: 0, left: -20 }}>
                <defs>
                  <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={chartColorMap[chartView]} stopOpacity={0.3} />
                    <stop offset="100%" stopColor={chartColorMap[chartView]} stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="month" tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey={chartView}
                  stroke={chartColorMap[chartView]}
                  strokeWidth={2.5}
                  fill="url(#areaGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* AI Insights (1/3) */}
          <div className="glass-card rounded-2xl p-5 animate-fadeInUp" style={{ animationDelay: "100ms" }}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-display font-semibold text-white text-base">AI Insights</h3>
                <p className="text-xs text-white/35 mt-0.5">Agent-generated signals</p>
              </div>
              <div className="badge badge-active text-[10px]">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Live
              </div>
            </div>
            <div className="space-y-3">
              {insightCards.map(insight => <InsightCard key={insight.id} insight={insight} />)}
            </div>
          </div>
        </div>

        {/* ─── Bottom Grid ─── */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

          {/* Activity Feed */}
          <div className="glass-card rounded-2xl p-5 animate-fadeInUp">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-display font-semibold text-white text-base">Activity Feed</h3>
                <p className="text-xs text-white/35 mt-0.5">Real-time agent log</p>
              </div>
              <Activity className="w-4 h-4 text-white/25" />
            </div>
            <div>
              {activityFeed.slice(0, 6).map((item, i) => (
                <ActivityItem key={item.id} item={item} index={i} />
              ))}
            </div>
            <button className="btn-ghost w-full mt-3 justify-center text-xs">
              View all activity <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Agents Overview */}
          <div className="glass-card rounded-2xl p-5 animate-fadeInUp" style={{ animationDelay: "80ms" }}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-display font-semibold text-white text-base">Agent Mesh</h3>
                <p className="text-xs text-white/35 mt-0.5">8 agents deployed</p>
              </div>
              <Link href="/agents" className="text-xs text-violet-400 hover:text-violet-300 font-semibold flex items-center gap-1 transition-colors">
                View all <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
            <div>
              {agents.slice(0, 6).map((agent, i) => (
                <AgentMiniRow key={agent.id} agent={agent} index={i} />
              ))}
            </div>
          </div>

          {/* Active Workflows */}
          <div className="glass-card rounded-2xl p-5 animate-fadeInUp" style={{ animationDelay: "160ms" }}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-display font-semibold text-white text-base">Active Workflows</h3>
                <p className="text-xs text-white/35 mt-0.5">4 running now</p>
              </div>
              <Link href="/workflows" className="text-xs text-violet-400 hover:text-violet-300 font-semibold flex items-center gap-1 transition-colors">
                Builder <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
            <div>
              {workflows.map((wf, i) => <WorkflowRow key={wf.id} wf={wf} index={i} />)}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}


