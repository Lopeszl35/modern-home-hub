import { Bot, Lightbulb, TrendingUp, PiggyBank, Target } from 'lucide-react';

interface ChatEmptyStateProps {
  onSuggestionClick?: (suggestion: string) => void;
}

const suggestions = [
  {
    icon: TrendingUp,
    text: 'Onde posso economizar este mês?',
  },
  {
    icon: PiggyBank,
    text: 'Como estão meus gastos com cartão de crédito?',
  },
  {
    icon: Target,
    text: 'Quanto já economizei nas minhas metas?',
  },
  {
    icon: Lightbulb,
    text: 'Me dê dicas para organizar minhas finanças',
  },
];

export function ChatEmptyState({ onSuggestionClick }: ChatEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full px-4 py-8">
      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mb-4 shadow-lg">
        <Bot className="w-8 h-8 text-white" />
      </div>
      
      <h3 className="text-lg font-semibold text-foreground mb-2">
        Assistente IA
      </h3>
      
      <p className="text-sm text-muted-foreground text-center mb-6 max-w-sm">
        Pergunte sobre seus gastos, metas e hábitos financeiros. Estou aqui para ajudar!
      </p>

      <div className="w-full max-w-sm space-y-2">
        <p className="text-xs text-muted-foreground text-center mb-3">
          Comece com uma dessas sugestões:
        </p>
        
        {suggestions.map((suggestion, index) => {
          const Icon = suggestion.icon;
          return (
            <button
              key={index}
              onClick={() => onSuggestionClick?.(suggestion.text)}
              className="w-full flex items-center gap-3 p-3 rounded-xl bg-card border border-border hover:border-primary/50 hover:bg-accent/50 transition-all text-left group"
            >
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Icon className="w-4 h-4 text-primary" />
              </div>
              <span className="text-sm text-foreground">{suggestion.text}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
