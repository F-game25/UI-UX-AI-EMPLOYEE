import { Bell, Search, ChevronDown, Wifi, Cpu, Database } from 'lucide-react';

interface HeaderProps {
  activePage: string;
}

const PAGE_TITLES: Record<string, string> = {
  chat:      'AI Chat Console',
  analytics: 'Performance Analytics',
  auto:      'Automation Hub',
  knowledge: 'Knowledge Base',
  team:      'Team Management',
  security:  'Security Center',
  alerts:    'Alert Manager',
  settings:  'System Settings',
};

export default function Header({ activePage }: HeaderProps) {
  const now = new Date();
  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const dateStr = now.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });

  return (
    <header
      className="glass flex items-center justify-between px-6"
      style={{
        height: 64,
        borderBottom: '1px solid rgba(212,175,55,0.12)',
        flexShrink: 0,
      }}
    >
      {/* Left — title */}
      <div className="flex items-center gap-4">
        <div>
          <h1 className="text-white font-semibold text-base tracking-wide">
            {PAGE_TITLES[activePage] ?? 'Dashboard'}
          </h1>
          <p className="text-slate-500 text-xs">{dateStr} · {timeStr}</p>
        </div>
        <span className="badge badge-cyan hidden sm:inline-flex">PRO</span>
      </div>

      {/* Center — search */}
      <div
        className="hidden md:flex items-center gap-2 chat-input px-4"
        style={{ width: 280, height: 38, fontSize: 13 }}
      >
        <Search size={14} className="text-slate-500" />
        <input
          type="text"
          placeholder="Search anything…"
          className="bg-transparent outline-none flex-1 text-slate-300 placeholder-slate-600 text-sm"
        />
        <kbd className="text-slate-600 text-xs border border-slate-700 rounded px-1 py-0.5">⌘K</kbd>
      </div>

      {/* Right — system indicators */}
      <div className="flex items-center gap-3">
        {/* System health */}
        <div className="hidden lg:flex items-center gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <Cpu size={12} style={{ color: 'var(--cyan)' }} />
            <span>24%</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Database size={12} style={{ color: 'var(--gold)' }} />
            <span>1.2GB</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Wifi size={12} className="text-green-400" />
            <span>Live</span>
          </div>
        </div>

        <div className="w-px h-6 bg-slate-700" />

        {/* Notifications */}
        <button className="btn-icon relative" style={{ width: 36, height: 36 }}>
          <Bell size={15} />
          <span
            className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500"
            style={{ boxShadow: '0 0 6px rgba(239,68,68,.8)' }}
          />
        </button>

        {/* User avatar */}
        <button className="flex items-center gap-2 btn-icon px-3" style={{ height: 36, borderRadius: 10 }}>
          <div
            className="rounded-full flex items-center justify-center text-xs font-bold text-slate-900"
            style={{
              width: 24,
              height: 24,
              background: 'linear-gradient(135deg, var(--gold), var(--gold-light))',
            }}
          >
            A
          </div>
          <span className="text-slate-300 text-xs font-medium hidden sm:inline">Admin</span>
          <ChevronDown size={12} className="text-slate-500" />
        </button>
      </div>
    </header>
  );
}
