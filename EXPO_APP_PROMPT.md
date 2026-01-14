# 📱 Prompt para Reconstruir App de Finanças Pessoais em React Native Expo

## 🎯 Visão Geral do Projeto

Crie um **aplicativo mobile de controle financeiro pessoal** completo usando **React Native com Expo**. O app deve ser moderno, com visual fintech premium, tema escuro por padrão e suporte a tema claro.

---

## 🎨 Design System

### Paleta de Cores (Tema Escuro - Padrão)
```javascript
const colors = {
  dark: {
    background: '#0f172a',      // Fundo principal
    foreground: '#f8fafc',      // Texto principal
    card: '#1e293b',            // Cards
    cardForeground: '#f8fafc',  // Texto em cards
    primary: '#22c55e',         // Verde primário (accent)
    primaryForeground: '#0f172a',
    secondary: '#1e293b',
    secondaryForeground: '#f8fafc',
    muted: '#1e293b',
    mutedForeground: '#64748b', // Texto secundário
    accent: '#22c55e',
    destructive: '#ef4444',     // Vermelho para erros/gastos
    success: '#22c55e',         // Verde para receitas
    warning: '#f59e0b',         // Amarelo para avisos
    border: '#334155',
    input: '#334155',
  },
  light: {
    background: '#f8fafc',
    foreground: '#0f172a',
    card: '#ffffff',
    cardForeground: '#0f172a',
    primary: '#16a34a',
    primaryForeground: '#ffffff',
    secondary: '#f1f5f9',
    muted: '#f1f5f9',
    mutedForeground: '#64748b',
    destructive: '#dc2626',
    success: '#16a34a',
    warning: '#d97706',
    border: '#e2e8f0',
  }
};
```

### Tipografia
- **Fonte**: Plus Jakarta Sans (instalar via expo-google-fonts)
- **Tamanhos**: xs: 12, sm: 14, base: 16, lg: 18, xl: 20, 2xl: 24, 3xl: 30, 4xl: 36

### Espaçamento
```javascript
const spacing = {
  xs: 4, sm: 8, md: 12, lg: 16, xl: 20, '2xl': 24, '3xl': 32, '4xl': 40
};
```

### Border Radius
```javascript
const borderRadius = {
  sm: 4, md: 6, lg: 8, xl: 12, '2xl': 16, '3xl': 24, full: 9999
};
```

### Sombras
```javascript
const shadows = {
  sm: { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 1 },
  md: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  lg: { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.15, shadowRadius: 8, elevation: 5 },
  glow: (color) => ({ shadowColor: color, shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.3, shadowRadius: 20, elevation: 10 }),
};
```

---

## 📱 Telas do App

### 1. **Tela de Login** (`LoginScreen`)
**Funcionalidades:**
- Campo de e-mail com ícone
- Campo de senha com toggle de visibilidade (olho)
- Checkbox "Lembrar-me"
- Link "Esqueci minha senha"
- Botão "Entrar" com loading state
- Link para cadastro
- Validação de campos
- Mensagem de erro estilizada

**Layout:**
- Logo centralizado no topo (ícone Wallet com gradiente)
- Nome do app "FinanceApp" com tagline
- Card com formulário (estilo glass)
- Background com círculos decorativos blur

### 2. **Tela de Cadastro** (`RegisterScreen`)
**Funcionalidades:**
- Campo nome completo
- Campo e-mail
- Campo senha com requisitos
- Campo confirmar senha
- Select "Perfil financeiro" (Conservador, Moderado, Arrojado)
- Campo salário mensal (input monetário)
- Campo saldo inicial (input monetário)
- Termos de uso checkbox
- Validação completa

### 3. **Dashboard Principal** (`IndexScreen/HomeScreen`)
**Componentes:**
- **Header**: Saudação "Olá, [Nome]" + avatar + ícone notificação
- **Cards de Estatísticas** (grid 2x2):
  - Saldo Total (ícone Wallet, variação %)
  - Receitas do Mês (ícone TrendingUp, verde)
  - Despesas do Mês (ícone TrendingDown, vermelho)
  - Investimentos (ícone PiggyBank, amarelo)
- **Resumo Mensal**: Gráfico circular de receita vs despesa
- **Ações Rápidas**: 4 botões (Nova Receita, Nova Despesa, Investir, Nova Meta)
- **Transações Recentes**: Lista com scroll das últimas 5 transações

### 4. **Cartões de Crédito** (`CreditCardsScreen`)
**Funcionalidades:**
- Lista de cartões (visual realista de cartão)
  - Nome, últimos 4 dígitos, bandeira (Visa/Mastercard/Elo)
  - Limite total, usado e disponível
  - Barra de progresso do limite
  - Cor customizável por cartão
  - Dias de fechamento e vencimento
