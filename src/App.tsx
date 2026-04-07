import { useState, useCallback } from 'react';
import './index.css';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import ChatPanel, { type Message } from './components/ChatPanel';
import ChatInput from './components/ChatInput';
import Analytics from './components/Analytics';
import PlaceholderPage from './components/PlaceholderPage';

// ── Simulated AI responses ───────────────────────────────────────────────
const AI_RESPONSES: string[] = [
  "I've analyzed your request and here's a comprehensive breakdown. The data suggests a 23% improvement opportunity in your current workflow — I can automate three key steps immediately.",
  "Absolutely! I've cross-referenced your calendar, project board, and team availability. The optimal meeting slot is Tuesday at 2 PM. Shall I send the invites?",
  "I've completed the analysis of 1,284 customer interactions this week. The top themes are response time (42%), product clarity (31%), and pricing transparency (27%). Full report is ready.",
  "Great question. Based on the latest industry benchmarks and your historical data, I recommend reallocating 15% of your marketing budget to short-form video content for a projected 34% reach increase.",
  "Task completed. I've drafted the executive summary, highlighted three key risks, and prepared a slide deck with 12 visualizations. Ready for your review.",
  "I'm monitoring all systems in real-time. Everything is running at 99.9% uptime. No anomalies detected. The last security scan completed 4 minutes ago — all clear.",
];

const INITIAL_MESSAGES: Message[] = [
  {
    id: '0',
    role: 'ai',
    text: "Good day! I'm ARIA — your Advanced Reasoning Intelligence Assistant. I'm fully operational and ready to amplify your productivity. How can I elevate your workflow today?",
    timestamp: new Date(Date.now() - 90_000),
  },
  {
    id: '1',
    role: 'user',
    text: "Show me the performance highlights from this week.",
    timestamp: new Date(Date.now() - 60_000),
  },
  {
    id: '2',
    role: 'ai',
    text: "This week's highlights: ✦ 1,284 tasks automated (+12%) · ✦ 99.2% accuracy maintained · ✦ 342 active users (+5.3%) · ✦ Average response time improved to 84ms. Overall performance is exceptional — you're in the top 3% of enterprise deployments.",
    timestamp: new Date(Date.now() - 45_000),
  },
];

// ── Page-level content renderer ──────────────────────────────────────────
function PageContent({ page, messages, isTyping, onSend }: {
  page: string;
  messages: Message[];
  isTyping: boolean;
  onSend: (text: string) => void;
}) {
  if (page === 'chat') {
    return (
      <div className="flex flex-col flex-1 overflow-hidden">
        <ChatPanel messages={messages} isTyping={isTyping} />
        <ChatInput onSend={onSend} disabled={isTyping} />
      </div>
    );
  }
  if (page === 'analytics') return <Analytics />;

  const PLACEHOLDER_COPY: Record<string, [string, string]> = {
    auto:      ['Automation Hub',    'Build and manage intelligent automation workflows that run 24/7 without human intervention.'],
    knowledge: ['Knowledge Base',    'Upload documents, connect data sources, and let ARIA learn from your organization\'s knowledge.'],
    team:      ['Team Management',   'Invite colleagues, assign roles, and monitor team-level AI usage and productivity metrics.'],
    security:  ['Security Center',   'Advanced threat monitoring, audit logs, RBAC controls, and compliance reporting in one place.'],
    alerts:    ['Alert Manager',     'Configure smart alerts for anomalies, milestones, and custom triggers across all integrations.'],
    settings:  ['System Settings',   'Personalise ARIA\'s behaviour, connect integrations, and manage your subscription.'],
  };

  const [title, description] = PLACEHOLDER_COPY[page] ?? ['Page', 'This section is being built.'];
  return <PlaceholderPage title={title} description={description} />;
}

// ── Root app ─────────────────────────────────────────────────────────────
export default function App() {
  const [activePage, setActivePage] = useState('chat');
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = useCallback((text: string) => {
    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    // Simulate AI thinking delay (800ms – 2200ms)
    const delay = 800 + Math.random() * 1400;
    setTimeout(() => {
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        text: AI_RESPONSES[Math.floor(Math.random() * AI_RESPONSES.length)],
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, delay);
  }, []);

  return (
    <>
      {/* Animated background layers */}
      <div className="mesh-bg" />
      <div className="grid-overlay" />

      {/* App shell */}
      <div
        className="relative flex h-full"
        style={{ zIndex: 1 }}
      >
        <Sidebar activePage={activePage} onNavigate={setActivePage} />

        {/* Main area */}
        <div className="flex flex-col flex-1 overflow-hidden">
          <Header activePage={activePage} />
          <PageContent
            page={activePage}
            messages={messages}
            isTyping={isTyping}
            onSend={handleSend}
          />
        </div>
      </div>
    </>
  );
}
