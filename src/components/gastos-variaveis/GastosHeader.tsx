import { AlertTriangle, TrendingUp, Wallet } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { ConfigLimiteMesModal } from "./ConfigLimiteMesModal";

interface GastosHeaderProps {
  mes: string;
  gastoTotalMes: number;
  gastosLimiteMes: number;
  progressoMes: number;
  alertaGastoExcedido: boolean;
  onConfigLimite: (config: { limiteGastoMes: number; mes: number; ano: number }) => Promise<void>;
}

export function GastosHeader({
  mes,
  gastoTotalMes,
  gastosLimiteMes,
  progressoMes,
  alertaGastoExcedido,
  onConfigLimite,
}: GastosHeaderProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const saldoRestante = gastosLimiteMes - gastoTotalMes;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-card via-card to-card/80 p-6 shadow-card">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
      
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl gradient-primary shadow-glow">
              <Wallet className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">Gastos Variáveis</h2>
              <p className="text-sm text-muted-foreground">
                No mês de {mes}, você já gastou {formatCurrency(gastoTotalMes)}
              </p>
            </div>
          </div>

          <ConfigLimiteMesModal 
            limiteAtual={gastosLimiteMes} 
            onSave={onConfigLimite}
          />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="rounded-xl bg-secondary/50 p-4">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Gasto do Mês
              </span>
            </div>
            <p className={cn(
              "text-2xl font-bold",
              alertaGastoExcedido ? "text-destructive" : "text-foreground"
            )}>
              {formatCurrency(gastoTotalMes)}
            </p>
          </div>

          <div className="rounded-xl bg-secondary/50 p-4">
            <div className="flex items-center gap-2 mb-1">
              <Wallet className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Limite do Mês
              </span>
            </div>
            <p className="text-2xl font-bold text-foreground">
              {formatCurrency(gastosLimiteMes)}
            </p>
          </div>
        </div>

        {/* Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Progresso do mês</span>
            <span className={cn(
              "font-semibold",
              alertaGastoExcedido ? "text-destructive" : "text-primary"
            )}>
              {Math.round(progressoMes)}%
            </span>
          </div>
          <Progress 
            value={progressoMes} 
            className={cn(
              "h-3",
              alertaGastoExcedido && "[&>div]:bg-destructive"
            )}
          />
          
          {alertaGastoExcedido ? (
            <div className="flex items-center gap-2 mt-3 p-3 rounded-lg bg-destructive/10 border border-destructive/30">
              <AlertTriangle className="h-4 w-4 text-destructive" />
              <span className="text-sm text-destructive font-medium">
                Você excedeu o limite deste mês em {formatCurrency(Math.abs(saldoRestante))}
              </span>
            </div>
          ) : gastosLimiteMes > 0 && (
            <p className="text-sm text-muted-foreground mt-2">
              Saldo restante: <span className="text-primary font-medium">{formatCurrency(saldoRestante)}</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
