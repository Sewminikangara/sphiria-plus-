"use client";

import Topbar from "@/components/Topbar";
import { revenueChartData } from "@/lib/data";
import { cn } from "@/lib/utils";
import {
  TrendingUp, TrendingDown, Eye, MousePointerClick,
  ShoppingCart, RefreshCcw, BarChart3, Zap, Target, Users
} from "lucide-react";
import {
  AreaChart, Area, LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, ComposedChart
} from "recharts";

const funnelData = [
  { stage: "Impressions", value: 142000, color: "#8b5cf6" },
  { stage: "Clicks", value: 28400, color: "#6366f1" },
  { stage: "Leads", value: 4200, color: "#22d3ee" },
  { stage: "Qualified", value: 1284, color: "#34d399" },
  { stage: "Closed", value: 312, color: "#f59e0b" },
];

const channelData = [
  { name: "Meta Ads", value: 38, color: "#8b5cf6" },
  { name: "Google Ads", value: 27, color: "#22d3ee" },
  { name: "LinkedIn", value: 18, color: "#6366f1" },
  { name: "Organic", value: 12, color: "#34d399" },
  { name: "Email", value: 5, color: "#f59e0b" },
];

const weeklyData = [
  { day: "Mon", ctr: 3.4, conv: 2.1, cac: 42 },
  { day: "Tue", ctr: 3.8, conv: 2.4, cac: 38 },
  { day: "Wed", ctr: 4.1, conv: 2.8, cac: 35 },
  { day: "Thu", ctr: 3.9, conv: 2.6, cac: 37 },
  { day: "Fri", ctr: 4.8, conv: 3.2, cac: 28 },
  { day: "Sat", ctr: 4.2, conv: 2.9, cac: 31 },
  { day: "Sun", ctr: 3.1, conv: 1.8, cac: 44 },
];

