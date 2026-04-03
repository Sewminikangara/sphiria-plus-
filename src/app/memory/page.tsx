"use client";

import Topbar from "@/components/Topbar";
import { clients, agents } from "@/lib/data";
import { Brain, Search, Plus, Link2, Zap, RefreshCw, Eye, Network } from "lucide-react";
import { useState } from "react";

const knowledgeNodes = [
  { id: "n1", type: "client", label: "NexaRetail", x: 50, y: 30, color: "#8b5cf6", size: 28, connections: ["n3", "n4", "n7"] },
  { id: "n2", type: "client", label: "TechStart Labs", x: 78, y: 55, color: "#22d3ee", size: 24, connections: ["n3", "n5"] },
  { id: "n3", type: "campaign", label: "Q2 Meta Campaign", x: 60, y: 48, color: "#6366f1", size: 20, connections: ["n6"] },
  { id: "n4", type: "agent", label: "MarketingAgent", x: 35, y: 55, color: "#ec4899", size: 22, connections: ["n3", "n7"] },
  { id: "n5", type: "agent", label: "AnalyticsAgent", x: 70, y: 72, color: "#22d3ee", size: 22, connections: ["n8"] },
  { id: "n6", type: "insight", label: "CTR Spike", x: 55, y: 65, color: "#f59e0b", size: 16, connections: [] },
  { id: "n7", type: "integration", label: "HubSpot", x: 22, y: 38, color: "#34d399", size: 18, connections: [] },
  { id: "n8", type: "insight", label: "Growth Pattern", x: 82, y: 38, color: "#f59e0b", size: 16, connections: [] },
  { id: "n9", type: "client", label: "Bloom Agency", x: 38, y: 78, color: "#34d399", size: 22, connections: ["n4", "n10"] },
  { id: "n10", type: "campaign", label: "SEO Audit Flow", x: 20, y: 65, color: "#6366f1", size: 18, connections: [] },
];

const typeColors: Record<string, { color: string; label: string }> = {
  client: { color: "#8b5cf6", label: "Client" },
  campaign: { color: "#6366f1", label: "Campaign" },
  agent: { color: "#22d3ee", label: "Agent" },
  insight: { color: "#f59e0b", label: "Insight" },
  integration: { color: "#34d399", label: "Integration" },
};

const memoryStats = [
  { label: "Knowledge Nodes", value: "12,842", icon: Network, color: "#8b5cf6" },
  { label: "Client Contexts", value: clients.length.toString(), icon: Brain, color: "#22d3ee" },
  { label: "Linked Events", value: "48,291", icon: Link2, color: "#34d399" },
  { label: "Active Patterns", value: "284", icon: Zap, color: "#f59e0b" },
];

const recentMemories = [
  { type: "client", entity: "NexaRetail", event: "Meta Ads CTR spike recorded → linked to Q2 campaign node", time: "8 min ago", color: "#8b5cf6" },
  { type: "insight", entity: "Pattern Detected", event: "Friday campaigns consistently outperform by 4.1x across 3 clients", time: "2 hr ago", color: "#f59e0b" },
  { type: "agent", entity: "MarketingAgent", event: "New copy variant pattern saved for e-commerce verticals", time: "4 hr ago", color: "#22d3ee" },
  { type: "client", entity: "UrbanEstate", event: "Usage drop pattern flagged — churn risk model updated", time: "6 hr ago", color: "#f87171" },
  { type: "integration", entity: "HubSpot", event: "124 new lead records ingested and linked to lead profiles", time: "1 day ago", color: "#34d399" },
];

