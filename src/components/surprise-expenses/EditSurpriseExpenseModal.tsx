import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SurpriseExpense, surpriseExpenseCategories } from "@/types/surprise-expense";
import { Car, Heart, Home, Tv, PawPrint, HelpCircle } from "lucide-react";

const categoryIcons = {
  car: Car,
  health: Heart,
  home: Home,
  appliance: Tv,
  pet: PawPrint,
  other: HelpCircle,
};

interface EditSurpriseExpenseModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  expense: SurpriseExpense;
  onUpdate: (expense: SurpriseExpense) => void;
}

export const EditSurpriseExpenseModal = ({
  open,
  onOpenChange,
  expense,
  onUpdate,
}: EditSurpriseExpenseModalProps) => {
  const [description, setDescription] = useState(expense.description);
  const [category, setCategory] = useState(expense.category);
  const [amount, setAmount] = useState(expense.amount.toString());
  const [date, setDate] = useState(expense.date);
  const [notes, setNotes] = useState(expense.notes || "");

  useEffect(() => {
    setDescription(expense.description);
    setCategory(expense.category);
    setAmount(expense.amount.toString());
    setDate(expense.date);
    setNotes(expense.notes || "");
  }, [expense]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    onUpdate({
      ...expense,
      description: description.trim(),
      category,
      amount: parseFloat(amount),
      date,
      notes: notes.trim() || undefined,
    });

    onOpenChange(false);
  };

  const isValid = description && amount && parseFloat(amount) > 0 && date;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Editar Gasto Surpresa</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Categoria</Label>
            <Select value={category} onValueChange={(value) => setCategory(value as SurpriseExpense["category"])}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(surpriseExpenseCategories).map(([key, { label }]) => {
                  const Icon = categoryIcons[key as keyof typeof categoryIcons];
                  return (
                    <SelectItem key={key} value={key}>
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4" />
                        {label}
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Valor (R$)</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                min="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Data</Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Observações (opcional)</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Cancelar
            </Button>
            <Button type="submit" disabled={!isValid} className="flex-1">
              Salvar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
