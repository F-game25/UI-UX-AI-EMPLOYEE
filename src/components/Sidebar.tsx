import {
  Bot,
  MessageSquare,
  BarChart2,
  Settings,
  Zap,
  Shield,
  Bell,
  BookOpen,
  Users,
  TrendingUp,
} from 'lucide-react';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  badge?: string;
  onClick: () => void;
}

function NavItem({ icon, label, active, badge, onClick }: NavItemProps) {
  return (
    <div
      className={`nav-item flex items-center gap-3 px-4 py-3 rounded-r-xl text-sm font-medium ${
        active ? 'active text-white' : 'text-slate-400 hover:text-white'
      }`}
      onClick={onClick}
    >
      <span className={active ? 'text-[var(--cyan)]' : ''}>{icon}</span>
      <span className="flex-1">{label}</span>
      {badge && <span className="badge badge-gold">{badge}</span>}
    </div>
  );
}

interface SidebarProps {
  activePage: string;
  onNavigate: (page: string) => void;
}

const stats = [
  { label: 'Tasks Done', value: '1,284', trend: '+12%', color: 'var(--gold)' },
  { label: 'Accuracy',   value: '99.2%', trend: '+0.4%', color: 'var(--cyan)' },
  { label: 'Uptime',     value: '99.9%', trend: 'stable', color: '#22c55e' },
];

export default function Sidebar({ activePage, onNavigate }: SidebarProps) {
  return (
    <aside
      className="glass flex flex-col h-full"
      style={{ width: 260, borderRight: '1px solid rgba(212,175,55,0.12)', flexShrink: 0 }}
    >
      {/* Logo */}
      <div className="flex flex-col items-center gap-3 px-6 py-6 border-b" style={{ borderColor: 'rgba(212,175,55,0.12)' }}>
        <div className="avatar-ring" style={{ width: 64, height: 64 }}>
          <div className="avatar-inner" style={{ width: 60, height: 60 }}>
            <Bot size={30} style={{ color: 'var(--cyan)' }} />
          </div>
        </div>
        <div className="text-center">
          <p className="text-gold-shimmer font-bold text-base tracking-widest uppercase">ARIA</p>
          <p className="text-slate-500 text-xs mt-0.5 tracking-wider">AI Employee v3.0</p>
        </div>
        {/* Online status */}
        <div className="flex items-center gap-2">
          <span
            className="pulse-ring"
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: '#22c55e',
              display: 'inline-block',
            }}
          />
          <span className="text-xs text-green-400 font-medium tracking-widest uppercase">Online</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 pr-2">
        <p className="text-slate-600 text-xs font-semibold uppercase tracking-widest px-4 mb-2">Workspace</p>
        <NavItem icon={<MessageSquare size={16} />} label="Chat"       active={activePage === 'chat'}      onClick={() => onNavigate('chat')} />
        <NavItem icon={<BarChart2 size={16} />}    label="Analytics"  active={activePage === 'analytics'} onClick={() => onNavigate('analytics')} badge="NEW" />
        <NavItem icon={<Zap size={16} />}          label="Automations" active={activePage === 'auto'}     onClick={() => onNavigate('auto')} badge="7" />
        <NavItem icon={<BookOpen size={16} />}     label="Knowledge"  active={activePage === 'knowledge'} onClick={() => onNavigate('knowledge')} />
        <NavItem icon={<Users size={16} />}        label="Team"       active={activePage === 'team'}      onClick={() => onNavigate('team')} />

        <p className="text-slate-600 text-xs font-semibold uppercase tracking-widest px-4 mt-4 mb-2">System</p>
        <NavItem icon={<Shield size={16} />}   label="Security"  active={activePage === 'security'}  onClick={() => onNavigate('security')} />
        <NavItem icon={<Bell size={16} />}     label="Alerts"    active={activePage === 'alerts'}    onClick={() => onNavigate('alerts')}   badge="3" />
        <NavItem icon={<Settings size={16} />} label="Settings"  active={activePage === 'settings'}  onClick={() => onNavigate('settings')} />
      </nav>

      {/* Stats */}
      <div className="p-4 border-t space-y-2" style={{ borderColor: 'rgba(212,175,55,0.10)' }}>
        <p className="text-slate-600 text-xs font-semibold uppercase tracking-widest mb-3 flex items-center gap-1">
          <TrendingUp size={11} /> Live Stats
        </p>
        {stats.map((s) => (
          <div key={s.label} className="stat-card flex items-center justify-between">
            <span className="text-slate-400 text-xs">{s.label}</span>
            <div className="text-right">
              <span className="text-sm font-bold" style={{ color: s.color }}>{s.value}</span>
              <span className="text-slate-600 text-xs ml-1">{s.trend}</span>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
