import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { InvestmentCard } from "@/components/investments/InvestmentCard";
import { AddInvestmentModal } from "@/components/investments/AddInvestmentModal";
import { EditInvestmentModal } from "@/components/investments/EditInvestmentModal";
import { Investment, InvestmentType, investmentTypeLabels, investmentTypeIcons } from "@/types/investment";
import { TrendingUp, TrendingDown, Wallet, PieChart, BarChart3, Filter } from "lucide-react";
import { toast } from "sonner";

const mockInvestments: Investment[] = [
  { id: "1", name: "CDB Banco Inter 120% CDI", type: "cdb", institution: "Banco Inter", investedAmount: 10000, currentAmount: 10850, returnRate: 12.0, purchaseDate: "2025-06-01", maturityDate: "2027-06-01" },
  { id: "2", name: "Tesouro Selic 2029", type: "tesouro_selic", institution: "Tesouro Direto", investedAmount: 5000, currentAmount: 5320, returnRate: 13.75, purchaseDate: "2025-01-15", maturityDate: "2029-03-01" },
  { id: "3", name: "Petrobras", type: "acoes", ticker: "PETR4", institution: "XP Investimentos", investedAmount: 3000, currentAmount: 3450, quantity: 100, purchaseDate: "2025-03-10" },
  { id: "4", name: "Bitcoin", type: "cripto", ticker: "BTC", institution: "Binance", investedAmount: 8000, currentAmount: 9200, quantity: 0.085, purchaseDate: "2025-02-20" },
  { id: "5", name: "HGLG11", type: "fiis", ticker: "HGLG11", institution: "Rico", investedAmount: 4000, currentAmount: 4180, quantity: 25, returnRate: 8.5, purchaseDate: "2025-04-01" },
  { id: "6", name: "Tesouro IPCA+ 2035", type: "tesouro_ipca", institution: "Tesouro Direto", investedAmount: 7000, currentAmount: 7350, returnRate: 6.2, purchaseDate: "2025-05-10", maturityDate: "2035-05-15" },
  { id: "7", name: "LCI Itaú", type: "lci_lca", institution: "Itaú", investedAmount: 15000, currentAmount: 15600, returnRate: 10.0, purchaseDate: "2025-07-01", maturityDate: "2026-07-01" },
];

type FilterType = "all" | InvestmentType;

