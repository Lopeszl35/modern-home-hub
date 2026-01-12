// Service para chat com IA do Meu Gestor Financeiro

import { fetchWithToken, parseResponse, ApiError, USE_MOCK_DATA } from './apiService';

export interface MensagemChat {
  id: string;
  autor: 'usuario' | 'ia';
  texto: string;
  criado_em: string;
}

interface EnviarMensagemResponse {
  resposta: string;
  mensagemId?: string;
  criado_em?: string;
}

// Mock data para desenvolvimento
const mockHistorico: MensagemChat[] = [
  {
    id: '1',
    autor: 'ia',
    texto: 'Olá! Sou o assistente do Meu Gestor Financeiro. Como posso ajudar você hoje?',
    criado_em: new Date().toISOString(),
  },
];

const mockRespostas = [
  'Analisando seus gastos do último mês, percebi que você gastou mais com alimentação fora de casa. Considere preparar mais refeições em casa para economizar.',
  'Baseado no seu histórico, você costuma ter gastos extras na primeira semana do mês. Sugiro reservar esse período para despesas essenciais.',
  'Sua meta de economia está no caminho certo! Você já economizou 60% do valor planejado.',
  'Notei que você tem 3 assinaturas de streaming. Talvez valha revisar se todas estão sendo utilizadas.',
];

export async function getHistoricoChatIA(id_usuario: number): Promise<MensagemChat[]> {
  if (USE_MOCK_DATA) {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...mockHistorico]), 500);
    });
  }

  try {
    const response = await fetchWithToken(`ia/chat/historico/${id_usuario}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new ApiError('Erro ao carregar histórico', response.status);
    }

    return await parseResponse<MensagemChat[]>(response);
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError('Erro de conexão ao carregar histórico', 0);
  }
}

export async function enviarMensagemChatIA(
  id_usuario: number,
  mensagem: string
): Promise<EnviarMensagemResponse> {
  if (USE_MOCK_DATA) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const respostaAleatoria = mockRespostas[Math.floor(Math.random() * mockRespostas.length)];
        resolve({
          resposta: respostaAleatoria,
          mensagemId: Date.now().toString(),
          criado_em: new Date().toISOString(),
        });
      }, 1500);
    });
  }

  try {
    const response = await fetchWithToken(`ia/chat/enviar?id_usuario=${id_usuario}`, {
      method: 'POST',
      body: JSON.stringify({ mensagem }),
    });

    if (!response.ok) {
      throw new ApiError('Erro ao enviar mensagem', response.status);
    }

    return await parseResponse<EnviarMensagemResponse>(response);
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError('Erro de conexão ao enviar mensagem', 0);
  }
}
