import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { FinancingCard } from "@/components/financing/FinancingCard";
import { AddFinancingModal } from "@/components/financing/AddFinancingModal";
import { AmortizationCalculator } from "@/components/financing/AmortizationCalculator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Financing } from "@/types/finance";
import { TrendingUp, Wallet, Calendar, Percent } from "lucide-react";

// Mock data
const mockFinancings: Financing[] = [
  {
    id: "1",
    name: "Honda Civic 2023",
    type: "vehicle",
    totalAmount: 120000,
    remainingAmount: 78000,
    monthlyPayment: 2850,
    interestRate: 1.29,
    totalInstallments: 48,
    paidInstallments: 15,
    startDate: "2024-10-01",
    bank: "Banco Honda",
  },
  {
    id: "2",
    name: "Apartamento Centro",
    type: "property",
    totalAmount: 450000,
    remainingAmount: 380000,
    monthlyPayment: 3200,
    interestRate: 0.85,
    totalInstallments: 360,
    paidInstallments: 24,
    startDate: "2024-01-15",
    bank: "Caixa Econômica",
  },
  {
    id: "3",
    name: "Empréstimo Reforma",
    type: "personal",
    totalAmount: 50000,
    remainingAmount: 35000,
    monthlyPayment: 1800,
    interestRate: 1.99,
    totalInstallments: 36,
    paidInstallments: 10,
    startDate: "2025-03-01",
    bank: "Nubank",
  },
];

export default function Financings() {
  const [financings, setFinancings] = useState<Financing[]>(mockFinancings);
  const [selectedId, setSelectedId] = useState<string | null>(mockFinancings[0]?.id || null);

  const selectedFinancing = financings.find((f) => f.id === selectedId);

  const handleAddFinancing = (data: Omit<Financing, "id">) => {
    const newFinancing: Financing = {
      ...data,
      id: Date.now().toString(),
    };
    setFinancings([...financings, newFinancing]);
  };

  const formatCurrency = (value: number) =>
    value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  const totalDebt = financings.reduce((acc, f) => acc + f.remainingAmount, 0);
  const totalMonthlyPayment = financings.reduce((acc, f) => acc + f.monthlyPayment, 0);
  const averageRate = financings.reduce((acc, f) => acc + f.interestRate, 0) / financings.length;

  // Calculate total remaining months (weighted average)
  const weightedMonths = financings.reduce((acc, f) => {
    const remaining = f.totalInstallments - f.paidInstallments;
    return acc + (remaining * f.remainingAmount);
  }, 0);
  const avgRemainingMonths = Math.round(weightedMonths / totalDebt);

  return (
    <DashboardLayout title="Financiamentos" subtitle="Acompanhe seus financiamentos e calcule amortizações">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-end">
          <AddFinancingModal onAdd={handleAddFinancing} />
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card variant="gradient" className="animate-fade-in">
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-2">
                <Wallet className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">Dívida Total</span>
              </div>
              <p className="text-2xl font-bold">{formatCurrency(totalDebt)}</p>
            </CardContent>
          </Card>

          <Card variant="glass" className="animate-fade-in" style={{ animationDelay: "50ms" }}>
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-warning" />
                <span className="text-sm text-muted-foreground">Parcelas Mensais</span>
              </div>
              <p className="text-2xl font-bold">{formatCurrency(totalMonthlyPayment)}</p>
            </CardContent>
          </Card>

          <Card variant="glass" className="animate-fade-in" style={{ animationDelay: "100ms" }}>
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-2">
                <Percent className="h-4 w-4 text-destructive" />
                <span className="text-sm text-muted-foreground">Taxa Média</span>
              </div>
              <p className="text-2xl font-bold">{averageRate.toFixed(2)}% a.m.</p>
            </CardContent>
          </Card>

          <Card variant="glass" className="animate-fade-in" style={{ animationDelay: "150ms" }}>
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="h-4 w-4 text-success" />
                <span className="text-sm text-muted-foreground">Meses Restantes</span>
              </div>
              <p className="text-2xl font-bold">~{avgRemainingMonths} meses</p>
            </CardContent>
          </Card>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Financings List */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-lg font-semibold">Seus Financiamentos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {financings.map((financing, index) => (
                <div
                  key={financing.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <FinancingCard
                    financing={financing}
                    isSelected={financing.id === selectedId}
                    onClick={() => setSelectedId(financing.id)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Amortization Calculator */}
          <div className="space-y-4">
            {selectedFinancing ? (
              <AmortizationCalculator financing={selectedFinancing} />
            ) : (
              <Card variant="glass">
                <CardHeader>
                  <CardTitle>Calculadora de Amortização</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center py-8">
                    Selecione um financiamento para calcular a amortização
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