export default function Investments() {
  const [investments, setInvestments] = useState<Investment[]>(mockInvestments);
  const [editingInvestment, setEditingInvestment] = useState<Investment | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<FilterType>("all");

  const totalInvested = investments.reduce((a, i) => a + i.investedAmount, 0);
  const totalCurrent = investments.reduce((a, i) => a + i.currentAmount, 0);
  const totalProfit = totalCurrent - totalInvested;
  const totalProfitPercent = totalInvested > 0 ? (totalProfit / totalInvested) * 100 : 0;
  const isPositive = totalProfit >= 0;

  const formatCurrency = (value: number) =>
    value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  // Group by type for allocation
  const allocationByType = investments.reduce((acc, inv) => {
    acc[inv.type] = (acc[inv.type] || 0) + inv.currentAmount;
    return acc;
  }, {} as Record<string, number>);

  const filteredInvestments = filterType === "all"
    ? investments
    : investments.filter((i) => i.type === filterType);

  const activeTypes = [...new Set(investments.map((i) => i.type))];

  const handleAdd = (data: Omit<Investment, "id">) => {
    setInvestments([...investments, { ...data, id: Date.now().toString() }]);
    toast.success("Investimento adicionado!");
  };

  const handleEdit = (updated: Investment) => {
    setInvestments(investments.map((i) => (i.id === updated.id ? updated : i)));
  };

  const handleDelete = () => {
    if (deleteId) {
      setInvestments(investments.filter((i) => i.id !== deleteId));
      setDeleteId(null);
      toast.success("Investimento removido!");
    }
  };

  return (
    <DashboardLayout title="Investimentos" subtitle="Gerencie seu portfólio">
      <Tabs defaultValue="portfolio" className="space-y-4 pb-24">
        <TabsList className="grid w-full grid-cols-2 h-12">
          <TabsTrigger value="portfolio" className="gap-2">
            <BarChart3 className="h-4 w-4" />
            Portfólio
          </TabsTrigger>
          <TabsTrigger value="allocation" className="gap-2">
            <PieChart className="h-4 w-4" />
            Alocação
          </TabsTrigger>
        </TabsList>

        <TabsContent value="portfolio" className="space-y-4">
          {/* Summary Cards */}
          <div className="grid grid-cols-2 gap-3">
            <Card variant="gradient">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Wallet className="h-4 w-4 text-primary" />
                  <p className="text-[10px] text-muted-foreground uppercase">Patrimônio</p>
                </div>
                <p className="text-lg font-bold">{formatCurrency(totalCurrent)}</p>
              </CardContent>
            </Card>
            <Card variant="glass">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-1">
                  {isPositive ? <TrendingUp className="h-4 w-4 text-success" /> : <TrendingDown className="h-4 w-4 text-destructive" />}
                  <p className="text-[10px] text-muted-foreground uppercase">Rentabilidade</p>
                </div>
                <p className={`text-lg font-bold ${isPositive ? "text-success" : "text-destructive"}`}>
                  {isPositive ? "+" : ""}{formatCurrency(totalProfit)}
                </p>
                <p className={`text-xs ${isPositive ? "text-success" : "text-destructive"}`}>
                  {isPositive ? "+" : ""}{totalProfitPercent.toFixed(2)}%
                </p>
              </CardContent>
            </Card>
          </div>

          <Card variant="glass">
            <CardContent className="p-3 flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Total Investido</span>
              <span className="font-semibold">{formatCurrency(totalInvested)}</span>
            </CardContent>
          </Card>

          {/* Filter */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <Filter className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <Badge
              variant={filterType === "all" ? "default" : "secondary"}
              className="cursor-pointer flex-shrink-0"
              onClick={() => setFilterType("all")}
            >
              Todos ({investments.length})
            </Badge>
            {activeTypes.map((type) => (
              <Badge
                key={type}
                variant={filterType === type ? "default" : "secondary"}
                className="cursor-pointer flex-shrink-0"
                onClick={() => setFilterType(type)}
              >
                {investmentTypeIcons[type]} {investmentTypeLabels[type]}
              </Badge>
            ))}
          </div>

          {/* Investment List */}
          <div className="space-y-3">
            {filteredInvestments.map((inv, index) => (
              <div key={inv.id} className="animate-fade-in" style={{ animationDelay: `${index * 40}ms` }}>
                <InvestmentCard
                  investment={inv}
                  onEdit={setEditingInvestment}
                  onDelete={setDeleteId}
                />
              </div>
            ))}
            {filteredInvestments.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <Wallet className="h-12 w-12 mx-auto mb-3 opacity-30" />
                <p>Nenhum investimento encontrado</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="allocation" className="space-y-4">
          <Card variant="glass">
            <CardHeader className="pb-2 px-4 pt-4">
              <CardTitle className="text-sm flex items-center gap-2">
                <PieChart className="h-4 w-4 text-primary" />
                Distribuição por Tipo
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-4 space-y-2">
              {Object.entries(allocationByType)
                .sort((a, b) => b[1] - a[1])
                .map(([type, amount]) => {
                  const percent = totalCurrent > 0 ? (amount / totalCurrent) * 100 : 0;
                  return (
                    <div key={type} className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm flex items-center gap-2">
                          {investmentTypeIcons[type as InvestmentType]}
                          {investmentTypeLabels[type as InvestmentType]}
                        </span>
                        <span className="text-sm font-semibold">{percent.toFixed(1)}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-muted overflow-hidden">
                        <div
                          className="h-full rounded-full bg-primary transition-all"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground text-right">{formatCurrency(amount)}</p>
                    </div>
                  );
                })}
            </CardContent>
          </Card>

          <Card variant="glass">
            <CardHeader className="pb-2 px-4 pt-4">
              <CardTitle className="text-sm">Por Instituição</CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-4 space-y-2">
              {Object.entries(
                investments.reduce((acc, inv) => {
                  acc[inv.institution] = (acc[inv.institution] || 0) + inv.currentAmount;
                  return acc;
                }, {} as Record<string, number>)
              )
                .sort((a, b) => b[1] - a[1])
                .map(([inst, amount]) => (
                  <div key={inst} className="flex items-center justify-between p-3 rounded-xl bg-muted/30">
                    <span className="text-sm">{inst}</span>
                    <span className="text-sm font-semibold">{formatCurrency(amount)}</span>
                  </div>
                ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* FAB */}
      <div className="fixed bottom-6 right-6 z-50">
        <AddInvestmentModal onAdd={handleAdd} />
      </div>

      <EditInvestmentModal
        investment={editingInvestment}
        open={!!editingInvestment}
        onOpenChange={(open) => !open && setEditingInvestment(null)}
        onSave={handleEdit}
      />

      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent className="mx-4 max-w-sm">
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir Investimento</AlertDialogTitle>
            <AlertDialogDescription>Tem certeza que deseja excluir este investimento?</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col gap-2 sm:flex-row">
            <AlertDialogCancel className="w-full sm:w-auto">Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="w-full sm:w-auto bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardLayout>
  );
}
