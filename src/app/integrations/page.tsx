"use client";

import Topbar from "@/components/Topbar";
import { CheckCircle2, AlertCircle, Plus, RefreshCw, Settings, ExternalLink, Plug } from "lucide-react";

const integrations = [
  {
    category: "CRM & Sales",
    items: [
      { name: "HubSpot", icon: "🟠", status: "connected", description: "Contacts, deals, campaigns", lastSync: "2 min ago", color: "#f97316" },
      { name: "Salesforce", icon: "☁️", status: "disconnected", description: "Enterprise CRM & pipelines", lastSync: "Never", color: "#0ea5e9" },
      { name: "Zoho CRM", icon: "🔵", status: "connected", description: "Lead management & automation", lastSync: "15 min ago", color: "#6366f1" },
    ],
  },
  {
    category: "Advertising",
    items: [
      { name: "Meta Ads", icon: "📘", status: "connected", description: "Facebook & Instagram campaigns", lastSync: "5 min ago", color: "#1877f2" },
      { name: "Google Ads", icon: "🔍", status: "connected", description: "Search, Display, YouTube", lastSync: "8 min ago", color: "#34d399" },
      { name: "LinkedIn Ads", icon: "💼", status: "pending", description: "B2B lead generation ads", lastSync: "—", color: "#0a66c2" },
    ],
  },
  {
    category: "Messaging",
    items: [
      { name: "WhatsApp Business", icon: "💬", status: "connected", description: "Customer support & outreach", lastSync: "Just now", color: "#25d366" },
      { name: "Slack", icon: "⚡", status: "connected", description: "Team alerts & notifications", lastSync: "3 min ago", color: "#8b5cf6" },
      { name: "Twilio", icon: "📱", status: "disconnected", description: "SMS & voice automation", lastSync: "Never", color: "#f87171" },
    ],
  },
  {
    category: "Analytics",
    items: [
      { name: "Google Analytics 4", icon: "📊", status: "connected", description: "Web traffic & conversions", lastSync: "1 min ago", color: "#f59e0b" },
      { name: "Mixpanel", icon: "🔮", status: "connected", description: "Product analytics & funnels", lastSync: "12 min ago", color: "#a78bfa" },
      { name: "PostHog", icon: "🦔", status: "pending", description: "Open-source product analytics", lastSync: "—", color: "#34d399" },
    ],
  },
  {
    category: "E-commerce",
    items: [
      { name: "Shopify", icon: "🛍️", status: "connected", description: "Store, orders & customers", lastSync: "4 min ago", color: "#96bf48" },
      { name: "WooCommerce", icon: "🛒", status: "disconnected", description: "WordPress e-commerce", lastSync: "Never", color: "#7f54b3" },
    ],
  },
];

const statusConfig = {
  connected: { color: "#34d399", label: "Connected", icon: CheckCircle2, cls: "badge-active" },
  disconnected: { color: "#f87171", label: "Disconnected", icon: AlertCircle, cls: "badge-error" },
  pending: { color: "#fbbf24", label: "Pending", icon: Settings, cls: "badge-idle" },
};

function IntegrationCard({ item }: { item: typeof integrations[0]["items"][0] }) {
  const cfg = statusConfig[item.status as keyof typeof statusConfig];
  const Icon = cfg.icon;
  const isConnected = item.status === "connected";

  return (
    <div className="flex items-center gap-4 p-4 rounded-xl transition-all duration-200 hover:bg-white/[0.03]"
      style={{ border: "1px solid rgba(255,255,255,0.05)" }}>
      <div className="text-2xl shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
        style={{ background: `${item.color}15` }}>
        {item.icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-white text-sm">{item.name}</span>
          <div className={`badge text-[10px] ${cfg.cls}`}>
            <Icon className="w-2.5 h-2.5" />
            {cfg.label}
          </div>
        </div>
        <p className="text-xs text-white/35 mt-0.5">{item.description}</p>
        {isConnected && <p className="text-[10px] text-white/20 mt-1">Last synced: {item.lastSync}</p>}
      </div>
      <div className="flex gap-2 shrink-0">
        {isConnected ? (
          <>
            <button className="p-1.5 rounded-lg hover:bg-white/[0.05] text-white/25 hover:text-white/70 transition-all" title="Settings">
              <Settings className="w-3.5 h-3.5" />
            </button>
            <button className="p-1.5 rounded-lg hover:bg-white/[0.05] text-white/25 hover:text-white/70 transition-all" title="Open">
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </>
        ) : (
          <button className="btn-primary text-xs px-3 py-1.5">Connect</button>
        )}
      </div>
    </div>
  );
}

export default function IntegrationsPage() {
  const allItems = integrations.flatMap(c => c.items);
  const connectedCount = allItems.filter(i => i.status === "connected").length;
  const totalCount = allItems.length;

  return (
    <div className="flex flex-col h-full">
      <Topbar title="Integrations" subtitle={`${connectedCount} of ${totalCount} connected`} />

      <div className="flex-1 overflow-y-auto p-6 space-y-6">

        {/* Header stats */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: "Connected", value: connectedCount, color: "#34d399", bg: "rgba(52,211,153,0.1)" },
            { label: "Pending Setup", value: allItems.filter(i => i.status === "pending").length, color: "#fbbf24", bg: "rgba(251,191,36,0.1)" },
            { label: "Disconnected", value: allItems.filter(i => i.status === "disconnected").length, color: "#f87171", bg: "rgba(248,113,113,0.1)" },
            { label: "Data Syncs Today", value: "1,284", color: "#8b5cf6", bg: "rgba(139,92,246,0.1)" },
          ].map((s, i) => (
            <div key={s.label} className="stat-card animate-fadeInUp" style={{ animationDelay: `${i * 60}ms` }}>
              <div className="text-2xl font-bold font-display mb-1" style={{ color: s.color }}>{s.value}</div>
              <div className="text-xs text-white/40">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Integration hub banner */}
        <div className="relative rounded-2xl p-5 overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(139,92,246,0.12) 0%, rgba(34,211,238,0.08) 100%)",
            border: "1px solid rgba(139,92,246,0.2)"
          }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: "rgba(139,92,246,0.2)" }}>
                <Plug className="w-6 h-6 text-violet-400" />
              </div>
              <div>
                <h3 className="font-display font-bold text-white text-base">Integration Hub</h3>
                <p className="text-sm text-white/45 mt-0.5">All your tools, unified under Sphiria+ intelligence</p>
              </div>
            </div>
            <button className="btn-primary">
              <Plus className="w-4 h-4" /> Add Integration
            </button>
          </div>
        </div>

        {/* Integration categories */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {integrations.map((category) => (
            <div key={category.category} className="glass-card rounded-2xl p-5 animate-fadeInUp">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display font-semibold text-white">{category.category}</h3>
                <span className="text-xs text-white/30">
                  {category.items.filter(i => i.status === "connected").length}/{category.items.length} active
                </span>
              </div>
              <div className="space-y-2">
                {category.items.map((item, i) => (
                  <IntegrationCard key={i} item={item} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
