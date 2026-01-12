import { API_URL } from '@/constants/ApiUrl';
import { ReceitaPF, ReceitaPJ, ResumoReceitas } from '@/types/receita';

// Mock data para desenvolvimento
const mockReceitasPF: ReceitaPF[] = [
  {
    id: 1,
    id_usuario: 1,
    tipo: 'salario',
    descricao: 'Salário Mensal',
    valor: 8500,
    data: '2024-01-05',
    recorrente: true,
  },
  {
    id: 2,
    id_usuario: 1,
    tipo: 'pix',
    descricao: 'PIX recebido - Freelance',
    valor: 1200,
    data: '2024-01-15',
    recorrente: false,
  },
  {
    id: 3,
    id_usuario: 1,
    tipo: 'venda',
    descricao: 'Venda de equipamento usado',
    valor: 800,
    data: '2024-01-20',
    recorrente: false,
  },
];

const mockReceitasPJ: ReceitaPJ[] = [
  {
    id: 1,
    id_usuario: 1,
    cnpj: '12.345.678/0001-90',
    razao_social: 'Tech Solutions LTDA',
    tipo: 'servico',
    descricao: 'Consultoria de TI - Janeiro',
    valor_bruto: 15000,
    impostos: 2250,
    valor_liquido: 12750,
    data_emissao: '2024-01-10',
    data_recebimento: '2024-01-25',
    numero_nf: 'NF-2024-001',
    cliente: 'Empresa ABC',
    status: 'recebido',
  },
  {
    id: 2,
    id_usuario: 1,
    cnpj: '12.345.678/0001-90',
    razao_social: 'Tech Solutions LTDA',
    tipo: 'consultoria',
    descricao: 'Projeto de Migração Cloud',
    valor_bruto: 25000,
    impostos: 3750,
    valor_liquido: 21250,
    data_emissao: '2024-01-20',
    numero_nf: 'NF-2024-002',
    cliente: 'Startup XYZ',
    status: 'pendente',
  },
];

export async function getReceitasPF(idUsuario: number): Promise<ReceitaPF[]> {
  // TODO: Conectar ao backend quando disponível
  // const response = await fetch(`${API_URL}/receitas/pf/${idUsuario}`);
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockReceitasPF), 500);
  });
}

export async function getReceitasPJ(idUsuario: number): Promise<ReceitaPJ[]> {
  // TODO: Conectar ao backend quando disponível
  // const response = await fetch(`${API_URL}/receitas/pj/${idUsuario}`);
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockReceitasPJ), 500);
  });
}

export async function createReceitaPF(receita: Omit<ReceitaPF, 'id' | 'created_at'>): Promise<ReceitaPF> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ ...receita, id: Date.now() });
    }, 500);
  });
}

export async function createReceitaPJ(receita: Omit<ReceitaPJ, 'id' | 'created_at'>): Promise<ReceitaPJ> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ ...receita, id: Date.now() });
    }, 500);
  });
}

export async function getResumoReceitas(idUsuario: number): Promise<ResumoReceitas> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        total_mes: 47500,
        total_recorrente: 8500,
        total_avulso: 39000,
        comparativo_mes_anterior: 12.5,
      });
    }, 500);
  });
}
