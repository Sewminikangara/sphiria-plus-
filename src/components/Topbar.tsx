"use client";

import { Bell, Search, Zap, RefreshCw } from "lucide-react";
import { useState } from "react";

interface TopbarProps {
  title: string;
  subtitle?: string;
}

export default function Topbar({ title, subtitle }: TopbarProps) {
  const [searching, setSearching] = useState(false);

  return (
    <header className="h-[64px] flex items-center justify-between px-6 border-b border-white/[0.06] shrink-0"
      style={{ background: "rgba(13,14,20,0.8)", backdropFilter: "blur(12px)" }}>

      {/* Left: Title */}
      <div>
        <h1 className="font-display font-semibold text-white text-[17px] leading-tight">{title}</h1>
        {subtitle && <p className="text-xs text-white/35 mt-0.5">{subtitle}</p>}
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">

        {/* Search */}
        <div className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-300 ${searching ? "w-60" : "w-36"}`}
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
          <Search className="w-3.5 h-3.5 text-white/30 shrink-0" />
          <input
            className="bg-transparent text-sm text-white/80 placeholder-white/25 outline-none w-full font-medium"
            placeholder="Search..."
            onFocus={() => setSearching(true)}
            onBlur={() => setSearching(false)}
          />
        </div>

        {/* Refresh */}
        <button className="p-2 rounded-xl transition-all duration-200 hover:bg-white/[0.05] text-white/30 hover:text-white/70">
          <RefreshCw className="w-4 h-4" />
        </button>

        {/* Notifications */}
        <button className="relative p-2 rounded-xl transition-all duration-200 hover:bg-white/[0.05] text-white/30 hover:text-white/70">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
        </button>

        {/* AI status pill */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl ml-1"
          style={{
            background: "linear-gradient(135deg, rgba(139,92,246,0.15) 0%, rgba(34,211,238,0.08) 100%)",
            border: "1px solid rgba(139,92,246,0.25)"
          }}>
          <Zap className="w-3.5 h-3.5 text-violet-400" />
          <span className="text-xs font-semibold text-violet-300">AI Active</span>
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        </div>
      </div>
    </header>
  );
}
