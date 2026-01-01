import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { CreditCardItem } from "@/components/cards/CreditCardItem";
import { CardExpensesList } from "@/components/cards/CardExpensesList";
import { AddCardModal } from "@/components/cards/AddCardModal";
import { AddExpenseModal } from "@/components/cards/AddExpenseModal";
import { EditCardModal } from "@/components/cards/EditCardModal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { CreditCard, CardExpense } from "@/types/finance";
import { Calendar, TrendingDown, Wallet, Edit2, Trash2, PieChart } from "lucide-react";
import { toast } from "sonner";

// Mock data
const mockCards: CreditCard[] = [
  { id: "1", name: "Nubank", lastDigits: "4532", brand: "mastercard", limit: 8000, usedLimit: 3250, dueDay: 15, closingDay: 8, color: "#7c3aed" },
  { id: "2", name: "Itaú Platinum", lastDigits: "8821", brand: "visa", limit: 15000, usedLimit: 4800, dueDay: 20, closingDay: 13, color: "#ea580c" },
  { id: "3", name: "Bradesco", lastDigits: "1199", brand: "elo", limit: 5000, usedLimit: 1200, dueDay: 10, closingDay: 3, color: "#dc2626" },
];

const mockExpenses: CardExpense[] = [
  { id: "1", cardId: "1", description: "Amazon - iPhone Case", amount: 89.90, date: "2026-01-02", category: "shopping", isInstallment: false },
  { id: "2", cardId: "1", description: "iFood", amount: 45.50, date: "2026-01-03", category: "food", isInstallment: false },
  { id: "3", cardId: "1", description: "PlayStation 5", amount: 416.58, date: "2026-01-05", category: "entertainment", currentInstallment: 3, totalInstallments: 12, isInstallment: true },
  { id: "4", cardId: "1", description: "Curso Udemy", amount: 27.90, date: "2026-01-08", category: "education", isInstallment: false },
  { id: "5", cardId: "1", description: "Uber", amount: 32.40, date: "2026-01-10", category: "transport", isInstallment: false },
  { id: "6", cardId: "2", description: "Notebook Dell", amount: 583.25, date: "2026-01-04", category: "shopping", currentInstallment: 5, totalInstallments: 10, isInstallment: true },
  { id: "7", cardId: "2", description: "Restaurante", amount: 180.00, date: "2026-01-06", category: "food", isInstallment: false },
];

const months = [
  { value: "2026-01", label: "Janeiro 2026" },
  { value: "2025-12", label: "Dezembro 2025" },
  { value: "2025-11", label: "Novembro 2025" },
  { value: "2025-10", label: "Outubro 2025" },
];

