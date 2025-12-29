import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: "income" | "expense";
  category: string;
  date: string;
}

interface RecentTransactionsProps {
  transactions: Transaction[];
  className?: string;
}

export function RecentTransactions({ transactions, className }: RecentTransactionsProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
    });
  };

  return (
    <Card variant="elevated" className={cn("animate-fade-in-up", className)} style={{ animationDelay: "300ms" }}>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center justify-between">
          <span>Transações Recentes</span>
          <span className="text-sm font-normal text-muted-foreground">
            Últimos 7 dias
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-1">
        {transactions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="rounded-full bg-muted/50 p-4 mb-3">
              <TrendingUp className="h-6 w-6 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">
              Nenhuma transação registrada
            </p>
          </div>
        ) : (
          transactions.map((transaction, index) => (
            <div
              key={transaction.id}
              className={cn(
                "flex items-center justify-between rounded-lg p-3 transition-colors hover:bg-muted/50",
                "animate-slide-in-left"
              )}
              style={{ animationDelay: `${400 + index * 50}ms` }}
            >
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-lg",
                    transaction.type === "income"
                      ? "bg-success/10 text-success"
                      : "bg-destructive/10 text-destructive"
                  )}
                >
                  {transaction.type === "income" ? (
                    <TrendingUp className="h-5 w-5" />
                  ) : (
                    <TrendingDown className="h-5 w-5" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-sm">{transaction.description}</p>
                  <p className="text-xs text-muted-foreground">
                    {transaction.category} • {formatDate(transaction.date)}
                  </p>
                </div>
              </div>
              <span
                className={cn(
                  "font-semibold tabular-nums",
                  transaction.type === "income"
                    ? "text-success"
                    : "text-destructive"
                )}
              >
                {transaction.type === "income" ? "+" : "-"}
                {formatCurrency(transaction.amount)}
              </span>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
