import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Investment, investmentTypeLabels, investmentTypeIcons } from "@/types/investment";
import { Edit2, Trash2, TrendingUp, TrendingDown } from "lucide-react";

interface InvestmentCardProps {
  investment: Investment;
  onEdit: (investment: Investment) => void;
  onDelete: (id: string) => void;
}

export function InvestmentCard({ investment, onEdit, onDelete }: InvestmentCardProps) {
  const profit = investment.currentAmount - investment.investedAmount;
  const profitPercent = investment.investedAmount > 0
    ? ((profit / investment.investedAmount) * 100)
    : 0;
  const isPositive = profit >= 0;

  const formatCurrency = (value: number) =>
    value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  return (
    <Card variant="glass" className="animate-fade-in">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{investmentTypeIcons[investment.type]}</span>
            <div>
              <h3 className="font-semibold text-sm">{investment.name}</h3>
              <div className="flex items-center gap-2 mt-0.5">
                <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                  {investmentTypeLabels[investment.type]}
                </Badge>
                {investment.ticker && (
                  <span className="text-xs text-muted-foreground font-mono">{investment.ticker}</span>
                )}
              </div>
            </div>
          </div>
          <div className="flex gap-1">
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onEdit(investment)}>
              <Edit2 className="h-3.5 w-3.5" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => onDelete(investment.id)}>
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Investido</p>
            <p className="text-sm font-semibold">{formatCurrency(investment.investedAmount)}</p>
          </div>
          <div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Atual</p>
            <p className="text-sm font-semibold">{formatCurrency(investment.currentAmount)}</p>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between p-2.5 rounded-xl bg-muted/30">
          <div className="flex items-center gap-1.5">
            {isPositive ? (
              <TrendingUp className="h-4 w-4 text-success" />
            ) : (
              <TrendingDown className="h-4 w-4 text-destructive" />
            )}
            <span className={`text-sm font-bold ${isPositive ? "text-success" : "text-destructive"}`}>
              {isPositive ? "+" : ""}{formatCurrency(profit)}
            </span>
          </div>
          <span className={`text-xs font-semibold ${isPositive ? "text-success" : "text-destructive"}`}>
            {isPositive ? "+" : ""}{profitPercent.toFixed(2)}%
          </span>
        </div>

        <div className="mt-2 flex items-center justify-between text-[10px] text-muted-foreground">
          <span>{investment.institution}</span>
          {investment.returnRate && <span>{investment.returnRate}% a.a.</span>}
        </div>
      </CardContent>
    </Card>
  );
}
