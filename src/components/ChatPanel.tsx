import { useRef, useEffect } from 'react';
import { Bot, User, Copy, ThumbsUp, ThumbsDown } from 'lucide-react';

export interface Message {
  id: string;
  role: 'ai' | 'user';
  text: string;
  timestamp: Date;
  status?: 'sending' | 'sent' | 'delivered';
}

interface MessageBubbleProps {
  msg: Message;
}

function MessageBubble({ msg }: MessageBubbleProps) {
  const isAI = msg.role === 'ai';
  return (
    <div className={`flex gap-3 msg-enter ${isAI ? '' : 'flex-row-reverse'}`}>
      {/* Avatar */}
      <div
        className="flex-shrink-0 flex items-center justify-center rounded-full"
        style={{
          width: 34,
          height: 34,
          background: isAI
            ? 'linear-gradient(135deg, rgba(0,229,255,0.15), rgba(124,58,237,0.15))'
            : 'linear-gradient(135deg, rgba(212,175,55,0.2), rgba(212,175,55,0.1))',
          border: `1px solid ${isAI ? 'rgba(0,229,255,0.3)' : 'rgba(212,175,55,0.3)'}`,
        }}
      >
        {isAI
          ? <Bot size={16} style={{ color: 'var(--cyan)' }} />
          : <User size={16} style={{ color: 'var(--gold)' }} />
        }
      </div>

      {/* Bubble */}
      <div className="flex flex-col gap-1 max-w-[78%]">
        <div className={`px-4 py-3 text-sm leading-relaxed ${isAI ? 'msg-ai' : 'msg-user'}`}>
          <p className="text-slate-200">{msg.text}</p>
        </div>

        {/* Meta row */}
        <div className={`flex items-center gap-3 px-1 ${isAI ? '' : 'flex-row-reverse'}`}>
          <span className="text-slate-600 text-xs">
            {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
          {isAI && (
            <div className="flex items-center gap-1.5">
              <button className="btn-icon p-1" title="Copy" style={{ borderRadius: 6 }}>
                <Copy size={11} />
              </button>
              <button className="btn-icon p-1" title="Like" style={{ borderRadius: 6 }}>
                <ThumbsUp size={11} />
              </button>
              <button className="btn-icon p-1" title="Dislike" style={{ borderRadius: 6 }}>
                <ThumbsDown size={11} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex gap-3 msg-enter">
      <div
        className="flex-shrink-0 flex items-center justify-center rounded-full"
        style={{
          width: 34, height: 34,
          background: 'linear-gradient(135deg, rgba(0,229,255,0.15), rgba(124,58,237,0.15))',
          border: '1px solid rgba(0,229,255,0.3)',
        }}
      >
        <Bot size={16} style={{ color: 'var(--cyan)' }} />
      </div>
      <div className="msg-ai px-4 py-3 flex items-center gap-1.5">
        <div className="typing-dot" />
        <div className="typing-dot" />
        <div className="typing-dot" />
      </div>
    </div>
  );
}

interface ChatPanelProps {
  messages: Message[];
  isTyping: boolean;
}

export default function ChatPanel({ messages, isTyping }: ChatPanelProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <div className="flex-1 overflow-y-auto px-6 py-6 space-y-5">
      {messages.map((msg) => (
        <MessageBubble key={msg.id} msg={msg} />
      ))}
      {isTyping && <TypingIndicator />}
      <div ref={bottomRef} />
    </div>
  );
}