- Detalhes do cartão ao clicar:
  - Seletor de mês
  - Lista de gastos do mês
  - Parcelas ativas
  - Gastos por categoria
- CRUD completo de cartões
- Adicionar gastos com:
  - Descrição, valor, data, categoria
  - Parcelamento (quantidade e parcela atual)

**Interface de Cartão:**
```javascript
// Estrutura visual do cartão
{
  id, name, lastDigits, brand, // 'visa' | 'mastercard' | 'elo'
  limit, usedLimit, dueDay, closingDay, color
}
```

### 5. **Gastos Variáveis** (`GastosVariaveisScreen`)
**Funcionalidades:**
- Header com:
  - Mês atual (ex: "Janeiro 2026")
  - Total gasto no mês
  - Limite do mês (configurável)
  - Barra de progresso
  - Alerta se exceder limite
- Grid de categorias:
  - Nome da categoria
  - Limite da categoria
  - Total gasto
  - Barra de progresso com cores (verde/amarelo/vermelho)
  - Ações: editar, excluir, adicionar gasto
- Modal adicionar gasto:
  - Descrição, valor, data
  - Forma de pagamento: PIX, Dinheiro, Débito, Crédito
  - Se crédito, selecionar cartão

**Status das categorias:**
- `ok`: < 75% do limite (verde)
- `warn`: 75-100% do limite (amarelo)
- `danger`: > 100% do limite (vermelho)

### 6. **Receitas** (`ReceitasScreen`)
**Funcionalidades:**
- Tabs: Pessoa Física | Pessoa Jurídica
- **Pessoa Física:**
  - Tipo: Salário, PIX, Venda, Freelance, Outros
  - Descrição, valor, data
  - Toggle recorrente
- **Pessoa Jurídica:**
  - CNPJ, Razão Social
  - Tipo: Serviço, Produto, Consultoria, Licenciamento, Outros
  - Valor bruto, impostos (%), valor líquido (calculado)
  - Data emissão, data recebimento
  - Número NF, cliente
  - Status: Pendente, Recebido, Atrasado
- Resumo no topo:
  - Total do mês
  - Total recorrente vs avulso
  - Comparativo mês anterior (%)

### 7. **Despesas Fixas** (`FixedExpensesScreen`)
**Funcionalidades:**
- Lista de despesas fixas mensais:
  - Nome (ex: "Aluguel", "Internet", "Academia")
  - Valor
  - Dia de vencimento
  - Categoria
  - Status pago/pendente no mês atual
- CRUD completo
- Total de despesas fixas do mês
- Marcar como pago

### 8. **Financiamentos** (`FinancingsScreen`)
**Funcionalidades:**
- Lista de financiamentos ativos:
  - Nome (ex: "Carro", "Apartamento")
  - Valor total, valor da parcela
  - Parcela atual / total de parcelas
  - Taxa de juros, sistema (SAC/PRICE)
  - Data início, data fim prevista
  - Barra de progresso
- Calculadora de amortização:
  - Simular pagamento extra
  - Ver economia de juros
  - Tabela de amortização expandível

### 9. **Lembretes de Pagamento** (`PaymentRemindersScreen`)
**Funcionalidades:**
- Para dívidas informais (ex: "Bolo da vizinha")
- Campos:
  - Descrição da compra
  - Nome do vendedor
  - Valor
  - Data da compra
  - Data de vencimento
  - Forma de pagamento: **apenas PIX ou Dinheiro**
  - Observações
  - Status: Pendente / Pago
- Lista com:
  - Badge "Vencido" se passou da data (vermelho)
  - Badge "Pendente" ou "Pago"
- Ação de marcar como pago (registra data do pagamento)
- Filtros: Todos, Pendentes, Pagos, Vencidos

### 10. **Gastos Surpresa** (`SurpriseExpensesScreen`)
**Funcionalidades:**
- Gastos imprevistos/emergenciais do mês
- Categorias predefinidas:
  - 🚗 Veículo (conserto do carro)
  - ❤️ Saúde (consulta, remédio)
  - 🏠 Casa (encanador, eletricista)
  - 📺 Eletrodoméstico (geladeira quebrou)
  - 🐾 Pet (veterinário)
  - ❓ Outros
- Campos: descrição, categoria, valor, data, observações
- Resumo por categoria
- Total de gastos surpresa no mês

