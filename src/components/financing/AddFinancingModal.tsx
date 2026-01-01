import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";
import { Financing } from "@/types/finance";

interface AddFinancingModalProps {
  onAdd: (financing: Omit<Financing, "id">) => void;
}

const financingTypes = [
  { value: "vehicle", label: "Veículo" },
  { value: "property", label: "Imóvel" },
  { value: "personal", label: "Empréstimo Pessoal" },
  { value: "other", label: "Outro" },
];

export function AddFinancingModal({ onAdd }: AddFinancingModalProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    type: "vehicle" as Financing["type"],
    totalAmount: "",
    monthlyPayment: "",
    interestRate: "",
    totalInstallments: "",
    paidInstallments: "",
    startDate: "",
    bank: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const totalInstallments = parseInt(formData.totalInstallments);
    const paidInstallments = parseInt(formData.paidInstallments);
    const monthlyPayment = parseFloat(formData.monthlyPayment);
    const remainingAmount = (totalInstallments - paidInstallments) * monthlyPayment;

    onAdd({
      name: formData.name,
      type: formData.type,
      totalAmount: parseFloat(formData.totalAmount),
      remainingAmount,
      monthlyPayment,
      interestRate: parseFloat(formData.interestRate),
      totalInstallments,
      paidInstallments,
      startDate: formData.startDate,
      bank: formData.bank,
    });
    setOpen(false);
    setFormData({
      name: "",
      type: "vehicle",
      totalAmount: "",
      monthlyPayment: "",
      interestRate: "",
      totalInstallments: "",
      paidInstallments: "",
      startDate: "",
      bank: "",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Novo Financiamento
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Adicionar Financiamento</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                placeholder="Ex: Carro Honda Civic"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Tipo</Label>
              <Select
                value={formData.type}
                onValueChange={(value) => setFormData({ ...formData, type: value as Financing["type"] })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {financingTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="totalAmount">Valor Total</Label>
              <Input
                id="totalAmount"
                type="number"
                step="0.01"
                placeholder="100000.00"
                value={formData.totalAmount}
                onChange={(e) => setFormData({ ...formData, totalAmount: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="monthlyPayment">Parcela Mensal</Label>
              <Input
                id="monthlyPayment"
                type="number"
                step="0.01"
                placeholder="2500.00"
                value={formData.monthlyPayment}
                onChange={(e) => setFormData({ ...formData, monthlyPayment: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="interestRate">Taxa de Juros (%)</Label>
              <Input
                id="interestRate"
                type="number"
                step="0.01"
                placeholder="1.5"
                value={formData.interestRate}
                onChange={(e) => setFormData({ ...formData, interestRate: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="totalInstallments">Total Parcelas</Label>
              <Input
                id="totalInstallments"
                type="number"
                placeholder="48"
                value={formData.totalInstallments}
                onChange={(e) => setFormData({ ...formData, totalInstallments: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="paidInstallments">Parcelas Pagas</Label>
              <Input
                id="paidInstallments"
                type="number"
                placeholder="12"
                value={formData.paidInstallments}
                onChange={(e) => setFormData({ ...formData, paidInstallments: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="bank">Banco/Instituição</Label>
              <Input
                id="bank"
                placeholder="Banco do Brasil"
                value={formData.bank}
                onChange={(e) => setFormData({ ...formData, bank: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="startDate">Data de Início</Label>
              <Input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                required
              />
            </div>
          </div>

          <Button type="submit" className="w-full">
            Adicionar Financiamento
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
