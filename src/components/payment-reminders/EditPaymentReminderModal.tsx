import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { PaymentReminder } from "@/types/payment-reminder";
import { QrCode, Banknote } from "lucide-react";

interface EditPaymentReminderModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reminder: PaymentReminder;
  onUpdate: (reminder: PaymentReminder) => void;
}

export const EditPaymentReminderModal = ({
  open,
  onOpenChange,
  reminder,
  onUpdate,
}: EditPaymentReminderModalProps) => {
  const [description, setDescription] = useState(reminder.description);
  const [vendorName, setVendorName] = useState(reminder.vendorName);
  const [amount, setAmount] = useState(reminder.amount.toString());
  const [purchaseDate, setPurchaseDate] = useState(reminder.purchaseDate);
  const [dueDate, setDueDate] = useState(reminder.dueDate);
  const [paymentMethod, setPaymentMethod] = useState(reminder.paymentMethod);
  const [notes, setNotes] = useState(reminder.notes || "");

  useEffect(() => {
    setDescription(reminder.description);
    setVendorName(reminder.vendorName);
    setAmount(reminder.amount.toString());
    setPurchaseDate(reminder.purchaseDate);
    setDueDate(reminder.dueDate);
    setPaymentMethod(reminder.paymentMethod);
    setNotes(reminder.notes || "");
  }, [reminder]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    onUpdate({
      ...reminder,
      description: description.trim(),
      vendorName: vendorName.trim(),
      amount: parseFloat(amount),
      purchaseDate,
      dueDate,
      paymentMethod,
      notes: notes.trim() || undefined,
    });

    onOpenChange(false);
  };

  const isValid = description && vendorName && amount && parseFloat(amount) > 0 && dueDate;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Editar Lembrete</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="description">O que comprou?</Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="vendorName">Nome do vendedor</Label>
            <Input
              id="vendorName"
              value={vendorName}
              onChange={(e) => setVendorName(e.target.value)}
            />
          </div>

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

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="purchaseDate">Data da compra</Label>
              <Input
                id="purchaseDate"
                type="date"
                value={purchaseDate}
                onChange={(e) => setPurchaseDate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dueDate">Data do pagamento</Label>
              <Input
                id="dueDate"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Forma de pagamento</Label>
            <RadioGroup
              value={paymentMethod}
              onValueChange={(value) => setPaymentMethod(value as "pix" | "dinheiro")}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="pix" id="edit-pix" />
                <Label htmlFor="edit-pix" className="flex items-center gap-2 cursor-pointer">
                  <QrCode className="h-4 w-4" />
                  PIX
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="dinheiro" id="edit-dinheiro" />
                <Label htmlFor="edit-dinheiro" className="flex items-center gap-2 cursor-pointer">
                  <Banknote className="h-4 w-4" />
                  Dinheiro
                </Label>
              </div>
            </RadioGroup>
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
