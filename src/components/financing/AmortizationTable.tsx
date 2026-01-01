import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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

  const displayData = showAll ? tableData : tableData.slice(0, 12);
  const totalInterest = tableData.reduce((acc, row) => acc + row.interest, 0);
  const totalPaid = financing.monthlyPayment * financing.totalInstallments;

  return (
    <Card variant="glass">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base flex items-center gap-2">
            <TableIcon className="h-4 w-4 text-primary" />
            Tabela de Amortização
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowTable(!showTable)}
            className="gap-1"
          >
            {showTable ? (
              <>
                Ocultar <ChevronUp className="h-4 w-4" />
              </>
            ) : (
              <>
                Expandir <ChevronDown className="h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Summary */}
        <div className="grid grid-cols-3 gap-3">
          <div className="p-3 rounded-lg bg-muted/30 text-center">
            <p className="text-xs text-muted-foreground">Total Pago</p>
            <p className="font-semibold text-sm">{formatCurrency(totalPaid)}</p>
          </div>
          <div className="p-3 rounded-lg bg-destructive/10 text-center">
            <p className="text-xs text-muted-foreground">Total Juros</p>
            <p className="font-semibold text-sm text-destructive">{formatCurrency(totalInterest)}</p>
          </div>
          <div className="p-3 rounded-lg bg-primary/10 text-center">
            <p className="text-xs text-muted-foreground">Custo Efetivo</p>
            <p className="font-semibold text-sm text-primary">
              {((totalInterest / financing.totalAmount) * 100).toFixed(1)}%
            </p>
          </div>
        </div>

        {/* Table */}
        {showTable && (
          <div className="animate-fade-in overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16">Nº</TableHead>
                  <TableHead>Parcela</TableHead>
                  <TableHead>Amortização</TableHead>
                  <TableHead>Juros</TableHead>
                  <TableHead>Saldo</TableHead>
                  <TableHead className="w-20">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {displayData.map((row) => (
                  <TableRow
                    key={row.installment}
                    className={row.isPaid ? "opacity-60" : ""}
                  >
                    <TableCell className="font-medium">{row.installment}</TableCell>
                    <TableCell>{formatCurrency(row.payment)}</TableCell>
                    <TableCell className="text-success">{formatCurrency(row.principal)}</TableCell>
                    <TableCell className="text-destructive">{formatCurrency(row.interest)}</TableCell>
                    <TableCell>{formatCurrency(row.balance)}</TableCell>
                    <TableCell>
                      {row.isPaid ? (
                        <Badge variant="secondary" className="text-xs">Paga</Badge>
                      ) : row.installment === financing.paidInstallments + 1 ? (
                        <Badge className="text-xs bg-warning text-warning-foreground">Atual</Badge>
                      ) : null}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            {tableData.length > 12 && (
              <div className="flex justify-center pt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAll(!showAll)}
                >
                  {showAll ? "Mostrar menos" : `Ver todas as ${tableData.length} parcelas`}
                </Button>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
