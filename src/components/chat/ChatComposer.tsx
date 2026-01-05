import { useState, useRef, KeyboardEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatComposerProps {
  onSend: (mensagem: string) => void;
  disabled?: boolean;
  sending?: boolean;
  placeholder?: string;
}

export function ChatComposer({
  onSend,
  disabled = false,
  sending = false,
  placeholder = 'Digite sua mensagem...',
}: ChatComposerProps) {
  const [mensagem, setMensagem] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    if (mensagem.trim() && !disabled && !sending) {
      onSend(mensagem.trim());
      setMensagem('');
      textareaRef.current?.focus();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const isDisabled = disabled || sending || !mensagem.trim();

  return (
    <div className="border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 p-3 md:p-4">
      <div className="flex gap-2 items-end max-w-4xl mx-auto">
        <Textarea
          ref={textareaRef}
          value={mensagem}
          onChange={(e) => setMensagem(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled || sending}
          className={cn(
            'min-h-[44px] max-h-[120px] resize-none flex-1',
            'rounded-xl border-border/50 bg-card',
            'focus:border-primary focus:ring-primary/20',
            'text-sm md:text-base'
          )}
          rows={1}
        />
        
        <Button
          onClick={handleSend}
          disabled={isDisabled}
          size="icon"
          className={cn(
            'h-11 w-11 rounded-xl shrink-0 transition-all',
            !isDisabled && 'gradient-primary shadow-glow'
          )}
        >
          {sending ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <Send className="h-5 w-5" />
          )}
        </Button>
      </div>
      
      <p className="text-[10px] text-muted-foreground text-center mt-2 md:hidden">
        Pressione Enter para enviar
      </p>
    </div>
  );
}
