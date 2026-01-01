import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";
import { CreditCard } from "@/types/finance";

interface AddCardModalProps {
  onAdd: (card: Omit<CreditCard, "id">) => void;
}

const cardColors = [
  { name: "Azul", value: "#1e40af" },
  { name: "Roxo", value: "#7c3aed" },
  { name: "Verde", value: "#059669" },
  { name: "Vermelho", value: "#dc2626" },
  { name: "Laranja", value: "#ea580c" },
  { name: "Rosa", value: "#db2777" },
  { name: "Cinza", value: "#475569" },
];

export function AddCardModal({ onAdd }: AddCardModalProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    lastDigits: "",
    brand: "visa" as CreditCard["brand"],
    limit: "",
    dueDay: "",
    closingDay: "",
    color: cardColors[0].value,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      name: formData.name,
      lastDigits: formData.lastDigits,
      brand: formData.brand,
      limit: parseFloat(formData.limit),
      usedLimit: 0,
      dueDay: parseInt(formData.dueDay),
      closingDay: parseInt(formData.closingDay),
      color: formData.color,
    });
    setOpen(false);
    setFormData({
      name: "",
      lastDigits: "",
      brand: "visa",
      limit: "",
      dueDay: "",
      closingDay: "",
      color: cardColors[0].value,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Novo Cartão
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Adicionar Novo Cartão</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome do Cartão</Label>
            <Input
              id="name"
              placeholder="Ex: Nubank, Itaú..."
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="lastDigits">Últimos 4 dígitos</Label>
              <Input
                id="lastDigits"
                placeholder="0000"
                maxLength={4}
                value={formData.lastDigits}
                onChange={(e) => setFormData({ ...formData, lastDigits: e.target.value.replace(/\D/g, "") })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="brand">Bandeira</Label>
              <Select
                value={formData.brand}
                onValueChange={(value) => setFormData({ ...formData, brand: value as CreditCard["brand"] })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="visa">Visa</SelectItem>
                  <SelectItem value="mastercard">Mastercard</SelectItem>
                  <SelectItem value="elo">Elo</SelectItem>
                  <SelectItem value="amex">American Express</SelectItem>
                  <SelectItem value="other">Outro</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="limit">Limite Total</Label>
            <Input
              id="limit"
              type="number"
              placeholder="5000"
              value={formData.limit}
              onChange={(e) => setFormData({ ...formData, limit: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="closingDay">Dia do Fechamento</Label>
              <Input
                id="closingDay"
                type="number"
                min="1"
                max="31"
                placeholder="15"
                value={formData.closingDay}
                onChange={(e) => setFormData({ ...formData, closingDay: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dueDay">Dia do Vencimento</Label>
              <Input
                id="dueDay"
                type="number"
                min="1"
                max="31"
                placeholder="25"
                value={formData.dueDay}
                onChange={(e) => setFormData({ ...formData, dueDay: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Cor do Cartão</Label>
            <div className="flex gap-2 flex-wrap">
              {cardColors.map((color) => (
                <button
                  key={color.value}
                  type="button"
                  onClick={() => setFormData({ ...formData, color: color.value })}
                  className={`w-8 h-8 rounded-full transition-all ${
                    formData.color === color.value ? "ring-2 ring-primary ring-offset-2 ring-offset-background scale-110" : ""
                  }`}
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          <Button type="submit" className="w-full">
            Adicionar Cartão
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
