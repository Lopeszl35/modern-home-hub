import { Financing } from "@/types/finance";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { Car, Home, Wallet, MoreHorizontal, Building2 } from "lucide-react";

interface FinancingCardProps {
  financing: Financing;
  isSelected: boolean;
  onClick: () => void;
}

const typeIcons: Record<string, React.ElementType> = {
  vehicle: Car,
  property: Home,
  personal: Wallet,
  other: MoreHorizontal,
};

const typeLabels: Record<string, string> = {
  vehicle: "Veículo",
  property: "Imóvel",
  personal: "Pessoal",
  other: "Outro",
};

const typeColors: Record<string, string> = {
  vehicle: "from-blue-600 to-cyan-600",
  property: "from-emerald-600 to-teal-600",
  personal: "from-purple-600 to-pink-600",
  other: "from-gray-600 to-slate-600",
};

export function FinancingCard({ financing, isSelected, onClick }: FinancingCardProps) {
  const Icon = typeIcons[financing.type] || MoreHorizontal;
  const progress = (financing.paidInstallments / financing.totalInstallments) * 100;
  const remainingInstallments = financing.totalInstallments - financing.paidInstallments;

  const formatCurrency = (value: number) =>
    value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  return (
    <Card
      onClick={onClick}
      className={cn(
        "cursor-pointer transition-all duration-300 overflow-hidden",
        "hover:shadow-elevated hover:scale-[1.02]",
        isSelected && "ring-2 ring-primary shadow-glow"
      )}
    >
      <div className={cn("h-2 bg-gradient-to-r", typeColors[financing.type])} />
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={cn(
              "p-2 rounded-xl bg-gradient-to-br",
              typeColors[financing.type]
            )}>
              <Icon className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold">{financing.name}</h3>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="secondary" className="text-xs">
                  {typeLabels[financing.type]}
                </Badge>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Building2 className="h-3 w-3" />
                  {financing.bank}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Progresso</span>
            <span className="font-medium">{progress.toFixed(0)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{financing.paidInstallments} pagas</span>
            <span>{remainingInstallments} restantes</span>
          </div>
        </div>

        {/* Values */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Parcela Mensal</p>
            <p className="text-lg font-bold text-primary">{formatCurrency(financing.monthlyPayment)}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Saldo Devedor</p>
            <p className="text-lg font-bold">{formatCurrency(financing.remainingAmount)}</p>
          </div>
        </div>

        <div className="mt-3 flex justify-between text-xs text-muted-foreground">
          <span>Taxa: {financing.interestRate}% a.m.</span>
          <span>{financing.totalInstallments}x de {formatCurrency(financing.monthlyPayment)}</span>
        </div>
      </CardContent>
    </Card>
  );
}