export default function MemoryPage() {
  const [selectedNode, setSelectedNode] = useState<string | null>("n1");
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const node = knowledgeNodes.find(n => n.id === selectedNode);

  return (
    <div className="flex flex-col h-full">
      <Topbar title="Knowledge Graph" subtitle="Sphiria Brain · Persistent intelligence layer" />

      <div className="flex-1 overflow-y-auto p-6 space-y-6">

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4">
          {memoryStats.map((s, i) => {
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

          {/* Graph Visualization */}
          <div className="xl:col-span-2 glass-card rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-display font-semibold text-white">Business Knowledge Graph</h3>
                <p className="text-xs text-white/35 mt-0.5">Interactive entity relationship map</p>
              </div>
              <div className="flex gap-2">
                <button className="btn-ghost text-xs"><RefreshCw className="w-3.5 h-3.5" /> Refresh</button>
                <button className="btn-secondary text-xs"><Eye className="w-3.5 h-3.5" /> Full View</button>
              </div>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-3 mb-4">
              {Object.entries(typeColors).map(([type, cfg]) => (
                <div key={type} className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: cfg.color }} />
                  <span className="text-[11px] text-white/40 capitalize">{cfg.label}</span>
                </div>
              ))}
            </div>

            {/* SVG Graph */}
            <div className="relative rounded-xl overflow-hidden"
              style={{ height: "340px", background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.05)" }}>
              <div className="absolute inset-0 dot-grid opacity-20" />
              <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
                {/* Edges */}
                {knowledgeNodes.map(node =>
                  node.connections.map(connId => {
                    const target = knowledgeNodes.find(n => n.id === connId);
                    if (!target) return null;
                    return (
                      <line key={`${node.id}-${connId}`}
                        x1={node.x} y1={node.y} x2={target.x} y2={target.y}
                        stroke="rgba(255,255,255,0.08)" strokeWidth="0.5"
                        strokeDasharray={hoveredNode === node.id ? "none" : "1,2"}
                      />
                    );
                  })
                )}
                {/* Nodes */}
                {knowledgeNodes.map(n => {
                  const isSelected = selectedNode === n.id;
                  const isHovered = hoveredNode === n.id;
                  return (
                    <g key={n.id}
                      onClick={() => setSelectedNode(n.id)}
                      onMouseEnter={() => setHoveredNode(n.id)}
                      onMouseLeave={() => setHoveredNode(null)}
                      style={{ cursor: "pointer" }}>
                      {isSelected && (
                        <circle cx={n.x} cy={n.y} r={n.size / 10 + 2.5}
                          fill="transparent" stroke={n.color} strokeWidth="0.5" strokeDasharray="1.5,1.5" opacity={0.6}>
                          <animateTransform attributeName="transform" type="rotate" from={`0 ${n.x} ${n.y}`} to={`360 ${n.x} ${n.y}`} dur="4s" repeatCount="indefinite" />
                        </circle>
                      )}
                      <circle cx={n.x} cy={n.y} r={n.size / 10}
                        fill={`${n.color}${isSelected ? "40" : "20"}`}
                        stroke={n.color}
                        strokeWidth={isSelected ? "1" : "0.5"}
                        opacity={isSelected || isHovered ? 1 : 0.7}
                      />
                      <text x={n.x} y={n.y + n.size / 10 + 2.5} textAnchor="middle"
                        fontSize="2.2" fill="rgba(255,255,255,0.55)" fontWeight={isSelected ? "bold" : "normal"}>
                        {n.label.length > 12 ? n.label.slice(0, 12) + "…" : n.label}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Selected node info */}
            {node && (
              <div className="mt-4 p-3 rounded-xl flex items-center gap-3"
                style={{ background: `${node.color}10`, border: `1px solid ${node.color}30` }}>
                <div className="w-3 h-3 rounded-full shrink-0" style={{ background: node.color }} />
                <div>
                  <span className="text-sm font-semibold text-white">{node.label}</span>
                  <span className="text-xs text-white/40 ml-2 capitalize">{node.type}</span>
                </div>
                <div className="ml-auto text-xs text-white/30">{node.connections.length} connections</div>
              </div>
            )}
          </div>

          {/* Recent Memory Events */}
          <div className="space-y-4">
            <div className="glass-card rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display font-semibold text-white">Memory Events</h3>
                <span className="badge badge-active text-[10px]">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Live
                </span>
              </div>

              {/* Search */}
              <div className="flex items-center gap-2 mb-4 input-field">
                <Search className="w-3.5 h-3.5 text-white/30 shrink-0" />
                <input className="bg-transparent text-xs text-white/70 placeholder-white/25 outline-none w-full" placeholder="Search knowledge..." />
              </div>

              <div className="space-y-3">
                {recentMemories.map((m, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-xl transition-all hover:bg-white/[0.02]"
                    style={{ border: "1px solid rgba(255,255,255,0.04)" }}>
                    <div className="w-2.5 h-2.5 rounded-full mt-1 shrink-0" style={{ background: m.color }} />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-white/70">{m.entity}</p>
                      <p className="text-[11px] text-white/40 leading-relaxed mt-0.5">{m.event}</p>
                      <p className="text-[10px] text-white/25 mt-1">{m.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card rounded-2xl p-5">
              <h3 className="font-display font-semibold text-white mb-3">Memory Actions</h3>
              <div className="space-y-2">
                {[
                  { label: "Query Knowledge Graph", icon: Search },
                  { label: "Add Manual Context", icon: Plus },
                  { label: "Export Memory Snapshot", icon: Brain },
                  { label: "Rebuild Graph Index", icon: RefreshCw },
                ].map((a, i) => {
                  const Icon = a.icon;
                  return (
                    <button key={i} className="btn-ghost w-full justify-start text-xs gap-3">
                      <Icon className="w-3.5 h-3.5" /> {a.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
