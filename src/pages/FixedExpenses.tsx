import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { FixedExpenseCard } from "@/components/fixed-expenses/FixedExpenseCard";
import { AddFixedExpenseModal } from "@/components/fixed-expenses/AddFixedExpenseModal";
import { EditFixedExpenseModal } from "@/components/fixed-expenses/EditFixedExpenseModal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FixedExpense } from "@/types/finance";
import { TrendingUp, Calendar, AlertCircle } from "lucide-react";
import { toast } from "sonner";

const mockExpenses: FixedExpense[] = [
  { id: "1", name: "Conta de Luz", category: "utilities", amount: 180.00, dueDay: 10, isActive: true },
  { id: "2", name: "Conta de Água", category: "utilities", amount: 85.00, dueDay: 15, isActive: true },
  { id: "3", name: "Internet", category: "subscriptions", amount: 120.00, dueDay: 5, isActive: true },
  { id: "4", name: "Netflix", category: "subscriptions", amount: 55.90, dueDay: 8, isActive: true },
  { id: "5", name: "Spotify", category: "subscriptions", amount: 21.90, dueDay: 12, isActive: true },
  { id: "6", name: "Academia", category: "health", amount: 150.00, dueDay: 1, isActive: true },
  { id: "7", name: "Plano de Saúde", category: "health", amount: 450.00, dueDay: 20, isActive: true },
  { id: "8", name: "Aluguel", category: "housing", amount: 1800.00, dueDay: 5, isActive: true },
  { id: "9", name: "Condomínio", category: "housing", amount: 600.00, dueDay: 10, isActive: true },
  { id: "10", name: "Curso de Inglês", category: "education", amount: 300.00, dueDay: 15, isActive: false },
];

export default function FixedExpenses() {
  const [expenses, setExpenses] = useState<FixedExpense[]>(mockExpenses);
  const [editingExpense, setEditingExpense] = useState<FixedExpense | null>(null);

  const handleAddExpense = (expenseData: Omit<FixedExpense, "id">) => {
    const newExpense: FixedExpense = { ...expenseData, id: Date.now().toString() };
    setExpenses([...expenses, newExpense]);
    toast.success("Gasto fixo adicionado!");
  };

  const handleEditExpense = (expense: FixedExpense) => {
    setExpenses(expenses.map((e) => (e.id === expense.id ? expense : e)));
    toast.success("Gasto fixo atualizado!");
  };

  const handleToggle = (id: string) => {
    setExpenses(expenses.map((exp) => exp.id === id ? { ...exp, isActive: !exp.isActive } : exp));
  };

  const handleDelete = (id: string) => {
    setExpenses(expenses.filter((exp) => exp.id !== id));
    toast.success("Gasto fixo removido!");
  };

  const formatCurrency = (value: number) => value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  const activeExpenses = expenses.filter((e) => e.isActive);
  const totalMonthly = activeExpenses.reduce((acc, exp) => acc + exp.amount, 0);
  const totalAnnual = totalMonthly * 12;
  const today = new Date().getDate();
  const upcomingExpenses = activeExpenses.filter((e) => e.dueDay >= today && e.dueDay <= today + 7);

  const categoryTotals = activeExpenses.reduce((acc, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
    return acc;
  }, {} as Record<string, number>);

  return (
    <DashboardLayout title="Gastos Fixos" subtitle="Gerencie suas despesas recorrentes mensais">
      <div className="space-y-6">
        <div className="flex justify-end">
          <AddFixedExpenseModal onAdd={handleAddExpense} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card variant="gradient" className="animate-fade-in">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <span className="text-muted-foreground">Total Mensal</span>
              </div>
              <p className="text-3xl font-bold">{formatCurrency(totalMonthly)}</p>
              <p className="text-sm text-muted-foreground mt-1">{activeExpenses.length} despesas ativas</p>
            </CardContent>
          </Card>

          <Card variant="glass" className="animate-fade-in" style={{ animationDelay: "100ms" }}>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <Calendar className="h-5 w-5 text-warning" />
                <span className="text-muted-foreground">Total Anual</span>
              </div>
              <p className="text-3xl font-bold">{formatCurrency(totalAnnual)}</p>
              <p className="text-sm text-muted-foreground mt-1">Projeção para 12 meses</p>
            </CardContent>
          </Card>

          <Card variant="glass" className="animate-fade-in" style={{ animationDelay: "200ms" }}>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <AlertCircle className="h-5 w-5 text-destructive" />
                <span className="text-muted-foreground">Próximos 7 dias</span>
              </div>
              <p className="text-3xl font-bold">{formatCurrency(upcomingExpenses.reduce((acc, e) => acc + e.amount, 0))}</p>
              <p className="text-sm text-muted-foreground mt-1">{upcomingExpenses.length} vencimentos</p>
            </CardContent>
          </Card>
        </div>

        <Card variant="glass">
          <CardHeader><CardTitle>Gastos por Categoria</CardTitle></CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {Object.entries(categoryTotals).map(([category, total]) => (
                <div key={category} className="text-center p-3 rounded-xl bg-muted/30">
                  <p className="text-sm text-muted-foreground capitalize mb-1">
                    {category === "utilities" ? "Utilidades" : category === "subscriptions" ? "Assinaturas" : category === "health" ? "Saúde" : category === "education" ? "Educação" : category === "housing" ? "Moradia" : "Outros"}
                  </p>
                  <p className="text-lg font-bold">{formatCurrency(total)}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {expenses.map((expense, index) => (
            <div key={expense.id} className="animate-fade-in cursor-pointer" style={{ animationDelay: `${index * 50}ms` }} onClick={() => setEditingExpense(expense)}>
              <FixedExpenseCard expense={expense} onToggle={handleToggle} onDelete={handleDelete} />
            </div>
          ))}
        </div>

        <EditFixedExpenseModal expense={editingExpense} open={!!editingExpense} onOpenChange={(open) => !open && setEditingExpense(null)} onSave={handleEditExpense} />
      </div>
    </DashboardLayout>
  );
}
