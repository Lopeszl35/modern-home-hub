import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Plus, ShoppingBag, Utensils, Car, Plane, Gamepad2, Heart, GraduationCap, MoreHorizontal } from "lucide-react";
import { CardExpense, CreditCard } from "@/types/finance";

interface AddExpenseModalProps {
  cards: CreditCard[];
  selectedCardId: string | null;
  onAdd: (expense: Omit<CardExpense, "id">) => void;
}

const categories = [
  { value: "shopping", label: "Compras", icon: ShoppingBag },
  { value: "food", label: "Alimentação", icon: Utensils },
  { value: "transport", label: "Transporte", icon: Car },
  { value: "travel", label: "Viagem", icon: Plane },
  { value: "entertainment", label: "Entretenimento", icon: Gamepad2 },
  { value: "health", label: "Saúde", icon: Heart },
  { value: "education", label: "Educação", icon: GraduationCap },
  { value: "other", label: "Outros", icon: MoreHorizontal },
];

export function AddExpenseModal({ cards, selectedCardId, onAdd }: AddExpenseModalProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    cardId: selectedCardId || "",
    description: "",
    amount: "",
    date: new Date().toISOString().split("T")[0],
    category: "shopping",
    isInstallment: false,
    totalInstallments: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const amount = parseFloat(formData.amount);
    const installmentAmount = formData.isInstallment && formData.totalInstallments 
      ? amount / parseInt(formData.totalInstallments) 
      : amount;

    onAdd({
      cardId: formData.cardId,
      description: formData.description,
      amount: installmentAmount,
      date: formData.date,
      category: formData.category,
      isInstallment: formData.isInstallment,
      currentInstallment: formData.isInstallment ? 1 : undefined,
      totalInstallments: formData.isInstallment ? parseInt(formData.totalInstallments) : undefined,
    });
    
    setOpen(false);
    setFormData({
      cardId: selectedCardId || "",
      description: "",
      amount: "",
      date: new Date().toISOString().split("T")[0],
      category: "shopping",
      isInstallment: false,
      totalInstallments: "",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Plus className="h-4 w-4" />
          Novo Gasto
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Adicionar Novo Gasto</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="card">Cartão</Label>
            <Select
              value={formData.cardId}
              onValueChange={(value) => setFormData({ ...formData, cardId: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione um cartão" />
              </SelectTrigger>
              <SelectContent>
                {cards.map((card) => (
                  <SelectItem key={card.id} value={card.id}>
                    {card.name} •••• {card.lastDigits}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Input
              id="description"
              placeholder="Ex: Amazon - iPhone Case"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Valor Total</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                placeholder="99.90"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Data</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Categoria</Label>
            <Select
              value={formData.category}
              onValueChange={(value) => setFormData({ ...formData, category: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    <div className="flex items-center gap-2">
                      <cat.icon className="h-4 w-4" />
                      {cat.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl bg-muted/30">
            <div className="flex flex-col">
              <Label htmlFor="isInstallment" className="font-medium">Parcelado</Label>
              <span className="text-sm text-muted-foreground">Dividir em parcelas</span>
            </div>
            <Switch
              id="isInstallment"
              checked={formData.isInstallment}
              onCheckedChange={(checked) => setFormData({ ...formData, isInstallment: checked })}
            />
          </div>

          {formData.isInstallment && (
            <div className="space-y-2 animate-fade-in">
              <Label htmlFor="totalInstallments">Número de Parcelas</Label>
              <Input
                id="totalInstallments"
                type="number"
                min="2"
                max="48"
                placeholder="12"
                value={formData.totalInstallments}
                onChange={(e) => setFormData({ ...formData, totalInstallments: e.target.value })}
                required
              />
              {formData.amount && formData.totalInstallments && (
                <p className="text-sm text-muted-foreground">
                  {parseInt(formData.totalInstallments)}x de{" "}
                  <span className="font-semibold text-primary">
                    R$ {(parseFloat(formData.amount) / parseInt(formData.totalInstallments)).toFixed(2)}
                  </span>
                </p>
              )}
            </div>
          )}

          <Button type="submit" className="w-full">
            Adicionar Gasto
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
