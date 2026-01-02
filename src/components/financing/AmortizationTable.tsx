import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Financing } from "@/types/finance";
import { ChevronDown, ChevronUp, TableIcon } from "lucide-react";

interface AmortizationTableProps {
  financing: Financing;
}

interface AmortizationRow {
  installment: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
  isPaid: boolean;
}

export function AmortizationTable({ financing }: AmortizationTableProps) {
  const [showTable, setShowTable] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const formatCurrency = (value: number) =>
    value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  const tableData = useMemo(() => {
    const rows: AmortizationRow[] = [];
    const monthlyRate = financing.interestRate / 100;
    let balance = financing.totalAmount;
    
    for (let i = 1; i <= financing.totalInstallments; i++) {
      const interest = balance * monthlyRate;
      const principal = financing.monthlyPayment - interest;
      balance = Math.max(0, balance - principal);
      
      rows.push({
        installment: i,
        payment: financing.monthlyPayment,
        principal: Math.max(0, principal),
        interest: Math.max(0, interest),
        balance: Math.max(0, balance),
        isPaid: i <= financing.paidInstallments,
      });
    }
    
    return rows;
  }, [financing]);

  const displayData = showAll ? tableData : tableData.slice(0, 6);
  const totalInterest = tableData.reduce((acc, row) => acc + row.interest, 0);
  const totalPaid = financing.monthlyPayment * financing.totalInstallments;

  return (
    <Card variant="glass">
      <CardHeader className="px-4 pt-4 pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm flex items-center gap-2">
            <TableIcon className="h-4 w-4 text-primary" />
            Tabela de Amortização
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowTable(!showTable)}
            className="gap-1 h-8 text-xs"
          >
            {showTable ? (
              <>Ocultar <ChevronUp className="h-4 w-4" /></>
            ) : (
              <>Ver <ChevronDown className="h-4 w-4" /></>
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="px-4 pb-4 space-y-3">
        {/* Summary */}
        <div className="grid grid-cols-3 gap-2">
          <div className="p-2.5 rounded-lg bg-muted/30 text-center">
            <p className="text-[10px] text-muted-foreground">Total Pago</p>
            <p className="font-semibold text-xs">{formatCurrency(totalPaid)}</p>
          </div>
          <div className="p-2.5 rounded-lg bg-destructive/10 text-center">
            <p className="text-[10px] text-muted-foreground">Total Juros</p>
            <p className="font-semibold text-xs text-destructive">{formatCurrency(totalInterest)}</p>
          </div>
          <div className="p-2.5 rounded-lg bg-primary/10 text-center">
            <p className="text-[10px] text-muted-foreground">Custo</p>
            <p className="font-semibold text-xs text-primary">
              {((totalInterest / financing.totalAmount) * 100).toFixed(1)}%
            </p>
          </div>
        </div>

        {/* Mobile Table */}
        {showTable && (
          <div className="animate-fade-in space-y-2">
            {displayData.map((row) => (
              <div
                key={row.installment}
                className={`p-3 rounded-xl bg-muted/30 ${row.isPaid ? "opacity-50" : ""}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">#{row.installment}</span>
                    {row.isPaid ? (
                      <Badge variant="secondary" className="text-[10px] px-1.5 py-0">Paga</Badge>
                    ) : row.installment === financing.paidInstallments + 1 ? (
                      <Badge className="text-[10px] px-1.5 py-0 bg-warning text-warning-foreground">Atual</Badge>
                    ) : null}
                  </div>
                  <span className="font-semibold">{formatCurrency(row.payment)}</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <p className="text-muted-foreground">Amortização</p>
                    <p className="font-medium text-success">{formatCurrency(row.principal)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Juros</p>
                    <p className="font-medium text-destructive">{formatCurrency(row.interest)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Saldo</p>
                    <p className="font-medium">{formatCurrency(row.balance)}</p>
                  </div>
                </div>
              </div>
            ))}
            
            {tableData.length > 6 && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAll(!showAll)}
                className="w-full h-10"
              >
                {showAll ? "Mostrar menos" : `Ver todas as ${tableData.length} parcelas`}
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
