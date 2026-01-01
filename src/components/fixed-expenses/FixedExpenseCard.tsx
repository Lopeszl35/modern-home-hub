import { FixedExpense } from "@/types/finance";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Lightbulb, Wifi, Dumbbell, GraduationCap, Home, MoreHorizontal, Trash2 } from "lucide-react";

interface FixedExpenseCardProps {
  expense: FixedExpense;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const categoryIcons: Record<string, React.ElementType> = {
  utilities: Lightbulb,
  subscriptions: Wifi,
  health: Dumbbell,
  education: GraduationCap,
  housing: Home,
  other: MoreHorizontal,
};

const categoryColors: Record<string, string> = {
  utilities: "from-yellow-500/20 to-orange-500/20 border-yellow-500/30",
  subscriptions: "from-blue-500/20 to-cyan-500/20 border-blue-500/30",
  health: "from-red-500/20 to-pink-500/20 border-red-500/30",
  education: "from-purple-500/20 to-indigo-500/20 border-purple-500/30",
  housing: "from-green-500/20 to-emerald-500/20 border-green-500/30",
  other: "from-gray-500/20 to-slate-500/20 border-gray-500/30",
};

const categoryLabels: Record<string, string> = {
  utilities: "Utilidades",
  subscriptions: "Assinaturas",
  health: "Saúde",
  education: "Educação",
  housing: "Moradia",
  other: "Outros",
};

export function FixedExpenseCard({ expense, onToggle, onDelete }: FixedExpenseCardProps) {
  const Icon = categoryIcons[expense.category] || MoreHorizontal;
  
  const formatCurrency = (value: number) =>
    value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  return (
    <Card
      className={cn(
        "relative overflow-hidden transition-all duration-300 hover:shadow-elevated",
        "bg-gradient-to-br border",
        categoryColors[expense.category],
        !expense.isActive && "opacity-50"
      )}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-background/50">
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold">{expense.name}</h3>
              <Badge variant="secondary" className="text-xs mt-1">
                {categoryLabels[expense.category]}
              </Badge>
            </div>
          </div>
          <Switch
            checked={expense.isActive}
            onCheckedChange={() => onToggle(expense.id)}
          />
        </div>

        <div className="flex items-end justify-between">
          <div>
            <p className="text-2xl font-bold">{formatCurrency(expense.amount)}</p>
            <p className="text-sm text-muted-foreground">Vence dia {expense.dueDay}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-destructive"
            onClick={() => onDelete(expense.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
