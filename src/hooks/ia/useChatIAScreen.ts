import { useState, useEffect, useCallback, useRef } from 'react';
import { useUser } from '@/contexts/UserContext';
import { 
  getHistoricoChatIA, 
  enviarMensagemChatIA, 
  MensagemChat 
} from '@/services/iaChatService';

interface UseChatIAScreenReturn {
  mensagens: MensagemChat[];
  loading: boolean;
  sending: boolean;
  error: string | null;
  userError: boolean;
  enviarMensagem: (texto: string) => Promise<void>;
  reload: () => Promise<void>;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

export function useChatIAScreen(): UseChatIAScreenReturn {
  const { user, loading: userLoading } = useUser();
  const [mensagens, setMensagens] = useState<MensagemChat[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }, []);

  const carregarHistorico = useCallback(async () => {
    if (!user?.id_usuario) return;
    
    try {
      setLoading(true);
      setError(null);
      const historico = await getHistoricoChatIA(user.id_usuario);
      setMensagens(historico);
      scrollToBottom();
    } catch (err) {
      setError('Erro ao carregar histórico. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }, [user?.id_usuario, scrollToBottom]);

  const enviarMensagem = useCallback(async (texto: string) => {
    if (!user?.id_usuario || !texto.trim() || sending) return;

    const mensagemUsuario: MensagemChat = {
      id: `temp-${Date.now()}`,
      autor: 'usuario',
      texto: texto.trim(),
      criado_em: new Date().toISOString(),
    };

    // Adicionar mensagem do usuário otimisticamente
    setMensagens(prev => [...prev, mensagemUsuario]);
    setSending(true);
    scrollToBottom();

    try {
      const response = await enviarMensagemChatIA(user.id_usuario, texto.trim());
      
      const mensagemIA: MensagemChat = {
        id: response.mensagemId || `ia-${Date.now()}`,
        autor: 'ia',
        texto: response.resposta,
        criado_em: response.criado_em || new Date().toISOString(),
      };

      setMensagens(prev => [...prev, mensagemIA]);
      scrollToBottom();
    } catch (err) {
      // Adicionar mensagem de erro da IA
      const mensagemErro: MensagemChat = {
        id: `erro-${Date.now()}`,
        autor: 'ia',
        texto: 'Não consegui responder agora. Tente novamente.',
        criado_em: new Date().toISOString(),
      };
      setMensagens(prev => [...prev, mensagemErro]);
      scrollToBottom();
    } finally {
      setSending(false);
    }
  }, [user?.id_usuario, sending, scrollToBottom]);

  const reload = useCallback(async () => {
    await carregarHistorico();
  }, [carregarHistorico]);

  useEffect(() => {
    if (!userLoading && user?.id_usuario) {
      carregarHistorico();
    } else if (!userLoading && !user) {
      setLoading(false);
    }
  }, [userLoading, user?.id_usuario, carregarHistorico]);

  return {
    mensagens,
    loading: loading || userLoading,
    sending,
    error,
    userError: !userLoading && !user,
    enviarMensagem,
    reload,
    messagesEndRef,
  };
}
