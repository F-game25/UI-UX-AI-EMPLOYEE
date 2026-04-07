import { TrendingUp, TrendingDown, Users, MessageSquare, Zap, Award } from 'lucide-react';

const KPI_CARDS = [
  { label: 'Total Interactions', value: '24,891', change: '+18.4%', up: true,  icon: <MessageSquare size={18} />, color: 'var(--cyan)' },
  { label: 'Tasks Automated',   value: '1,284',  change: '+12.1%', up: true,  icon: <Zap size={18} />,           color: 'var(--gold)' },
  { label: 'Active Users',      value: '342',    change: '+5.3%',  up: true,  icon: <Users size={18} />,         color: '#a78bfa' },
  { label: 'Avg Response ms',   value: '84ms',   change: '-6.2%',  up: false, icon: <Award size={18} />,         color: '#34d399' },
];

const BAR_DATA = [
  { day: 'Mon', value: 68 },
  { day: 'Tue', value: 82 },
  { day: 'Wed', value: 57 },
  { day: 'Thu', value: 93 },
  { day: 'Fri', value: 77 },
  { day: 'Sat', value: 44 },
  { day: 'Sun', value: 36 },
];

export default function Analytics() {
  const maxBar = Math.max(...BAR_DATA.map((d) => d.value));

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6">
      {/* KPI row */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {KPI_CARDS.map((k) => (
          <div key={k.label} className="glass-2 rounded-2xl p-5 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center justify-center rounded-xl p-2.5"
                style={{ background: `${k.color}1a`, color: k.color }}>
                {k.icon}
              </div>
              <div className={`flex items-center gap-1 text-xs font-semibold ${k.up ? 'text-green-400' : 'text-red-400'}`}>
                {k.up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                {k.change}
              </div>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{k.value}</p>
              <p className="text-slate-500 text-xs mt-0.5">{k.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Bar chart */}
        <div className="glass-2 rounded-2xl p-5">
          <p className="text-white font-semibold text-sm mb-4">Weekly Activity</p>
          <div className="flex items-end gap-3 h-40">
            {BAR_DATA.map((d) => (
              <div key={d.day} className="flex-1 flex flex-col items-center gap-1.5">
                <div
                  className="w-full rounded-t-md transition-all duration-500"
                  style={{
                    height: `${(d.value / maxBar) * 100}%`,
                    background: `linear-gradient(180deg, var(--cyan) 0%, var(--purple) 100%)`,
                    opacity: 0.8,
                    minHeight: 4,
                  }}
                />
                <span className="text-slate-500 text-xs">{d.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Donut-style breakdown */}
        <div className="glass-2 rounded-2xl p-5">
          <p className="text-white font-semibold text-sm mb-4">Task Distribution</p>
          <div className="space-y-3">
            {[
              { label: 'Content Generation', pct: 42, color: 'var(--cyan)' },
              { label: 'Data Analysis',       pct: 28, color: 'var(--gold)' },
              { label: 'Scheduling',          pct: 18, color: '#a78bfa' },
              { label: 'Customer Support',    pct: 12, color: '#34d399' },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-400">{item.label}</span>
                  <span className="font-semibold" style={{ color: item.color }}>{item.pct}%</span>
                </div>
                <div className="h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${item.pct}%`, background: item.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent activity */}
      <div className="glass-2 rounded-2xl p-5">
        <p className="text-white font-semibold text-sm mb-4">Recent Activity</p>
        <div className="space-y-3">
          {[
            { action: 'Generated Q2 marketing report',  time: '2 min ago',  type: 'content',  color: 'var(--cyan)' },
            { action: 'Scheduled 4 client meetings',    time: '15 min ago', type: 'schedule', color: '#a78bfa' },
            { action: 'Analyzed 312 customer reviews',  time: '1 hr ago',   type: 'analysis', color: 'var(--gold)' },
            { action: 'Sent weekly digest to 48 users', time: '3 hr ago',   type: 'comms',    color: '#34d399' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 py-2 border-b last:border-0" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
              <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: item.color }} />
              <span className="text-slate-300 text-sm flex-1">{item.action}</span>
              <span className="text-slate-600 text-xs flex-shrink-0">{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
