import { FixedExpense } from "@/types/finance";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Lightbulb, Wifi, Dumbbell, GraduationCap, Home, MoreHorizontal, Trash2, ChevronRight } from "lucide-react";

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
        "relative overflow-hidden transition-all duration-300 active:scale-[0.98]",
        "bg-gradient-to-br border",
        categoryColors[expense.category],
        !expense.isActive && "opacity-50"
      )}
    >
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          {/* Icon */}
          <div className="p-2.5 rounded-xl bg-background/50 shrink-0">
            <Icon className="h-5 w-5" />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm truncate">{expense.name}</h3>
            <div className="flex items-center gap-2 mt-0.5">
              <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                {categoryLabels[expense.category]}
              </Badge>
              <span className="text-xs text-muted-foreground">Dia {expense.dueDay}</span>
            </div>
          </div>

          {/* Amount & Actions */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="text-right">
              <p className="text-base font-bold">{formatCurrency(expense.amount)}</p>
            </div>
          <Switch
            checked={expense.isActive}
            onCheckedChange={() => onToggle(expense.id)}
            onClick={(e) => e.stopPropagation()}
            className="scale-90"
          />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
