// Tipos para o módulo de Categorias/Gastos Variáveis

export interface Categoria {
  id_categoria: number;
  id_usuario: number;
  nome: string;
  limite: number | null;
  ativo: boolean;
  totalGastoCategoriaMes?: number;
  percentualGastoCategoriaMes?: number;
  data_criacao?: string;
  inativado_em?: string;
}

export interface CategoriaCreate {
  nome: string;
  limite: number;
}

export interface CategoriaUpdate {
  nome: string;
  limite: number;
}

export interface ConfiguracaoGastoMes {
  id_usuario: number;
  limite_gasto_mes: number;
  gasto_atual_mes: number;
  mes: number;
  ano: number;
}

export interface GastoVariavel {
  id_gasto?: number;
  id_categoria: number;
  id_usuario: number;
  data_gasto: string;
  valor: number;
  descricao: string;
  forma_pagamento: 'PIX' | 'DINHEIRO' | 'DEBITO' | 'CREDITO';
  id_cartao?: number | null;
}

export type StatusCategoria = 'ok' | 'warn' | 'danger';

export interface CategoriaComStatus extends Categoria {
  status: StatusCategoria;
  percentualCalculado: number;
}