### 11. **Assistente IA** (`AssistenteIAScreen`)
**Funcionalidades:**
- Chat interface para dúvidas financeiras
- Mensagens do usuário (alinhadas à direita)
- Mensagens do assistente (alinhadas à esquerda)
- Input com placeholder "Pergunte sobre suas finanças..."
- Botão enviar
- Estado vazio com sugestões de perguntas
- Loading state nas respostas

### 12. **Perfil** (`ProfileScreen`)
**Funcionalidades:**
- Avatar grande (circular)
- Nome editável
- Email (readonly)
- Perfil financeiro (select)
- Salário mensal
- Saldo atual
- Botões: Salvar alterações, Sair

### 13. **Configurações** (`SettingsScreen`)
**Funcionalidades:**
- Seções:
  - **Aparência**: Tema (Escuro/Claro/Sistema)
  - **Notificações**: Toggle notificações push
  - **Segurança**: Alterar senha, Biometria
  - **Dados**: Exportar dados, Limpar cache
  - **Sobre**: Versão, Termos, Política de privacidade
- Links para seções individuais

---

## 🗂️ Estrutura de Pastas

```
src/
├── assets/                    # Imagens e fontes
├── components/
│   ├── common/               # Botões, Inputs, Cards reutilizáveis
│   ├── cards/                # Componentes de cartão de crédito
│   ├── categories/           # Componentes de categorias
│   ├── charts/               # Gráficos
│   └── modals/               # Modais
├── contexts/
│   ├── AuthContext.tsx       # Autenticação
│   ├── UserContext.tsx       # Dados do usuário
│   └── ThemeContext.tsx      # Tema
├── hooks/
│   ├── useAuth.ts
│   ├── useCategories.ts
│   └── useFinances.ts
├── navigation/
│   ├── AppNavigator.tsx      # Stack principal
│   ├── AuthNavigator.tsx     # Stack de auth
│   └── TabNavigator.tsx      # Bottom tabs
├── screens/
│   ├── auth/
│   │   ├── LoginScreen.tsx
│   │   └── RegisterScreen.tsx
│   ├── main/
│   │   ├── HomeScreen.tsx
│   │   ├── CreditCardsScreen.tsx
│   │   ├── GastosVariaveisScreen.tsx
│   │   ├── ReceitasScreen.tsx
│   │   ├── FixedExpensesScreen.tsx
│   │   ├── FinancingsScreen.tsx
│   │   ├── PaymentRemindersScreen.tsx
│   │   ├── SurpriseExpensesScreen.tsx
│   │   ├── AssistenteIAScreen.tsx
│   │   ├── ProfileScreen.tsx
│   │   └── SettingsScreen.tsx
├── services/
│   ├── api.ts                # Configuração Axios/Fetch
│   ├── authService.ts
│   ├── categoriesService.ts
│   ├── cardsService.ts
│   └── expensesService.ts
├── styles/
│   ├── theme.ts              # Cores, espaçamentos, tipografia
│   ├── common.ts             # Estilos compartilhados
│   └── pages/                # Estilos por tela
├── types/
│   ├── user.ts
│   ├── category.ts
│   ├── card.ts
│   ├── expense.ts
│   ├── income.ts
│   └── finance.ts
└── utils/
    ├── formatters.ts         # Formatação de moeda, data
    └── validators.ts         # Validações
```

---

## 📦 Tipos TypeScript