const insightAlerts = [
  { type: "opportunity", msg: "Meta Ads CTR is 4.8x above industry average on Fridays — increase budget.", color: "#22d3ee", icon: "🚀" },
  { type: "warning", msg: "CAC rose 18% on Sunday — suggest pausing Sunday campaigns.", color: "#f59e0b", icon: "⚠️" },
  { type: "success", msg: "LinkedIn campaign achieved 3.2% conversion — best this quarter.", color: "#34d399", icon: "✅" },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-strong rounded-xl p-3 text-xs shadow-2xl" style={{ border: "1px solid rgba(139,92,246,0.3)" }}>
        <p className="text-white/50 mb-2 font-medium">{label}</p>
        {payload.map((p: any, i: number) => (
          <p key={i} className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
            <span className="text-white/50">{p.name}:</span>
            <span className="font-semibold text-white">{p.value}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function AnalyticsPage() {
  const kpis = [
    { label: "Total Impressions", value: "142K", change: +24, color: "#8b5cf6", icon: Eye },
    { label: "Click-Through Rate", value: "4.1%", change: +18, color: "#22d3ee", icon: MousePointerClick },
    { label: "Conversion Rate", value: "2.6%", change: +12, color: "#34d399", icon: Target },
    { label: "Cost per Acquisition", value: "$36", change: -22, color: "#f59e0b", icon: ShoppingCart },
  ];

  return (
    <div className="flex flex-col h-full">
      <Topbar title="Analytics" subtitle="AI-powered performance intelligence" />

      <div className="flex-1 overflow-y-auto p-6 space-y-6">

        {/* KPIs */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          {kpis.map((m, i) => {
            const Icon = m.icon;
            const isUp = m.change > 0;
            return (
              <div key={m.label} className="stat-card animate-fadeInUp" style={{ animationDelay: `${i * 60}ms` }}>
                <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl" style={{ background: `linear-gradient(90deg, ${m.color}60, transparent)` }} />
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${m.color}15` }}>
                    <Icon className="w-4 h-4" style={{ color: m.color }} />
                  </div>
                  <div className={cn("badge text-[10px]", isUp ? "badge-active" : "badge-error")}>
                    {isUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {isUp ? "+" : ""}{m.change}%
                  </div>
                </div>
                <div className="text-2xl font-bold font-display text-white">{m.value}</div>
                <div className="text-xs text-white/35 mt-1">{m.label}</div>
              </div>
            );
          })}
        </div>

        {/* AI Insight Alerts */}
        <div className="grid grid-cols-3 gap-3">
          {insightAlerts.map((a, i) => (
            <div key={i} className="flex items-start gap-3 p-4 rounded-xl animate-fadeInUp"
              style={{ background: `${a.color}08`, border: `1px solid ${a.color}25`, animationDelay: `${i * 60}ms` }}>
              <span className="text-xl shrink-0">{a.icon}</span>
              <p className="text-xs text-white/60 leading-relaxed">{a.msg}</p>
            </div>
          ))}
        </div>

        {/* Charts row 1 */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Revenue trend */}
          <div className="xl:col-span-2 glass-card rounded-2xl p-5">
            <h3 className="font-display font-semibold text-white mb-1">Revenue & Lead Growth</h3>
            <p className="text-xs text-white/35 mb-4">7-month combined view</p>
            <ResponsiveContainer width="100%" height={220}>
              <ComposedChart data={revenueChartData} margin={{ top: 5, right: 5, bottom: 0, left: -20 }}>
                <defs>
                  <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="month" tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis yAxisId="left" tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis yAxisId="right" orientation="right" tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area yAxisId="left" type="monotone" dataKey="revenue" stroke="#8b5cf6" strokeWidth={2.5} fill="url(#revGrad)" name="Revenue ($)" />
                <Line yAxisId="right" type="monotone" dataKey="leads" stroke="#22d3ee" strokeWidth={2} dot={false} name="Leads" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          {/* Channel pie */}
          <div className="glass-card rounded-2xl p-5">
            <h3 className="font-display font-semibold text-white mb-1">Traffic by Channel</h3>
            <p className="text-xs text-white/35 mb-4">Lead source breakdown</p>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie data={channelData} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={3} dataKey="value">
                  {channelData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} stroke="transparent" />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ background: "rgba(13,14,20,0.95)", border: "1px solid rgba(139,92,246,0.3)", borderRadius: "12px", fontSize: "12px" }}
                  formatter={(v: any) => [`${v}%`, "Share"]}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2">
              {channelData.map((c, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: c.color }} />
                  <span className="text-xs text-white/50 flex-1">{c.name}</span>
                  <span className="text-xs font-semibold text-white">{c.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Funnel + Weekly */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Weekly performance */}
          <div className="xl:col-span-2 glass-card rounded-2xl p-5">
            <h3 className="font-display font-semibold text-white mb-1">Weekly Performance</h3>
            <p className="text-xs text-white/35 mb-4">CTR · Conversion · CAC</p>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={weeklyData} margin={{ top: 5, right: 5, bottom: 0, left: -20 }}>
                <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="day" tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="ctr" fill="#8b5cf6" radius={[4, 4, 0, 0]} name="CTR %" />
                <Bar dataKey="conv" fill="#22d3ee" radius={[4, 4, 0, 0]} name="Conv %" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Conversion funnel */}
          <div className="glass-card rounded-2xl p-5">
            <h3 className="font-display font-semibold text-white mb-1">Conversion Funnel</h3>
            <p className="text-xs text-white/35 mb-4">Prospect to closed</p>
            <div className="space-y-3">
              {funnelData.map((stage, i) => {
                const maxVal = funnelData[0].value;
                const pct = Math.round((stage.value / maxVal) * 100);
                return (
                  <div key={i}>
                    <div className="flex justify-between mb-1">
                      <span className="text-xs text-white/50">{stage.stage}</span>
                      <span className="text-xs font-semibold" style={{ color: stage.color }}>{stage.value.toLocaleString()}</span>
                    </div>
                    <div className="h-2.5 rounded-full" style={{ background: "rgba(255,255,255,0.05)" }}>
                      <div className="h-full rounded-full transition-all duration-700 animate-fadeInUp"
                        style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${stage.color}60, ${stage.color})` }} />
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 p-3 rounded-xl" style={{ background: "rgba(52,211,153,0.08)", border: "1px solid rgba(52,211,153,0.2)" }}>
              <div className="text-xs text-emerald-400 font-semibold mb-1">Overall Conversion</div>
              <div className="text-2xl font-bold font-display text-white">0.22%</div>
              <div className="text-[11px] text-white/35">Impressions → Closed</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
