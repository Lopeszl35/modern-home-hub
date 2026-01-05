import { cn } from '@/lib/utils';
import { Bot, User } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface ChatMessageBubbleProps {
  autor: 'usuario' | 'ia';
  texto: string;
  criado_em: string;
  showTimestamp?: boolean;
}

export function ChatMessageBubble({ 
  autor, 
  texto, 
  criado_em, 
  showTimestamp = true 
}: ChatMessageBubbleProps) {
  const isUser = autor === 'usuario';
  
  const formatTime = (dateString: string) => {
    try {
      return format(new Date(dateString), 'HH:mm', { locale: ptBR });
    } catch {
      return '';
    }
  };

  return (
    <div
      className={cn(
        'flex gap-2 mb-3 animate-fade-in',
        isUser ? 'flex-row-reverse' : 'flex-row'
      )}
    >
      {/* Avatar */}
      <div
        className={cn(
          'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center',
          isUser 
            ? 'bg-primary text-primary-foreground' 
            : 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white'
        )}
      >
        {isUser ? (
          <User className="w-4 h-4" />
        ) : (
          <Bot className="w-4 h-4" />
        )}
      </div>

      {/* Message Bubble */}
      <div
        className={cn(
          'max-w-[80%] md:max-w-[70%] rounded-2xl px-4 py-3 shadow-sm',
          isUser
            ? 'bg-primary text-primary-foreground rounded-tr-md'
            : 'bg-card border border-border rounded-tl-md'
        )}
      >
        <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
          {texto}
        </p>
        
        {showTimestamp && criado_em && (
          <p
            className={cn(
              'text-[10px] mt-1.5',
              isUser ? 'text-primary-foreground/70' : 'text-muted-foreground'
            )}
          >
            {formatTime(criado_em)}
          </p>
        )}
      </div>
    </div>
  );
}
