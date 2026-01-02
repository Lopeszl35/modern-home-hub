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
import { Calendar, TrendingDown, Wallet, Edit2, Trash2, PieChart, ChevronLeft } from "lucide-react";
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
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
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
        setSelectedCardId(null);
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
    
    setCards(cards.map((c) => 
      c.id === expenseData.cardId 
        ? { ...c, usedLimit: c.usedLimit + expenseData.amount }
        : c
    ));
    toast.success("Gasto adicionado com sucesso!");
  };

  const formatCurrency = (value: number) =>
    value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  const categoryStats = cardExpenses.reduce((acc, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
    return acc;
  }, {} as Record<string, number>);

  // Mobile: Detail View
  if (selectedCard) {
    return (
      <DashboardLayout title={selectedCard.name} subtitle="Detalhes do cartão">
        <div className="space-y-4 pb-24">
          {/* Back Button */}
          <Button
            variant="ghost"
            size="sm"
            className="gap-2 -ml-2"
            onClick={() => setSelectedCardId(null)}
          >
            <ChevronLeft className="h-4 w-4" />
            Voltar
          </Button>

          {/* Card Preview */}
          <div className="relative">
            <CreditCardItem
              card={selectedCard}
              isSelected={true}
              onClick={() => {}}
            />
            <div className="absolute top-3 right-3 flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 bg-white/20 hover:bg-white/30 text-white"
                onClick={() => setEditingCard(selectedCard)}
              >
                <Edit2 className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 bg-white/20 hover:bg-red-500/80 text-white"
                onClick={() => setDeleteCardId(selectedCard.id)}
              >
                <Trash2 className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Month Selector */}
          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger className="w-full h-12">
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

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3">
            <Card variant="glass">
              <CardContent className="p-4">
                <p className="text-xs text-muted-foreground">Limite Usado</p>
                <p className="text-lg font-bold text-destructive">{formatCurrency(selectedCard.usedLimit)}</p>
              </CardContent>
            </Card>
            <Card variant="glass">
              <CardContent className="p-4">
                <p className="text-xs text-muted-foreground">Disponível</p>
                <p className="text-lg font-bold text-success">{formatCurrency(selectedCard.limit - selectedCard.usedLimit)}</p>
              </CardContent>
            </Card>
          </div>

          {/* Card Summary */}
          <Card variant="glass">
            <CardHeader className="pb-2 px-4 pt-4">
              <CardTitle className="text-sm flex items-center gap-2">
                <Wallet className="h-4 w-4 text-primary" />
                Resumo
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Limite Total</span>
                <span className="font-semibold">{formatCurrency(selectedCard.limit)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Fechamento</span>
                <span className="font-medium">Dia {selectedCard.closingDay}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Vencimento</span>
                <span className="font-medium">Dia {selectedCard.dueDay}</span>
              </div>
            </CardContent>
          </Card>

          {/* Category Stats */}
          {Object.keys(categoryStats).length > 0 && (
            <Card variant="glass">
              <CardHeader className="pb-2 px-4 pt-4">
                <CardTitle className="text-sm flex items-center gap-2">
                  <PieChart className="h-4 w-4 text-warning" />
                  Por Categoria
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-4 space-y-2">
                {Object.entries(categoryStats)
                  .sort((a, b) => b[1] - a[1])
                  .map(([category, total]) => (
                    <div key={category} className="flex items-center justify-between p-3 rounded-xl bg-muted/30">
                      <span className="text-sm capitalize">{category}</span>
                      <span className="text-sm font-semibold">{formatCurrency(total)}</span>
                    </div>
                  ))}
              </CardContent>
            </Card>
          )}

          {/* Installments */}
          {installmentExpenses.length > 0 && (
            <Card variant="glass">
              <CardHeader className="pb-2 px-4 pt-4">
                <CardTitle className="text-sm flex items-center gap-2">
                  <TrendingDown className="h-4 w-4 text-warning" />
                  Parcelas Ativas
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-4 space-y-2">
                {installmentExpenses.map((expense) => (
                  <div key={expense.id} className="flex items-center justify-between p-3 rounded-xl bg-muted/30">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{expense.description}</p>
                      <Badge variant="outline" className="text-xs mt-1">
                        {expense.currentInstallment}/{expense.totalInstallments}
                      </Badge>
                    </div>
                    <div className="text-right ml-3">
                      <p className="text-sm font-semibold">{formatCurrency(expense.amount)}</p>
                      <p className="text-xs text-muted-foreground">
                        Restam {(expense.totalInstallments || 0) - (expense.currentInstallment || 0)}x
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Expenses List */}
          <CardExpensesList
            expenses={cardExpenses}
            selectedMonth={months.find((m) => m.value === selectedMonth)?.label || selectedMonth}
          />

          {/* Floating Add Button */}
          <div className="fixed bottom-6 right-6 z-50">
            <AddExpenseModal 
              cards={cards} 
              selectedCardId={selectedCardId}
              onAdd={handleAddExpense} 
            />
          </div>
        </div>

        {/* Modals */}
        <EditCardModal
          card={editingCard}
          open={!!editingCard}
          onOpenChange={(open) => !open && setEditingCard(null)}
          onSave={handleEditCard}
        />

        <AlertDialog open={!!deleteCardId} onOpenChange={(open) => !open && setDeleteCardId(null)}>
          <AlertDialogContent className="mx-4 max-w-sm">
            <AlertDialogHeader>
              <AlertDialogTitle>Excluir Cartão</AlertDialogTitle>
              <AlertDialogDescription>
                Tem certeza que deseja excluir este cartão? Todos os gastos associados também serão removidos.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex-col gap-2 sm:flex-row">
              <AlertDialogCancel className="w-full sm:w-auto">Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteCard} className="w-full sm:w-auto bg-destructive text-destructive-foreground hover:bg-destructive/90">
                Excluir
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DashboardLayout>
    );
  }

  // Mobile: Card List View
  return (
    <DashboardLayout title="Cartões de Crédito" subtitle="Gerencie seus cartões">
      <div className="space-y-4 pb-24">
        {/* Header Stats */}
        <div className="grid grid-cols-2 gap-3">
          <Card variant="gradient">
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">Total Limite</p>
              <p className="text-lg font-bold">{formatCurrency(cards.reduce((acc, c) => acc + c.limit, 0))}</p>
            </CardContent>
          </Card>
          <Card variant="glass">
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">Total Usado</p>
              <p className="text-lg font-bold text-destructive">{formatCurrency(cards.reduce((acc, c) => acc + c.usedLimit, 0))}</p>
            </CardContent>
          </Card>
        </div>

        {/* Cards List */}
        <div className="space-y-4">
          <h2 className="text-base font-semibold">Seus Cartões</h2>
          {cards.map((card, index) => (
            <div 
              key={card.id} 
              className="animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <CreditCardItem
                card={card}
                isSelected={false}
                onClick={() => setSelectedCardId(card.id)}
              />
            </div>
          ))}
        </div>

        {/* Floating Add Button */}
        <div className="fixed bottom-6 right-6 z-50">
          <AddCardModal onAdd={handleAddCard} />
        </div>
      </div>
    </DashboardLayout>
  );
}
