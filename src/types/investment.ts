export type InvestmentType = 'cdb' | 'tesouro_selic' | 'tesouro_ipca' | 'tesouro_pre' | 'acoes' | 'fiis' | 'cripto' | 'poupanca' | 'lci_lca' | 'outros';

export interface Investment {
  id: string;
  name: string;
  type: InvestmentType;
  ticker?: string;
  institution: string;
  investedAmount: number;
  currentAmount: number;
  returnRate?: number;
  maturityDate?: string;
  purchaseDate: string;
  quantity?: number;
  notes?: string;
}

export const investmentTypeLabels: Record<InvestmentType, string> = {
  cdb: 'CDB',
  tesouro_selic: 'Tesouro Selic',
  tesouro_ipca: 'Tesouro IPCA+',
  tesouro_pre: 'Tesouro Prefixado',
  acoes: 'Ações',
  fiis: 'FIIs',
  cripto: 'Criptomoedas',
  poupanca: 'Poupança',
  lci_lca: 'LCI/LCA',
  outros: 'Outros',
};

export const investmentTypeIcons: Record<InvestmentType, string> = {
  cdb: '🏦',
  tesouro_selic: '🇧🇷',
  tesouro_ipca: '📈',
  tesouro_pre: '📊',
  acoes: '📉',
  fiis: '🏢',
  cripto: '₿',
  poupanca: '🐷',
  lci_lca: '🏠',
  outros: '💰',
};

export interface MarketQuote {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  type: 'stock' | 'crypto' | 'index' | 'currency';
}

export interface MarketNews {
  id: string;
  title: string;
  summary: string;
  source: string;
  publishedAt: string;
  category: 'acoes' | 'cripto' | 'economia' | 'tecnologia' | 'global';
  imageUrl?: string;
  url?: string;
}
