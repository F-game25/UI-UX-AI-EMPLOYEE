import { Construction } from 'lucide-react';

interface PlaceholderPageProps {
  title: string;
  description: string;
}

export default function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-4 p-8">
      <div
        className="flex items-center justify-center rounded-2xl p-5"
        style={{ background: 'rgba(0,229,255,0.08)', border: '1px solid rgba(0,229,255,0.15)' }}
      >
        <Construction size={40} style={{ color: 'var(--cyan)' }} />
      </div>
      <h2 className="text-white text-xl font-semibold">{title}</h2>
      <p className="text-slate-500 text-sm text-center max-w-xs">{description}</p>
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full" style={{ background: 'var(--gold)' }} />
        <span className="text-slate-600 text-xs uppercase tracking-widest font-semibold">Coming Soon</span>
        <div className="w-2 h-2 rounded-full" style={{ background: 'var(--gold)' }} />
      </div>
    </div>
  );
}
