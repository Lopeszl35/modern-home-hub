import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { RecentTransactions } from "@/components/dashboard/RecentTransactions";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { MonthlyOverview } from "@/components/dashboard/MonthlyOverview";
import { 
  Wallet, 
  TrendingUp, 
  TrendingDown, 
  PiggyBank,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Target
} from "lucide-react";
import { toast } from "sonner";

// Mock data - will be replaced by real data from backend
const mockTransactions = [
  {
    id: "1",
    description: "Salário",
    amount: 5000,
    type: "income" as const,
    category: "Trabalho",
    date: "2024-12-28",
  },
  {
    id: "2",
    description: "Supermercado Extra",
    amount: 350.5,
    type: "expense" as const,
    category: "Alimentação",
    date: "2024-12-27",
  },
  {
    id: "3",
    description: "Dividendos PETR4",
    amount: 120.75,
    type: "income" as const,
    category: "Investimentos",
    date: "2024-12-26",
  },
  {
    id: "4",
    description: "Netflix",
    amount: 55.9,
    type: "expense" as const,
    category: "Streaming",
    date: "2024-12-25",
  },
  {
    id: "5",
    description: "Uber",
    amount: 28.0,
    type: "expense" as const,
    category: "Transporte",
    date: "2024-12-24",
  },
];

const quickActions = [
  {
    id: "1",
    label: "Nova Receita",
    description: "Adicionar entrada",
    icon: <ArrowUpRight className="h-6 w-6" />,
    onClick: () => toast.success("Em breve: Adicionar receita"),
    color: "success" as const,
  },
  {
    id: "2",
    label: "Nova Despesa",
    description: "Registrar gasto",
    icon: <ArrowDownRight className="h-6 w-6" />,
    onClick: () => toast.success("Em breve: Adicionar despesa"),
    color: "destructive" as const,
  },
  {
    id: "3",
    label: "Investir",
    description: "Aplicar dinheiro",
    icon: <TrendingUp className="h-6 w-6" />,
    onClick: () => toast.success("Em breve: Novo investimento"),
    color: "primary" as const,
  },
  {
    id: "4",
    label: "Nova Meta",
    description: "Definir objetivo",
    icon: <Target className="h-6 w-6" />,
    onClick: () => toast.success("Em breve: Criar meta"),
    color: "warning" as const,
  },
];

const Index = () => {
  // Mock summary data
  const totalBalance = 15750.25;
  const monthlyIncome = 5120.75;
  const monthlyExpenses = 2340.40;
  const totalInvestments = 25000.00;

  return (
    <DashboardLayout
      title="Dashboard"
      subtitle="Bem-vindo de volta! Aqui está seu resumo financeiro."
    >
      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Saldo Total"
            value={new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(totalBalance)}
            icon={Wallet}
            trend={{ value: 12.5, isPositive: true }}
            variant="default"
            delay={0}
          />
          <StatCard
            title="Receitas do Mês"
            value={new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(monthlyIncome)}
            icon={TrendingUp}
            trend={{ value: 8.2, isPositive: true }}
            variant="success"
            delay={50}
          />
          <StatCard
            title="Despesas do Mês"
            value={new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(monthlyExpenses)}
            icon={TrendingDown}
            trend={{ value: 3.1, isPositive: false }}
            variant="destructive"
            delay={100}
          />
          <StatCard
            title="Investimentos"
            value={new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(totalInvestments)}
            icon={PiggyBank}
            trend={{ value: 15.8, isPositive: true }}
            variant="warning"
            delay={150}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column - Overview & Quick Actions */}
          <div className="space-y-6">
            <MonthlyOverview 
              income={monthlyIncome} 
              expenses={monthlyExpenses} 
            />
            <QuickActions actions={quickActions} />
          </div>

          {/* Right Column - Transactions */}
          <div className="lg:col-span-2">
            <RecentTransactions transactions={mockTransactions} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
