export interface User {
  id_usuario: number;
  nome: string;
  email: string;
  perfil_financeiro: 'conservador' | 'moderado' | 'arrojado';
  salario_mensal: number;
  saldo_inicial: number;
  saldo_atual: number;
  created_at?: string;
  updated_at?: string;
}

export interface UserCadastro {
  nome: string;
  email: string;
  senha_hash: string;
  perfil_financeiro: 'conservador' | 'moderado' | 'arrojado';
  salario_mensal: number;
  saldo_inicial: number;
  saldo_atual: number;
}

export interface LoginResponse {
  user: User;
  token?: string;
  message?: string;
}

export interface RegisterResponse {
  message: string;
  user?: User;
}
