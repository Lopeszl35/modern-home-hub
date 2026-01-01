import { CardExpense } from "@/types/finance";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ShoppingBag, Utensils, Car, Plane, Gamepad2, Heart, GraduationCap, MoreHorizontal } from "lucide-react";

interface CardExpensesListProps {
  expenses: CardExpense[];
  selectedMonth: string;
}

const categoryIcons: Record<string, React.ElementType> = {
  shopping: ShoppingBag,
  food: Utensils,
  transport: Car,
  travel: Plane,
  entertainment: Gamepad2,
  health: Heart,
  education: GraduationCap,
  other: MoreHorizontal,
};

const categoryColors: Record<string, string> = {
  shopping: "bg-pink-500/20 text-pink-400",
  food: "bg-orange-500/20 text-orange-400",
  transport: "bg-blue-500/20 text-blue-400",
  travel: "bg-purple-500/20 text-purple-400",
  entertainment: "bg-green-500/20 text-green-400",
  health: "bg-red-500/20 text-red-400",
  education: "bg-yellow-500/20 text-yellow-400",
  other: "bg-gray-500/20 text-gray-400",
};

export function CardExpensesList({ expenses, selectedMonth }: CardExpensesListProps) {
  const formatCurrency = (value: number) =>
    value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "short" });
  };

  const totalMonth = expenses.reduce((acc, exp) => acc + exp.amount, 0);

  return (
    <Card variant="glass" className="animate-fade-in">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Gastos de {selectedMonth}</CardTitle>
        <Badge variant="secondary" className="text-base font-semibold">
          {formatCurrency(totalMonth)}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-3">
        {expenses.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            Nenhum gasto registrado neste mês
          </p>
        ) : (
          expenses.map((expense, index) => {
            const Icon = categoryIcons[expense.category] || MoreHorizontal;
            return (
              <div
                key={expense.id}
                className={cn(
                  "flex items-center gap-4 p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-all",
                  "animate-slide-in-left"
                )}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className={cn("p-2 rounded-lg", categoryColors[expense.category])}>
                  <Icon className="h-5 w-5" />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{expense.description}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{formatDate(expense.date)}</span>
                    {expense.isInstallment && (
                      <Badge variant="outline" className="text-xs">
                        {expense.currentInstallment}/{expense.totalInstallments}
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="text-right">
                  <p className="font-semibold text-destructive">
                    {formatCurrency(expense.amount)}
                  </p>
                  {expense.isInstallment && expense.totalInstallments && expense.currentInstallment && (
                    <p className="text-xs text-muted-foreground">
                      Restam {expense.totalInstallments - expense.currentInstallment}x
                    </p>
                  )}
                </div>
              </div>
            );
          })
        )}
      </CardContent>
    </Card>
  );
}
