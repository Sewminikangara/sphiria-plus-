"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Bot, GitBranch, Users, BarChart3,
  Brain, Plug, Settings, ChevronRight, Zap, Bell,
  Search, Menu, X, Shield, Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, path: "/" },
  { id: "agents", label: "Agent Mesh", icon: Bot, path: "/agents" },
  { id: "workflows", label: "Workflows", icon: GitBranch, path: "/workflows" },
  { id: "clients", label: "Clients", icon: Users, path: "/clients" },
  { id: "analytics", label: "Analytics", icon: BarChart3, path: "/analytics" },
  { id: "memory", label: "Knowledge Graph", icon: Brain, path: "/memory" },
  { id: "integrations", label: "Integrations", icon: Plug, path: "/integrations" },
];

const bottomNavItems = [
  { id: "settings", label: "Settings", icon: Settings, path: "/settings" },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "relative flex flex-col h-screen transition-all duration-300 ease-in-out shrink-0",
        "border-r border-white/[0.06]",
        collapsed ? "w-[72px]" : "w-[240px]"
      )}
      style={{ background: "linear-gradient(180deg, hsl(220,22%,8%) 0%, hsl(260,18%,9%) 100%)" }}
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-64 opacity-30"
          style={{ background: "radial-gradient(ellipse at 50% -20%, rgba(139,92,246,0.3) 0%, transparent 70%)" }} />
      </div>

      {/* Logo */}
      <div className={cn(
        "relative flex items-center gap-3 px-4 py-5 border-b border-white/[0.06]",
        collapsed && "justify-center px-0"
      )}>
        <div className="relative shrink-0">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center animate-pulse-glow"
            style={{ background: "linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)" }}>
            <Sparkles className="w-5 h-5 text-white" />
          </div>
        </div>
        {!collapsed && (
          <div className="animate-fadeInLeft">
            <div className="font-display font-bold text-white text-base leading-none">Sphiria<span className="gradient-brand-text">+</span></div>
            <div className="text-[10px] text-white/35 mt-0.5 font-medium tracking-wider uppercase">AI Platform</div>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            "ml-auto p-1.5 rounded-lg transition-all duration-200 hover:bg-white/[0.06] text-white/30 hover:text-white/70",
            collapsed && "ml-0 mt-0"
          )}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {!collapsed && (
          <div className="text-[10px] font-semibold tracking-widest uppercase text-white/20 px-3 mb-3">
            Navigation
          </div>
        )}
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.id}
              href={item.path}
              className={cn(
                "sidebar-link",
                isActive && "active",
                collapsed && "justify-center px-0 py-3"
              )}
              title={collapsed ? item.label : undefined}
            >
              <Icon className={cn("w-[18px] h-[18px] shrink-0", isActive ? "text-white" : "text-white/40")} />
              {!collapsed && <span>{item.label}</span>}
              {!collapsed && isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-violet-400" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Status card */}
      {!collapsed && (
        <div className="mx-3 mb-3 p-3 rounded-xl animate-fadeInUp"
          style={{
            background: "linear-gradient(135deg, rgba(139,92,246,0.12) 0%, rgba(99,102,241,0.08) 100%)",
            border: "1px solid rgba(139,92,246,0.2)"
          }}>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-medium text-emerald-400">8 Agents Online</span>
          </div>
          <div className="text-[11px] text-white/40 leading-relaxed">
            All systems operational. Last checked 12s ago.
          </div>
          <div className="mt-2 progress-bar">
            <div className="progress-fill" style={{ width: "92%" }} />
          </div>
          <div className="flex justify-between mt-1.5">
            <span className="text-[10px] text-white/25">System Load</span>
            <span className="text-[10px] text-white/40 font-medium">92%</span>
          </div>
        </div>
      )}

      {/* Bottom nav */}
      <div className="px-3 pb-4 border-t border-white/[0.05] pt-3 space-y-1">
        {bottomNavItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.id}
              href={item.path}
              className={cn("sidebar-link", collapsed && "justify-center px-0 py-3")}
              title={collapsed ? item.label : undefined}
            >
              <Icon className="w-[18px] h-[18px] text-white/40" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}

        {/* User avatar */}
        <div className={cn(
          "flex items-center gap-3 px-3 py-2.5 rounded-xl mt-2",
          "bg-white/[0.03] border border-white/[0.05]",
          collapsed && "justify-center px-0"
        )}>
          <div className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-sm font-bold text-white"
            style={{ background: "linear-gradient(135deg, #8b5cf6, #22d3ee)" }}>
            S
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <div className="text-sm font-semibold text-white/90 truncate">Sphiria Admin</div>
              <div className="text-[11px] text-white/35 truncate">admin@sphiria.ai</div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
