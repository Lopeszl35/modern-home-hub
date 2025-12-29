import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface MonthlyOverviewProps {
  income: number;
  expenses: number;
  className?: string;
}

export function MonthlyOverview({ income, expenses, className }: MonthlyOverviewProps) {
  const balance = income - expenses;
  const expensePercentage = income > 0 ? Math.min((expenses / income) * 100, 100) : 0;
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  return (
    <Card variant="elevated" className={cn("animate-fade-in-up", className)} style={{ animationDelay: "150ms" }}>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center justify-between">
          <span>Resumo Mensal</span>
          <span className="text-sm font-normal text-muted-foreground">
            {new Date().toLocaleDateString("pt-BR", { month: "long", year: "numeric" })}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Balance highlight */}
        <div className="rounded-xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-4 border border-primary/20">
          <p className="text-sm text-muted-foreground mb-1">Saldo do Mês</p>
          <p className={cn(
            "text-3xl font-bold",
            balance >= 0 ? "text-success" : "text-destructive"
          )}>
            {formatCurrency(balance)}
          </p>
        </div>

        {/* Income vs Expenses */}
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Receitas</span>
              <span className="font-medium text-success">{formatCurrency(income)}</span>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <div 
                className="h-full rounded-full bg-success transition-all duration-1000 ease-out"
                style={{ width: "100%" }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Despesas</span>
              <span className="font-medium text-destructive">{formatCurrency(expenses)}</span>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <div 
                className="h-full rounded-full bg-destructive transition-all duration-1000 ease-out"
                style={{ width: `${expensePercentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Usage indicator */}
        <div className="flex items-center justify-between rounded-lg bg-muted/50 p-3">
          <span className="text-sm text-muted-foreground">Uso do orçamento</span>
          <span className={cn(
            "text-sm font-semibold",
            expensePercentage <= 70 ? "text-success" : 
            expensePercentage <= 90 ? "text-warning" : "text-destructive"
          )}>
            {expensePercentage.toFixed(0)}%
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
