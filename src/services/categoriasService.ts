// Service para gerenciamento de Categorias de Gastos Variáveis
import { fetchWithToken, parseResponse, USE_MOCK_DATA } from './apiService';
import type { 
  Categoria, 
  CategoriaCreate, 
  CategoriaUpdate, 
  ConfiguracaoGastoMes,
  GastoVariavel 
} from '@/types/categoria';

// Mock data para desenvolvimento
const mockCategorias: Categoria[] = [
  {
    id_categoria: 1,
    id_usuario: 1,
    nome: 'Alimentação',
    limite: 800,
    ativo: true,
    totalGastoCategoriaMes: 520,
    percentualGastoCategoriaMes: 65,
  },
  {
    id_categoria: 2,
    id_usuario: 1,
    nome: 'Transporte',
    limite: 400,
    ativo: true,
    totalGastoCategoriaMes: 380,
    percentualGastoCategoriaMes: 95,
  },
  {
    id_categoria: 3,
    id_usuario: 1,
    nome: 'Lazer',
    limite: 300,
    ativo: true,
    totalGastoCategoriaMes: 320,
    percentualGastoCategoriaMes: 106.67,
  },
  {
    id_categoria: 4,
    id_usuario: 1,
    nome: 'Compras',
    limite: 500,
    ativo: true,
    totalGastoCategoriaMes: 150,
    percentualGastoCategoriaMes: 30,
  },
];

const mockConfigGastoMes: ConfiguracaoGastoMes = {
  id_usuario: 1,
  limite_gasto_mes: 3000,
  gasto_atual_mes: 1370,
  mes: new Date().getMonth() + 1,
  ano: new Date().getFullYear(),
};

// ==================== CATEGORIAS ====================

export async function getCategoriasAtivas(idUsuario: number): Promise<Categoria[]> {
  if (USE_MOCK_DATA) {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockCategorias.filter(c => c.ativo);
  }

  const response = await fetchWithToken(`getCategoriasAtivas/${idUsuario}`);
  
  if (!response.ok) {
    throw new Error('Erro ao buscar categorias ativas');
  }
  
  return parseResponse<Categoria[]>(response);
}

export async function getCategoriasInativas(idUsuario: number): Promise<Categoria[]> {
  if (USE_MOCK_DATA) {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [];
  }

  const response = await fetchWithToken(`getCategoriasInativas/${idUsuario}`);
  
  if (!response.ok) {
    throw new Error('Erro ao buscar categorias inativas');
  }
  
  return parseResponse<Categoria[]>(response);
}

export async function createCategoria(
  idUsuario: number, 
  categoria: CategoriaCreate
): Promise<{ mensagem: string; id_categoria: number }> {
  if (USE_MOCK_DATA) {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { mensagem: 'Categoria criada com sucesso.', id_categoria: Date.now() };
  }

  const response = await fetchWithToken(`criarCategoria/${idUsuario}`, {
    method: 'POST',
    body: JSON.stringify({ categoria }),
  });
  
  if (!response.ok) {
    const error = await parseResponse<{ message: string }>(response);
    throw new Error(error.message || 'Erro ao criar categoria');
  }
  
  return parseResponse(response);
}

export async function updateCategoria(
  idCategoria: number, 
  categoria: CategoriaUpdate
): Promise<{ affectedRows: number }> {
  if (USE_MOCK_DATA) {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { affectedRows: 1 };
  }

  const response = await fetchWithToken(`updateCategoria?id_categoria=${idCategoria}`, {
    method: 'PATCH',
    body: JSON.stringify(categoria),
  });
  
  if (!response.ok) {
    throw new Error('Erro ao atualizar categoria');
  }
  
  return parseResponse(response);
}

export async function deleteCategoria(idCategoria: number): Promise<void> {
  if (USE_MOCK_DATA) {
    await new Promise(resolve => setTimeout(resolve, 500));
    return;
  }

  const response = await fetchWithToken(`deleteCategorias?id_categoria=${idCategoria}`, {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    throw new Error('Erro ao excluir categoria');
  }
}

export async function reativarCategoria(
  idCategoria: number, 
  idUsuario: number
): Promise<void> {
  if (USE_MOCK_DATA) {
    await new Promise(resolve => setTimeout(resolve, 500));
    return;
  }

  const response = await fetchWithToken(
    `categorias/${idCategoria}/reativar?id_usuario=${idUsuario}`,
    { method: 'PATCH' }
  );
  
  if (!response.ok) {
    throw new Error('Erro ao reativar categoria');
  }
}

// ==================== LIMITE GASTO MÊS ====================

export async function getLimiteGastoMes(
  idUsuario: number, 
  ano: number, 
  mes: number
): Promise<ConfiguracaoGastoMes | null> {
  if (USE_MOCK_DATA) {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockConfigGastoMes;
  }

  const response = await fetchWithToken(
    `gastosMes/limite/${idUsuario}?ano=${ano}&mes=${mes}`
  );
  
  if (!response.ok) {
    if (response.status === 404) return null;
    throw new Error('Erro ao buscar limite do mês');
  }
  
  return parseResponse<ConfiguracaoGastoMes>(response);
}

export async function configLimiteGastoMes(
  idUsuario: number,
  config: { limiteGastoMes: number; mes: number; ano: number }
): Promise<void> {
  if (USE_MOCK_DATA) {
    await new Promise(resolve => setTimeout(resolve, 500));
    return;
  }

  const response = await fetchWithToken(`gastosMes/configurar/${idUsuario}`, {
    method: 'POST',
    body: JSON.stringify(config),
  });
  
  if (!response.ok) {
    throw new Error('Erro ao configurar limite do mês');
  }
}

// ==================== GASTOS ====================

export async function addGasto(
  idUsuario: number,
  gasto: Omit<GastoVariavel, 'id_gasto' | 'id_usuario'>
): Promise<{ mensagem: string; id_gasto: number }> {
  if (USE_MOCK_DATA) {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { mensagem: 'Gasto adicionado com sucesso.', id_gasto: Date.now() };
  }

  const response = await fetchWithToken(`gastos/adicionar/${idUsuario}`, {
    method: 'POST',
    body: JSON.stringify(gasto),
  });
  
  if (!response.ok) {
    const error = await parseResponse<{ message: string }>(response);
    throw new Error(error.message || 'Erro ao adicionar gasto');
  }
  
  return parseResponse(response);
}