export default function CreditCards() {
  const [cards, setCards] = useState<CreditCard[]>(mockCards);
  const [expenses, setExpenses] = useState<CardExpense[]>(mockExpenses);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(mockCards[0]?.id || null);
  const [selectedMonth, setSelectedMonth] = useState("2026-01");
  const [editingCard, setEditingCard] = useState<CreditCard | null>(null);
  const [deleteCardId, setDeleteCardId] = useState<string | null>(null);

  const selectedCard = cards.find((c) => c.id === selectedCardId);
  const cardExpenses = expenses.filter((e) => e.cardId === selectedCardId);
  const installmentExpenses = cardExpenses.filter((e) => e.isInstallment);

  const handleAddCard = (cardData: Omit<CreditCard, "id">) => {
    const newCard: CreditCard = {
      ...cardData,
      id: Date.now().toString(),
    };
    setCards([...cards, newCard]);
    toast.success("Cartão adicionado com sucesso!");
  };

  const handleEditCard = (updatedCard: CreditCard) => {
    setCards(cards.map((c) => (c.id === updatedCard.id ? updatedCard : c)));
    toast.success("Cartão atualizado com sucesso!");
  };

  const handleDeleteCard = () => {
    if (deleteCardId) {
      setCards(cards.filter((c) => c.id !== deleteCardId));
      setExpenses(expenses.filter((e) => e.cardId !== deleteCardId));
      if (selectedCardId === deleteCardId) {
        setSelectedCardId(cards.find((c) => c.id !== deleteCardId)?.id || null);
      }
      setDeleteCardId(null);
      toast.success("Cartão excluído com sucesso!");
    }
  };

  const handleAddExpense = (expenseData: Omit<CardExpense, "id">) => {
    const newExpense: CardExpense = {
      ...expenseData,
      id: Date.now().toString(),
    };
    setExpenses([...expenses, newExpense]);
    
    // Atualiza o limite usado do cartão
    setCards(cards.map((c) => 
      c.id === expenseData.cardId 
        ? { ...c, usedLimit: c.usedLimit + expenseData.amount }
        : c
    ));
    toast.success("Gasto adicionado com sucesso!");
  };

  const formatCurrency = (value: number) =>
    value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  // Calcular estatísticas por categoria
  const categoryStats = cardExpenses.reduce((acc, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
    return acc;
  }, {} as Record<string, number>);

  return (
    <DashboardLayout title="Cartões de Crédito" subtitle="Gerencie seus cartões e acompanhe seus gastos">
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger className="w-48">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {months.map((month) => (
                <SelectItem key={month.value} value={month.value}>
                  {month.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex gap-2">
            <AddExpenseModal 
              cards={cards} 
              selectedCardId={selectedCardId}
              onAdd={handleAddExpense} 
            />
            <AddCardModal onAdd={handleAddCard} />
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cards.map((card, index) => (
            <div 
              key={card.id} 
              className="relative group animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <CreditCardItem
                card={card}
                isSelected={card.id === selectedCardId}
                onClick={() => setSelectedCardId(card.id)}
              />
              {/* Card Actions */}
              <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 bg-white/20 hover:bg-white/30 text-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditingCard(card);
                  }}
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 bg-white/20 hover:bg-red-500/80 text-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    setDeleteCardId(card.id);
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Selected Card Details */}
        {selectedCard && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Card Stats */}
            <div className="lg:col-span-1 space-y-4">
              <Card variant="glass">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Wallet className="h-4 w-4 text-primary" />
                    Resumo do Cartão
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Limite Total</span>
                    <span className="font-semibold">{formatCurrency(selectedCard.limit)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Limite Usado</span>
                    <span className="font-semibold text-destructive">{formatCurrency(selectedCard.usedLimit)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Limite Disponível</span>
                    <span className="font-semibold text-success">{formatCurrency(selectedCard.limit - selectedCard.usedLimit)}</span>
                  </div>
                  <div className="border-t border-border pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Fechamento</span>
                      <span>Dia {selectedCard.closingDay}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Vencimento</span>
                      <span>Dia {selectedCard.dueDay}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Gastos por Categoria */}
              <Card variant="glass">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <PieChart className="h-4 w-4 text-warning" />
                    Por Categoria
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {Object.entries(categoryStats).length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      Nenhum gasto registrado
                    </p>
                  ) : (
                    Object.entries(categoryStats)
                      .sort((a, b) => b[1] - a[1])
                      .map(([category, total]) => (
                        <div key={category} className="flex items-center justify-between p-2 rounded-lg bg-muted/30">
                          <span className="text-sm capitalize">{category}</span>
                          <span className="text-sm font-semibold">{formatCurrency(total)}</span>
                        </div>
                      ))
                  )}
                </CardContent>
              </Card>

              {/* Installments Summary */}
              <Card variant="glass">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <TrendingDown className="h-4 w-4 text-warning" />
                    Parcelas Ativas
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {installmentExpenses.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      Nenhuma parcela ativa
                    </p>
                  ) : (
                    installmentExpenses.map((expense) => (
                      <div key={expense.id} className="flex items-center justify-between p-2 rounded-lg bg-muted/30">
                        <div>
                          <p className="text-sm font-medium truncate max-w-32">{expense.description}</p>
                          <Badge variant="outline" className="text-xs mt-1">
                            {expense.currentInstallment}/{expense.totalInstallments}
                          </Badge>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold">{formatCurrency(expense.amount)}</p>
                          <p className="text-xs text-muted-foreground">
                            Restam {(expense.totalInstallments || 0) - (expense.currentInstallment || 0)}x
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Expenses List */}
            <div className="lg:col-span-2">
              <CardExpensesList
                expenses={cardExpenses}
                selectedMonth={months.find((m) => m.value === selectedMonth)?.label || selectedMonth}
              />
            </div>
          </div>
        )}

        {/* Edit Card Modal */}
        <EditCardModal
          card={editingCard}
          open={!!editingCard}
          onOpenChange={(open) => !open && setEditingCard(null)}
          onSave={handleEditCard}
        />

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={!!deleteCardId} onOpenChange={(open) => !open && setDeleteCardId(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Excluir Cartão</AlertDialogTitle>
              <AlertDialogDescription>
                Tem certeza que deseja excluir este cartão? Todos os gastos associados também serão removidos. Esta ação não pode ser desfeita.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteCard} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                Excluir
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </DashboardLayout>
  );
}
