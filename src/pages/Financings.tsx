import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { FinancingCard } from "@/components/financing/FinancingCard";
import { AddFinancingModal } from "@/components/financing/AddFinancingModal";
import { AmortizationCalculator } from "@/components/financing/AmortizationCalculator";
import { AmortizationTable } from "@/components/financing/AmortizationTable";
import { EditFinancingModal } from "@/components/financing/EditFinancingModal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Financing } from "@/types/finance";
import { TrendingUp, Wallet, Calendar, Percent, ChevronLeft } from "lucide-react";
import { toast } from "sonner";

const mockFinancings: Financing[] = [
  { id: "1", name: "Honda Civic 2023", type: "vehicle", totalAmount: 120000, remainingAmount: 78000, monthlyPayment: 2850, interestRate: 1.29, totalInstallments: 48, paidInstallments: 15, startDate: "2024-10-01", bank: "Banco Honda" },
  { id: "2", name: "Apartamento Centro", type: "property", totalAmount: 450000, remainingAmount: 380000, monthlyPayment: 3200, interestRate: 0.85, totalInstallments: 360, paidInstallments: 24, startDate: "2024-01-15", bank: "Caixa Econômica" },
  { id: "3", name: "Empréstimo Reforma", type: "personal", totalAmount: 50000, remainingAmount: 35000, monthlyPayment: 1800, interestRate: 1.99, totalInstallments: 36, paidInstallments: 10, startDate: "2025-03-01", bank: "Nubank" },
];

export default function Financings() {
  const [financings, setFinancings] = useState<Financing[]>(mockFinancings);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [editingFinancing, setEditingFinancing] = useState<Financing | null>(null);

  const selectedFinancing = financings.find((f) => f.id === selectedId);

  const handleAddFinancing = (data: Omit<Financing, "id">) => {
    setFinancings([...financings, { ...data, id: Date.now().toString() }]);
    toast.success("Financiamento adicionado!");
  };

  const handleEditFinancing = (financing: Financing) => {
    setFinancings(financings.map((f) => (f.id === financing.id ? financing : f)));
    toast.success("Financiamento atualizado!");
  };

  const formatCurrency = (value: number) => value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  const totalDebt = financings.reduce((acc, f) => acc + f.remainingAmount, 0);
  const totalMonthlyPayment = financings.reduce((acc, f) => acc + f.monthlyPayment, 0);
  const averageRate = financings.length > 0 ? financings.reduce((acc, f) => acc + f.interestRate, 0) / financings.length : 0;
  const weightedMonths = financings.reduce((acc, f) => acc + ((f.totalInstallments - f.paidInstallments) * f.remainingAmount), 0);
  const avgRemainingMonths = totalDebt > 0 ? Math.round(weightedMonths / totalDebt) : 0;

  // Detail View
  if (selectedFinancing) {
    return (
      <DashboardLayout title={selectedFinancing.name} subtitle={selectedFinancing.bank}>
        <div className="space-y-4 pb-24">
          {/* Back Button */}
          <Button
            variant="ghost"
            size="sm"
            className="gap-2 -ml-2"
            onClick={() => setSelectedId(null)}
          >
            <ChevronLeft className="h-4 w-4" />
            Voltar
          </Button>

          {/* Financing Card */}
          <FinancingCard
            financing={selectedFinancing}
            isSelected={true}
            onClick={() => setEditingFinancing(selectedFinancing)}
          />

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-3">
            <Card variant="glass">
              <CardContent className="p-4">
                <p className="text-xs text-muted-foreground">Parcela Mensal</p>
                <p className="text-lg font-bold">{formatCurrency(selectedFinancing.monthlyPayment)}</p>
              </CardContent>
            </Card>
            <Card variant="glass">
              <CardContent className="p-4">
                <p className="text-xs text-muted-foreground">Parcelas Restantes</p>
                <p className="text-lg font-bold">{selectedFinancing.totalInstallments - selectedFinancing.paidInstallments}x</p>
              </CardContent>
            </Card>
          </div>

          {/* Amortization Calculator */}
          <AmortizationCalculator financing={selectedFinancing} />

          {/* Amortization Table */}
          <AmortizationTable financing={selectedFinancing} />
        </div>

        <EditFinancingModal 
          financing={editingFinancing} 
          open={!!editingFinancing} 
          onOpenChange={(open) => !open && setEditingFinancing(null)} 
          onSave={handleEditFinancing} 
        />
      </DashboardLayout>
    );
  }

  // List View
  return (
    <DashboardLayout title="Financiamentos" subtitle="Acompanhe seus financiamentos">
      <div className="space-y-4 pb-24">
        {/* Stats Cards - Horizontal Scroll */}
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 snap-x snap-mandatory">
          <Card variant="gradient" className="min-w-[150px] snap-start shrink-0 animate-fade-in">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Wallet className="h-4 w-4 text-primary" />
                <span className="text-xs text-muted-foreground">Dívida Total</span>
              </div>
              <p className="text-lg font-bold">{formatCurrency(totalDebt)}</p>
            </CardContent>
          </Card>

          <Card variant="glass" className="min-w-[150px] snap-start shrink-0 animate-fade-in" style={{ animationDelay: "50ms" }}>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-warning" />
                <span className="text-xs text-muted-foreground">Mensais</span>
              </div>
              <p className="text-lg font-bold">{formatCurrency(totalMonthlyPayment)}</p>
            </CardContent>
          </Card>

          <Card variant="glass" className="min-w-[150px] snap-start shrink-0 animate-fade-in" style={{ animationDelay: "100ms" }}>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Percent className="h-4 w-4 text-destructive" />
                <span className="text-xs text-muted-foreground">Taxa Média</span>
              </div>
              <p className="text-lg font-bold">{averageRate.toFixed(2)}%</p>
            </CardContent>
          </Card>

          <Card variant="glass" className="min-w-[150px] snap-start shrink-0 animate-fade-in" style={{ animationDelay: "150ms" }}>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="h-4 w-4 text-success" />
                <span className="text-xs text-muted-foreground">Meses</span>
              </div>
              <p className="text-lg font-bold">~{avgRemainingMonths}</p>
            </CardContent>
          </Card>
        </div>

        {/* Financings List */}
        <div className="space-y-3">
          <h2 className="text-base font-semibold">Seus Financiamentos</h2>
          {financings.map((financing, index) => (
            <div 
              key={financing.id} 
              className="animate-fade-in" 
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <FinancingCard 
                financing={financing} 
                isSelected={false} 
                onClick={() => setSelectedId(financing.id)} 
              />
            </div>
          ))}
        </div>

        {/* Floating Add Button */}
        <div className="fixed bottom-6 right-6 z-50">
          <AddFinancingModal onAdd={handleAddFinancing} />
        </div>
      </div>

      <EditFinancingModal 
        financing={editingFinancing} 
        open={!!editingFinancing} 
        onOpenChange={(open) => !open && setEditingFinancing(null)} 
        onSave={handleEditFinancing} 
      />
    </DashboardLayout>
  );
}
