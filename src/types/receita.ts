export type TipoPessoa = 'fisica' | 'juridica';

export interface ReceitaPF {
  id?: number;
  id_usuario: number;
  tipo: 'salario' | 'pix' | 'venda' | 'freelance' | 'outros';
  descricao: string;
  valor: number;
  data: string;
  recorrente: boolean;
  created_at?: string;
}

export interface ReceitaPJ {
  id?: number;
  id_usuario: number;
  cnpj?: string;
  razao_social?: string;
  tipo: 'servico' | 'produto' | 'consultoria' | 'licenciamento' | 'outros';
  descricao: string;
  valor_bruto: number;
  impostos: number;
  valor_liquido: number;
  data_emissao: string;
  data_recebimento?: string;
  numero_nf?: string;
  cliente?: string;
  status: 'pendente' | 'recebido' | 'atrasado';
  created_at?: string;
}

export interface ResumoReceitas {
  total_mes: number;
  total_recorrente: number;
  total_avulso: number;
  comparativo_mes_anterior: number;
}
