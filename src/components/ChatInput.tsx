import { useState, type KeyboardEvent } from 'react';
import { Send, Mic, Paperclip, Smile, Command } from 'lucide-react';

interface ChatInputProps {
  onSend: (text: string) => void;
  disabled?: boolean;
}

const SUGGESTIONS = [
  'Summarize last week\'s tasks',
  'Generate a sales report',
  'Schedule a meeting',
  'Analyze customer feedback',
];

export default function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [value, setValue] = useState('');

  const handleSend = () => {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue('');
  };

  const handleKey = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div
      className="glass px-4 py-4"
      style={{ borderTop: '1px solid rgba(212,175,55,0.10)', flexShrink: 0 }}
    >
      {/* Quick suggestion chips */}
      <div className="flex items-center gap-2 mb-3 overflow-x-auto pb-1 no-scrollbar">
        <Command size={12} className="text-slate-600 flex-shrink-0" />
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            onClick={() => setValue(s)}
            className="flex-shrink-0 text-xs px-3 py-1.5 rounded-full transition-all"
            style={{
              background: 'rgba(0,229,255,0.06)',
              border: '1px solid rgba(0,229,255,0.14)',
              color: '#94a3b8',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = 'rgba(0,229,255,0.12)';
              (e.currentTarget as HTMLButtonElement).style.color = 'var(--cyan)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = 'rgba(0,229,255,0.06)';
              (e.currentTarget as HTMLButtonElement).style.color = '#94a3b8';
            }}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Input row */}
      <div className="flex items-end gap-3">
        {/* Icon buttons */}
        <button className="btn-icon flex-shrink-0" style={{ width: 38, height: 38 }} title="Attach file">
          <Paperclip size={15} />
        </button>

        {/* Textarea */}
        <div className="flex-1 relative">
          <textarea
            className="chat-input w-full resize-none px-4 py-3 text-sm leading-relaxed"
            rows={1}
            style={{ minHeight: 44, maxHeight: 140 }}
            placeholder="Ask ARIA anything… (Enter to send, Shift+Enter for newline)"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              // Auto-grow
              e.target.style.height = 'auto';
              e.target.style.height = Math.min(e.target.scrollHeight, 140) + 'px';
            }}
            onKeyDown={handleKey}
            disabled={disabled}
          />
          <button className="btn-icon absolute right-2 bottom-2" style={{ width: 28, height: 28 }} title="Emoji">
            <Smile size={14} />
          </button>
        </div>

        {/* Voice */}
        <button className="btn-icon flex-shrink-0" style={{ width: 38, height: 38 }} title="Voice input">
          <Mic size={15} />
        </button>

        {/* Send */}
        <button
          className="btn-send flex-shrink-0"
          style={{ width: 44, height: 44 }}
          onClick={handleSend}
          disabled={disabled || !value.trim()}
          title="Send message"
        >
          <Send size={17} className="text-white" style={{ marginLeft: 2 }} />
        </button>
      </div>

      {/* Footer hint */}
      <p className="text-slate-700 text-xs mt-2 text-center tracking-wide">
        ARIA may produce inaccurate information · Always verify critical outputs
      </p>
    </div>
  );
}
