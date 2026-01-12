import { DollarSign, Trash2, Settings, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { CategoriaComStatus } from "@/types/categoria";

interface CategoriaCardProps {
  categoria: CategoriaComStatus;
  onAddGasto: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export function CategoriaCard({ 
  categoria, 
  onAddGasto, 
  onEdit, 
  onDelete 
}: CategoriaCardProps) {
  const limite = Number(categoria.limite) || 0;
  const totalMes = Number(categoria.totalGastoCategoriaMes) || 0;
  const pct = limite > 0 ? Math.min((totalMes / limite) * 100, 100) : 0;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  return (
    <div
      className={cn(
        "group relative rounded-2xl border p-5 transition-all duration-300 hover:shadow-elevated cursor-pointer",
        "bg-gradient-to-br from-card to-card/80",
        categoria.status === 'danger' && "border-destructive/50 hover:border-destructive",
        categoria.status === 'warn' && "border-warning/50 hover:border-warning",
        categoria.status === 'ok' && "border-border hover:border-primary/50",
      )}
      onClick={onEdit}
    >
      {/* Glow effect for status */}
      <div 
        className={cn(
          "absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10",
          categoria.status === 'danger' && "bg-destructive/5",
          categoria.status === 'warn' && "bg-warning/5",
          categoria.status === 'ok' && "bg-primary/5",
        )} 
      />

      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={cn(
            "flex h-10 w-10 items-center justify-center rounded-xl",
            categoria.status === 'danger' && "bg-destructive/20 text-destructive",
            categoria.status === 'warn' && "bg-warning/20 text-warning",
            categoria.status === 'ok' && "gradient-primary text-primary-foreground",
          )}>
            <TrendingUp className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{categoria.nome}</h3>
            <p className="text-xs text-muted-foreground">
              {formatCurrency(totalMes)} de {formatCurrency(limite)}
            </p>
          </div>
        </div>

        <Badge 
          variant="outline"
          className={cn(
            "font-bold tabular-nums",
            categoria.status === 'danger' && "border-destructive text-destructive bg-destructive/10",
            categoria.status === 'warn' && "border-warning text-warning bg-warning/10",
            categoria.status === 'ok' && "border-primary text-primary bg-primary/10",
          )}
        >
          {categoria.percentualCalculado}%
        </Badge>
      </div>

      {/* Progress */}
      {limite > 0 && (
        <div className="mb-4">
          <Progress 
            value={pct} 
            className={cn(
              "h-2",
              categoria.status === 'danger' && "[&>div]:bg-destructive",
              categoria.status === 'warn' && "[&>div]:bg-warning",
              categoria.status === 'ok' && "[&>div]:bg-primary",
            )}
          />
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-2 pt-2 border-t border-border/50">
        <Button
          variant="ghost"
          size="sm"
          className="flex-1 text-primary hover:text-primary hover:bg-primary/10"
          onClick={(e) => {
            e.stopPropagation();
            onAddGasto();
          }}
        >
          <DollarSign className="h-4 w-4 mr-1" />
          Adicionar gasto
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:text-foreground"
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
        >
          <Settings className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
