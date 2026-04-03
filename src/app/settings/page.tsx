"use client";

import Topbar from "@/components/Topbar";
import { Settings, Bell, Shield, Key, Palette, Globe, Bot, Zap, ChevronRight, Save, User } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const settingsSections = [
  { id: "profile", label: "Profile", icon: User },
  { id: "ai", label: "AI Configuration", icon: Bot },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security & Auth", icon: Shield },
  { id: "api", label: "API Keys", icon: Key },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "billing", label: "Billing & Plan", icon: Zap },
];

function Toggle({ defaultOn = false, label }: { defaultOn?: boolean; label: string }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <div className="flex items-center justify-between py-3 border-b border-white/[0.04] last:border-0">
      <span className="text-sm text-white/70">{label}</span>
      <button
        onClick={() => setOn(!on)}
        className={cn("relative w-10 h-5 rounded-full transition-all duration-300", on ? "bg-violet-500" : "bg-white/10")}
      >
        <div className={cn("absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all duration-300", on ? "left-5.5" : "left-0.5")}
          style={{ left: on ? "22px" : "2px" }} />
      </button>
    </div>
  );
}

function SettingRow({ label, value, type = "text" }: { label: string; value: string; type?: string }) {
  return (
    <div className="py-3 border-b border-white/[0.04] last:border-0">
      <label className="text-xs text-white/40 block mb-1.5">{label}</label>
      <input
        type={type}
        defaultValue={value}
        className="input-field text-sm"
      />
    </div>
  );
}

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState("profile");
  const [llmModel, setLlmModel] = useState("claude-3-5-sonnet");

  return (
    <div className="flex flex-col h-full">
      <Topbar title="Settings" subtitle="Platform configuration & preferences" />

      <div className="flex-1 overflow-hidden flex">
        {/* Left nav */}
        <div className="w-56 shrink-0 border-r border-white/[0.05] p-4 space-y-1"
          style={{ background: "rgba(0,0,0,0.15)" }}>
          {settingsSections.map(s => {
            const Icon = s.icon;
            return (
              <button
                key={s.id}
                onClick={() => setActiveSection(s.id)}
                className={cn(
                  "sidebar-link w-full",
                  activeSection === s.id && "active"
                )}
              >
                <Icon className="w-4 h-4" />
                {s.label}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-2xl space-y-6">

            {activeSection === "profile" && (
              <>
                <div className="glass-card rounded-2xl p-6">
                  <h2 className="font-display font-bold text-white text-lg mb-5">Profile Settings</h2>
                  <div className="flex items-center gap-4 mb-6 p-4 rounded-xl" style={{ background: "rgba(255,255,255,0.03)" }}>
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold text-white"
                      style={{ background: "linear-gradient(135deg, #8b5cf6, #22d3ee)" }}>S</div>
                    <div>
                      <p className="font-semibold text-white">Sphiria Admin</p>
                      <p className="text-sm text-white/40">admin@sphiria.ai · Super Admin</p>
                      <button className="text-xs text-violet-400 hover:text-violet-300 transition-colors mt-1">Change avatar</button>
                    </div>
                  </div>
                  <SettingRow label="Full Name" value="Sphiria Admin" />
                  <SettingRow label="Email Address" value="admin@sphiria.ai" type="email" />
                  <SettingRow label="Company" value="Sphiria Digital" />
                  <SettingRow label="Timezone" value="Asia/Colombo (UTC+5:30)" />
                  <div className="pt-4">
                    <button className="btn-primary"><Save className="w-4 h-4" /> Save Changes</button>
                  </div>
                </div>
              </>
            )}

            {activeSection === "ai" && (
              <div className="glass-card rounded-2xl p-6">
                <h2 className="font-display font-bold text-white text-lg mb-5">AI Configuration</h2>

                {/* LLM Selector */}
                <div className="mb-5">
                  <label className="text-xs text-white/40 block mb-2">Primary LLM Model</label>
                  <div className="grid grid-cols-1 gap-2">
                    {[
                      { id: "claude-3-5-sonnet", label: "Claude 3.5 Sonnet", desc: "Best balance of speed & quality", color: "#f59e0b" },
                      { id: "gpt-4o", label: "GPT-4o", desc: "OpenAI flagship model", color: "#34d399" },
                      { id: "gemini-1-5-pro", label: "Gemini 1.5 Pro", desc: "Google multimodal model", color: "#22d3ee" },
                    ].map(m => (
                      <button key={m.id} onClick={() => setLlmModel(m.id)}
                        className={cn(
                          "flex items-center gap-3 p-3 rounded-xl text-left transition-all duration-200",
                          llmModel === m.id ? "border-violet-500/40 bg-violet-500/10" : "border-white/05 bg-white/[0.02]"
                        )}
                        style={{ border: `1px solid ${llmModel === m.id ? "rgba(139,92,246,0.4)" : "rgba(255,255,255,0.05)"}` }}>
                        <div className="w-3 h-3 rounded-full border-2 shrink-0 flex items-center justify-center"
                          style={{ borderColor: m.color }}>
                          {llmModel === m.id && <div className="w-1.5 h-1.5 rounded-full" style={{ background: m.color }} />}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-white">{m.label}</p>
                          <p className="text-xs text-white/35">{m.desc}</p>
                        </div>
                        {llmModel === m.id && <span className="ml-auto badge badge-active text-[10px]">Active</span>}
                      </button>
                    ))}
                  </div>
                </div>

                <Toggle defaultOn={true} label="Enable Multi-Agent Collaboration" />
                <Toggle defaultOn={true} label="Persistent Memory (Long-term Context)" />
                <Toggle defaultOn={false} label="Human-in-the-Loop Approval Gates" />
                <Toggle defaultOn={true} label="Explainable AI Decision Logging" />
                <Toggle defaultOn={false} label="Autonomous Budget Management" />
                <Toggle defaultOn={true} label="Real-time Anomaly Detection" />

                <div className="pt-4">
                  <button className="btn-primary"><Save className="w-4 h-4" /> Save Configuration</button>
                </div>
              </div>
            )}

            {activeSection === "notifications" && (
              <div className="glass-card rounded-2xl p-6">
                <h2 className="font-display font-bold text-white text-lg mb-5">Notification Settings</h2>
                <Toggle defaultOn={true} label="Agent task completions" />
                <Toggle defaultOn={true} label="Anomaly & alert detection" />
                <Toggle defaultOn={false} label="Client health score drops" />
                <Toggle defaultOn={true} label="Workflow failures or errors" />
                <Toggle defaultOn={false} label="Weekly performance digest" />
                <Toggle defaultOn={true} label="New lead qualified" />
                <Toggle defaultOn={false} label="Integration sync failures" />
                <div className="pt-4">
                  <button className="btn-primary"><Save className="w-4 h-4" /> Save Preferences</button>
                </div>
              </div>
            )}

            {activeSection === "api" && (
              <div className="glass-card rounded-2xl p-6">
                <h2 className="font-display font-bold text-white text-lg mb-5">API Keys</h2>
                <p className="text-sm text-white/40 mb-5">Store your LLM provider and integration API keys securely. Keys are encrypted at rest.</p>
                {[
                  { label: "OpenAI API Key", placeholder: "sk-..." },
                  { label: "Anthropic API Key", placeholder: "sk-ant-..." },
                  { label: "Google AI API Key", placeholder: "AIza..." },
                  { label: "Pinecone API Key", placeholder: "pcsk_..." },
                  { label: "HubSpot Access Token", placeholder: "pat-..." },
                ].map((k, i) => (
                  <div key={i} className="py-3 border-b border-white/[0.04] last:border-0">
                    <label className="text-xs text-white/40 block mb-1.5">{k.label}</label>
                    <div className="flex gap-2">
                      <input type="password" placeholder={k.placeholder} className="input-field text-sm flex-1" />
                      <button className="btn-secondary text-xs px-3">Save</button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeSection === "billing" && (
              <div className="space-y-4">
                <div className="glass-card rounded-2xl p-6">
                  <h2 className="font-display font-bold text-white text-lg mb-4">Current Plan</h2>
                  <div className="p-5 rounded-2xl mb-4"
                    style={{ background: "linear-gradient(135deg, rgba(139,92,246,0.2) 0%, rgba(34,211,238,0.1) 100%)", border: "1px solid rgba(139,92,246,0.3)" }}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-white/40 uppercase tracking-widest mb-1">Active Plan</p>
                        <p className="text-2xl font-bold font-display text-white">Scale</p>
                        <p className="text-sm text-white/40 mt-1">$799/month · Up to 10 agents</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-white/40">Next billing date</p>
                        <p className="text-sm font-semibold text-white mt-1">May 3, 2026</p>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {["Starter — $99", "Growth — $299", "Enterprise — Custom"].map((p, i) => (
                      <button key={i} className="btn-secondary text-xs py-2">{p}</button>
                    ))}
                  </div>
                </div>
                <div className="glass-card rounded-2xl p-5">
                  <h3 className="font-display font-semibold text-white mb-4">Usage This Month</h3>
                  {[
                    { label: "Agent Tasks", used: 8024, limit: 10000, color: "#8b5cf6" },
                    { label: "LLM Tokens", used: 3200000, limit: 5000000, color: "#22d3ee" },
                    { label: "Active Workflows", used: 6, limit: "Unlimited", color: "#34d399" },
                    { label: "Integrations", used: 8, limit: "Unlimited", color: "#f59e0b" },
                  ].map((u, i) => (
                    <div key={i} className="mb-4 last:mb-0">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-white/60">{u.label}</span>
                        <span className="text-xs text-white/35">{typeof u.used === "number" ? u.used.toLocaleString() : u.used} / {typeof u.limit === "number" ? u.limit.toLocaleString() : u.limit}</span>
                      </div>
                      {typeof u.limit === "number" && (
                        <div className="progress-bar">
                          <div className="progress-fill" style={{ width: `${Math.round((u.used as number / u.limit) * 100)}%`, background: u.color }} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Default state for unbuilt sections */}
            {!["profile", "ai", "notifications", "api", "billing"].includes(activeSection) && (
              <div className="glass-card rounded-2xl p-8 text-center">
                <Settings className="w-10 h-10 text-white/20 mx-auto mb-3" />
                <p className="text-white/50 font-medium capitalize">{activeSection} settings</p>
                <p className="text-sm text-white/25 mt-1">Coming soon in next release</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