```typescript
// User
interface User {
  id_usuario: number;
  nome: string;
  email: string;
  perfil_financeiro: 'conservador' | 'moderado' | 'arrojado';
  salario_mensal: number;
  saldo_inicial: number;
  saldo_atual: number;
}

// Categoria de Gastos
interface Categoria {
  id_categoria: number;
  id_usuario: number;
  nome: string;
  limite: number | null;
  ativo: boolean;
  totalGastoCategoriaMes?: number;
  percentualGastoCategoriaMes?: number;
}

// Gasto Variável
interface GastoVariavel {
  id_gasto?: number;
  id_categoria: number;
  id_usuario: number;
  data_gasto: string;
  valor: number;
  descricao: string;
  forma_pagamento: 'PIX' | 'DINHEIRO' | 'DEBITO' | 'CREDITO';
  id_cartao?: number | null;
}

// Cartão de Crédito
interface CreditCard {
  id: string;
  name: string;
  lastDigits: string;
  brand: 'visa' | 'mastercard' | 'elo';
  limit: number;
  usedLimit: number;
  dueDay: number;
  closingDay: number;
  color: string;
}

// Gasto do Cartão
interface CardExpense {
  id: string;
  cardId: string;
  description: string;
  amount: number;
  date: string;
  category: string;
  isInstallment: boolean;
  currentInstallment?: number;
  totalInstallments?: number;
}

// Receita Pessoa Física
interface ReceitaPF {
  id?: number;
  id_usuario: number;
  tipo: 'salario' | 'pix' | 'venda' | 'freelance' | 'outros';
  descricao: string;
  valor: number;
  data: string;
  recorrente: boolean;
}

// Receita Pessoa Jurídica
interface ReceitaPJ {
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
}

// Lembrete de Pagamento
interface PaymentReminder {
  id: string;
  description: string;
  vendorName: string;
  amount: number;
  purchaseDate: string;
  dueDate: string;
  paymentMethod: 'pix' | 'dinheiro';
  status: 'pending' | 'paid';
  notes?: string;
  paidAt?: string;
}

// Gasto Surpresa
interface SurpriseExpense {
  id: string;
  description: string;
  category: 'car' | 'health' | 'home' | 'appliance' | 'pet' | 'other';
  amount: number;
  date: string;
  notes?: string;
}

// Categorias de Gastos Surpresa
const surpriseExpenseCategories = {
  car: { label: 'Veículo', icon: 'Car' },
  health: { label: 'Saúde', icon: 'Heart' },
  home: { label: 'Casa', icon: 'Home' },
  appliance: { label: 'Eletrodoméstico', icon: 'Tv' },
  pet: { label: 'Pet', icon: 'PawPrint' },
  other: { label: 'Outros', icon: 'HelpCircle' },
};
```

---

## 📚 Dependências Necessárias

```bash
# Core
expo install react-native-safe-area-context react-native-screens react-native-gesture-handler

# Navegação
npm install @react-navigation/native @react-navigation/native-stack @react-navigation/bottom-tabs

# Ícones
npm install @expo/vector-icons lucide-react-native

# Fontes
expo install expo-font @expo-google-fonts/plus-jakarta-sans

# Armazenamento
expo install @react-native-async-storage/async-storage

# Formulários
npm install react-hook-form zod @hookform/resolvers

# Data
npm install date-fns

# HTTP
npm install axios

# Gráficos (opcional)
npm install react-native-chart-kit react-native-svg
```

---

## 🔧 Configuração da API

```typescript
// services/api.ts
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'https://sua-api.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
```

---

## 📐 Padrões de Código

1. **Componentes funcionais** com hooks
2. **TypeScript** para tipagem
3. **StyleSheet.create** para estilos
4. **Context API** para estado global
5. **Custom hooks** para lógica reutilizável
6. **Modais** para formulários de criação/edição
7. **Formatação monetária**: `toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })`
8. **Formatação de data**: usar `date-fns` com locale pt-BR
9. **Feedback visual**: loading states, empty states, error states
10. **Animações**: fade-in nas listas com delay incremental

---

## 🎭 Componentes Reutilizáveis

Criar biblioteca de componentes:
- `Button` (variantes: primary, secondary, ghost, destructive)
- `Input` (com ícone opcional, error state)
- `Card` (variantes: default, glass, gradient)
- `Badge` (variantes: default, success, warning, destructive)
- `Modal` (com header, body, footer)
- `Select/Picker`
- `ProgressBar`
- `StatCard`
- `EmptyState`
- `LoadingSpinner`
- `Avatar`

---

## 🌐 Navegação

```typescript
// Bottom Tabs (5 itens):
// 1. Home (Wallet icon)
// 2. Gastos (TrendingDown icon)
// 3. Receitas (TrendingUp icon)
// 4. Cartões (CreditCard icon)
// 5. Mais (Menu icon) -> abre drawer/modal com outras opções

// Stack Navigator para cada tab
// AuthStack: Login, Register
// MainStack: Todas as outras telas
```

---

## ✨ Detalhes Visuais Importantes

1. **Cards com efeito glass**: `backgroundColor com opacity + blur`
2. **Gradiente no botão primário**: de primary para uma variação mais clara
3. **Ícones**: usar Lucide React Native ou @expo/vector-icons
4. **Safe Area**: respeitar notch e barra de navegação
5. **Keyboard Avoiding View**: em todas as telas com formulário
6. **Pull to Refresh**: nas listas
7. **Skeleton Loading**: enquanto carrega dados
8. **Toast/Snackbar**: para feedback de ações

---

## 📱 Responsividade

- Usar `Dimensions` ou `useWindowDimensions` para larguras dinâmicas
- Grid de 2 colunas em telas menores, 3+ em tablets
- Font scaling consciente
- Touch targets mínimo 44x44 pontos

---

Esse prompt contém todas as especificações necessárias para reconstruir o app completo. Personalize a URL da API e adicione funcionalidades específicas conforme necessário.
