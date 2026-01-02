import { CardExpense } from "@/types/finance";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ShoppingBag, Utensils, Car, Plane, Gamepad2, Heart, GraduationCap, MoreHorizontal, Receipt } from "lucide-react";

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
      <CardHeader className="px-4 pt-4 pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm flex items-center gap-2">
            <Receipt className="h-4 w-4 text-primary" />
            {selectedMonth}
          </CardTitle>
          <Badge variant="secondary" className="text-sm font-semibold">
            {formatCurrency(totalMonth)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="px-4 pb-4 space-y-2">
        {expenses.length === 0 ? (
          <p className="text-center text-muted-foreground py-6 text-sm">
            Nenhum gasto registrado
          </p>
        ) : (
          expenses.map((expense, index) => {
            const Icon = categoryIcons[expense.category] || MoreHorizontal;
            return (
              <div
                key={expense.id}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-xl bg-muted/30 active:bg-muted/50 transition-all"
                )}
              >
                <div className={cn("p-2 rounded-lg shrink-0", categoryColors[expense.category])}>
                  <Icon className="h-4 w-4" />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{expense.description}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{formatDate(expense.date)}</span>
                    {expense.isInstallment && (
                      <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                        {expense.currentInstallment}/{expense.totalInstallments}
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <p className="font-semibold text-sm text-destructive">
                    {formatCurrency(expense.amount)}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </CardContent>
    </Card>
  );
}
