// API Service base para todas as requisições

import { API_URL } from '@/constants/ApiUrl';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || API_URL;
const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA === 'true';

interface FetchOptions extends RequestInit {
  timeout?: number;
}

class ApiError extends Error {
  status: number;
  
  constructor(message: string, status: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

export async function fetchWithToken(
  endpoint: string,
  options: FetchOptions = {}
): Promise<Response> {
  const { timeout = 30000, ...fetchOptions } = options;
  
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  try {
    // TODO: Adicionar token de autenticação quando disponível
    const token = localStorage.getItem('auth_token');
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...fetchOptions.headers,
    };
    
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
      ...fetchOptions,
      headers,
      signal: controller.signal,
    });
    
    return response;
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function parseResponse<T>(response: Response): Promise<T> {
  const text = await response.text();
  
  if (!text) {
    throw new ApiError('Resposta vazia do servidor', response.status);
  }
  
  try {
    return JSON.parse(text) as T;
  } catch {
    throw new ApiError('Erro ao processar resposta do servidor', response.status);
  }
}

export { ApiError, USE_MOCK_DATA };
