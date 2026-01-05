import { ArrowLeft, RefreshCw, AlertCircle, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChatMessageBubble } from '@/components/chat/ChatMessageBubble';
import { ChatComposer } from '@/components/chat/ChatComposer';
import { ChatEmptyState } from '@/components/chat/ChatEmptyState';
import { useChatIAScreen } from '@/hooks/ia/useChatIAScreen';
import { cn } from '@/lib/utils';

export default function AssistenteIA() {
  const navigate = useNavigate();
  const {
    mensagens,
    loading,
    sending,
    error,
    userError,
    enviarMensagem,
    reload,
    messagesEndRef,
  } = useChatIAScreen();

  // Tela de erro - usuário não autenticado
  if (userError) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header onBack={() => navigate('/')} />
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <AlertCircle className="w-12 h-12 text-destructive mb-4" />
          <h2 className="text-lg font-semibold text-foreground mb-2">
            Usuário não autenticado
          </h2>
          <p className="text-sm text-muted-foreground text-center mb-4">
            Faça login para acessar o assistente IA.
          </p>
          <Button onClick={() => navigate('/')}>
            Voltar ao início
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <Header 
        onBack={() => navigate('/')} 
        onReload={reload}
        loading={loading}
      />

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center h-full p-4">
            <AlertCircle className="w-10 h-10 text-destructive mb-3" />
            <p className="text-sm text-muted-foreground text-center mb-4">
              {error}
            </p>
            <Button variant="outline" onClick={reload}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Tentar novamente
            </Button>
          </div>
        ) : mensagens.length === 0 ? (
          <ChatEmptyState onSuggestionClick={enviarMensagem} />
        ) : (
          <div className="p-4 max-w-4xl mx-auto">
            {mensagens.map((msg) => (
              <ChatMessageBubble
                key={msg.id}
                autor={msg.autor}
                texto={msg.texto}
                criado_em={msg.criado_em}
              />
            ))}
            
            {/* Indicador de digitação */}
            {sending && (
              <div className="flex gap-2 mb-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
                <div className="bg-card border border-border rounded-2xl rounded-tl-md px-4 py-3">
                  <p className="text-sm text-muted-foreground">
                    Pensando...
                  </p>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Composer */}
      <ChatComposer
        onSend={enviarMensagem}
        disabled={loading || !!error}
        sending={sending}
        placeholder="Pergunte sobre suas finanças..."
      />
    </div>
  );
}

// Header Component
function Header({ 
  onBack, 
  onReload,
  loading 
}: { 
  onBack: () => void;
  onReload?: () => void;
  loading?: boolean;
}) {
  return (
    <header className="sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="flex items-center justify-between p-4 max-w-4xl mx-auto">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="shrink-0"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          
          <div>
            <h1 className="text-lg font-semibold text-foreground">
              Assistente IA
            </h1>
            <p className="text-xs text-muted-foreground">
              Pergunte sobre seus gastos, metas e hábitos
            </p>
          </div>
        </div>

        {onReload && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onReload}
            disabled={loading}
            className={cn(loading && 'animate-spin')}
          >
            <RefreshCw className="w-4 h-4" />
          </Button>
        )}
      </div>
    </header>
  );
}
