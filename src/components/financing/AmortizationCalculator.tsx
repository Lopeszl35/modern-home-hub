import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Financing } from "@/types/finance";
import { Calculator, TrendingDown, Calendar, Coins } from "lucide-react";

interface AmortizationCalculatorProps {
  financing: Financing;
}

export function AmortizationCalculator({ financing }: AmortizationCalculatorProps) {
  const [extraPayment, setExtraPayment] = useState("");
  const [result, setResult] = useState<{
    monthsReduced: number;
    interestSaved: number;
    newEndDate: Date;
    newRemainingAmount: number;
  } | null>(null);

  const formatCurrency = (value: number) =>
    value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  const calculateAmortization = () => {
    const extra = parseFloat(extraPayment);
    if (isNaN(extra) || extra <= 0) return;

    const monthlyRate = financing.interestRate / 100;
    const remainingInstallments = financing.totalInstallments - financing.paidInstallments;
    
    const currentTotalInterest = (financing.monthlyPayment * remainingInstallments) - financing.remainingAmount;
    const newRemainingAmount = financing.remainingAmount - extra;
    
    let newInstallments: number;
    const pmtFactor = (newRemainingAmount * monthlyRate) / financing.monthlyPayment;
    
    if (pmtFactor >= 1) {
      newInstallments = remainingInstallments;
    } else {
      newInstallments = Math.ceil(-Math.log(1 - pmtFactor) / Math.log(1 + monthlyRate));
    }
    
    const monthsReduced = remainingInstallments - newInstallments;
    const newTotalPayment = newInstallments * financing.monthlyPayment;
    const newTotalInterest = newTotalPayment - newRemainingAmount;
    const interestSaved = currentTotalInterest - newTotalInterest;

    const today = new Date();
    const newEndDate = new Date(today.setMonth(today.getMonth() + newInstallments));

    setResult({
      monthsReduced: Math.max(0, monthsReduced),
      interestSaved: Math.max(0, interestSaved),
      newEndDate,
      newRemainingAmount,
    });
  };

  return (
    <Card variant="glass">
      <CardHeader className="px-4 pt-4 pb-2">
        <CardTitle className="text-sm flex items-center gap-2">
          <Calculator className="h-4 w-4 text-primary" />
          Calculadora de Amortização
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-4 space-y-4">
        {/* Current Info */}
        <div className="p-3 rounded-xl bg-muted/30 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Saldo Devedor</span>
            <span className="font-semibold">{formatCurrency(financing.remainingAmount)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Parcelas Restantes</span>
            <span className="font-semibold">{financing.totalInstallments - financing.paidInstallments}x</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Taxa de Juros</span>
            <span className="font-semibold">{financing.interestRate}% a.m.</span>
          </div>
        </div>

        {/* Input */}
        <div className="space-y-2">
          <Label htmlFor="extraPayment" className="text-sm">Valor para Amortizar</Label>
          <div className="flex gap-2">
            <Input
              id="extraPayment"
              type="number"
              step="0.01"
              placeholder="5000.00"
              value={extraPayment}
              onChange={(e) => setExtraPayment(e.target.value)}
              className="h-12"
            />
            <Button onClick={calculateAmortization} className="h-12 px-6">
              Calcular
            </Button>
          </div>
        </div>

        {/* Results */}
        {result && (
          <div className="grid grid-cols-2 gap-3 pt-2 animate-fade-in">
            <div className="p-3 rounded-xl bg-success/10 border border-success/20">
              <div className="flex items-center gap-2 mb-1">
                <TrendingDown className="h-4 w-4 text-success" />
                <span className="text-xs text-muted-foreground">Meses</span>
              </div>
              <p className="text-xl font-bold text-success">-{result.monthsReduced}</p>
            </div>

            <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
              <div className="flex items-center gap-2 mb-1">
                <Coins className="h-4 w-4 text-primary" />
                <span className="text-xs text-muted-foreground">Economia</span>
              </div>
              <p className="text-lg font-bold text-primary">{formatCurrency(result.interestSaved)}</p>
            </div>

            <div className="p-3 rounded-xl bg-muted/30 col-span-2">
              <div className="flex items-center gap-2 mb-1">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Nova Data de Quitação</span>
              </div>
              <p className="text-lg font-bold">
                {result.newEndDate.toLocaleDateString("pt-BR", { month: "long", year: "numeric" })}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Novo saldo: {formatCurrency(result.newRemainingAmount)}
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
