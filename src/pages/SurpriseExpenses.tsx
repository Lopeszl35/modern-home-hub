import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, Edit, AlertTriangle, Car, Heart, Home, Tv, PawPrint, HelpCircle } from "lucide-react";
import { SurpriseExpense, surpriseExpenseCategories } from "@/types/surprise-expense";
import { AddSurpriseExpenseModal } from "@/components/surprise-expenses/AddSurpriseExpenseModal";
import { EditSurpriseExpenseModal } from "@/components/surprise-expenses/EditSurpriseExpenseModal";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useToast } from "@/hooks/use-toast";

const categoryIcons = {
  car: Car,
  health: Heart,
  home: Home,
  appliance: Tv,
  pet: PawPrint,
  other: HelpCircle,
};

const categoryColors = {
  car: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  health: "bg-red-500/10 text-red-500 border-red-500/20",
  home: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  appliance: "bg-purple-500/10 text-purple-500 border-purple-500/20",
  pet: "bg-green-500/10 text-green-500 border-green-500/20",
  other: "bg-gray-500/10 text-gray-500 border-gray-500/20",
};

const SurpriseExpenses = () => {
  const { toast } = useToast();
  const [expenses, setExpenses] = useState<SurpriseExpense[]>([
    {
      id: "1",
      description: "Troca de pneu furado",
      category: "car",
      amount: 450,
      date: "2024-01-10",
      notes: "Pneu traseiro direito",
    },
    {
      id: "2",
      description: "Consulta veterinária de emergência",
      category: "pet",
      amount: 280,
      date: "2024-01-08",
    },
    {
      id: "3",
      description: "Conserto da máquina de lavar",
      category: "appliance",
      amount: 350,
      date: "2024-01-05",
      notes: "Troca da placa eletrônica",
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingExpense, setEditingExpense] = useState<SurpriseExpense | null>(null);

  const handleAddExpense = (expense: Omit<SurpriseExpense, "id">) => {
    const newExpense: SurpriseExpense = {
      ...expense,
      id: Date.now().toString(),
    };
    setExpenses([newExpense, ...expenses]);
    toast({ title: "Gasto adicionado!", description: "O gasto surpresa foi registrado." });
  };

  const handleUpdateExpense = (updated: SurpriseExpense) => {
    setExpenses(expenses.map((e) => (e.id === updated.id ? updated : e)));
    toast({ title: "Gasto atualizado!", description: "As alterações foram salvas." });
  };

  const handleDeleteExpense = (id: string) => {
    setExpenses(expenses.filter((e) => e.id !== id));
    toast({ title: "Gasto removido!", description: "O gasto foi excluído." });
  };

  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);

  const expensesByCategory = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {} as Record<string, number>);

  return (
    <DashboardLayout title="Gastos Surpresa">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Gastos Surpresa</h1>
            <p className="text-muted-foreground">Registre gastos inesperados e emergenciais</p>
          </div>
          <Button onClick={() => setShowAddModal(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            Novo Gasto
          </Button>
        </div>

        {/* Summary Card */}
        <Card className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border-red-500/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="h-6 w-6 text-red-500" />
              <div>
                <p className="text-sm text-muted-foreground">Total em Gastos Surpresa</p>
                <p className="text-3xl font-bold text-foreground">
                  R$ {totalExpenses.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>

            {/* Category breakdown */}
            <div className="flex flex-wrap gap-2">
              {Object.entries(expensesByCategory).map(([category, amount]) => {
                const Icon = categoryIcons[category as keyof typeof categoryIcons];
                return (
                  <Badge
                    key={category}
                    variant="outline"
                    className={`gap-1 ${categoryColors[category as keyof typeof categoryColors]}`}
                  >
                    <Icon className="h-3 w-3" />
                    {surpriseExpenseCategories[category as keyof typeof surpriseExpenseCategories].label}:{" "}
                    R$ {amount.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </Badge>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Expenses List */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">Histórico de Gastos</h2>
          {expenses.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Nenhum gasto surpresa registrado</p>
                <p className="text-sm text-muted-foreground">
                  Isso é ótimo! Significa que não houve imprevistos.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {expenses.map((expense) => {
                const Icon = categoryIcons[expense.category];
                return (
                  <Card key={expense.id} className="transition-all hover:shadow-md">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-3">
                          <div
                            className={`p-2 rounded-lg ${
                              categoryColors[expense.category].split(" ")[0]
                            }`}
                          >
                            <Icon
                              className={`h-5 w-5 ${categoryColors[expense.category].split(" ")[1]}`}
                            />
                          </div>
                          <div>
                            <h3 className="font-semibold text-foreground">{expense.description}</h3>
                            <p className="text-sm text-muted-foreground">
                              {surpriseExpenseCategories[expense.category].label}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between items-center mb-3">
                        <p className="text-xl font-bold text-foreground">
                          R$ {expense.amount.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {format(parseISO(expense.date), "dd/MM/yyyy", { locale: ptBR })}
                        </p>
                      </div>

                      {expense.notes && (
                        <p className="text-sm text-muted-foreground mb-3 italic">
                          "{expense.notes}"
                        </p>
                      )}

                      <div className="flex gap-2 justify-end">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setEditingExpense(expense)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDeleteExpense(expense.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <AddSurpriseExpenseModal
        open={showAddModal}
        onOpenChange={setShowAddModal}
        onAdd={handleAddExpense}
      />

      {editingExpense && (
        <EditSurpriseExpenseModal
          open={!!editingExpense}
          onOpenChange={(open) => !open && setEditingExpense(null)}
          expense={editingExpense}
          onUpdate={handleUpdateExpense}
        />
      )}
    </DashboardLayout>
  );
};

export default SurpriseExpenses;
