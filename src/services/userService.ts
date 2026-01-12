import { API_URL } from '@/constants/ApiUrl';
import { User, UserCadastro, LoginResponse, RegisterResponse } from '@/types/user';

export async function loginUser(email: string, senha: string): Promise<LoginResponse> {
  const response = await fetch(`${API_URL}/loginUser`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, senha }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Erro ao fazer login');
  }

  const data = await response.json();
  return data;
}

export async function registerUser(user: UserCadastro): Promise<RegisterResponse> {
  const response = await fetch(`${API_URL}/createUser`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Erro ao cadastrar usuário');
  }

  const data = await response.json();
  return data;
}

export async function getUserData(userId: number): Promise<User> {
  const response = await fetch(`${API_URL}/userData/${userId}`);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Erro ao buscar dados do usuário');
  }

  const data = await response.json();
  return data;
}

export async function updateUserSaldo(userId: number, saldo: number): Promise<void> {
  const response = await fetch(`${API_URL}/userSaldo`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id_usuario: userId, saldo_atual: saldo }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Erro ao atualizar saldo');
  }
}
