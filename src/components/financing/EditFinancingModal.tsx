import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
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
import { Financing } from "@/types/finance";

interface EditFinancingModalProps {
  financing: Financing | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (financing: Financing) => void;
}

const types = [
  { value: "vehicle", label: "Veículo" },
  { value: "property", label: "Imóvel" },
  { value: "personal", label: "Pessoal" },
  { value: "other", label: "Outro" },
];

export function EditFinancingModal({ financing, open, onOpenChange, onSave }: EditFinancingModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    type: "vehicle" as Financing["type"],
    totalAmount: "",
    remainingAmount: "",
    monthlyPayment: "",
    interestRate: "",
    totalInstallments: "",
    paidInstallments: "",
    startDate: "",
    bank: "",
  });

  useEffect(() => {
    if (financing) {
      setFormData({
        name: financing.name,
        type: financing.type,
        totalAmount: financing.totalAmount.toString(),
        remainingAmount: financing.remainingAmount.toString(),
        monthlyPayment: financing.monthlyPayment.toString(),
        interestRate: financing.interestRate.toString(),
        totalInstallments: financing.totalInstallments.toString(),
        paidInstallments: financing.paidInstallments.toString(),
        startDate: financing.startDate,
        bank: financing.bank,
      });
    }
  }, [financing]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!financing) return;

    onSave({
      ...financing,
      name: formData.name,
      type: formData.type,
      totalAmount: parseFloat(formData.totalAmount),
      remainingAmount: parseFloat(formData.remainingAmount),
      monthlyPayment: parseFloat(formData.monthlyPayment),
      interestRate: parseFloat(formData.interestRate),
      totalInstallments: parseInt(formData.totalInstallments),
      paidInstallments: parseInt(formData.paidInstallments),
      startDate: formData.startDate,
      bank: formData.bank,
    });
    onOpenChange(false);
  };

  if (!financing) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Editar Financiamento</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                placeholder="Ex: Honda Civic 2023"
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
                  {types.map((t) => (
                    <SelectItem key={t.value} value={t.value}>
                      {t.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="bank">Banco/Instituição</Label>
              <Input
                id="bank"
                placeholder="Ex: Banco Honda"
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

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="totalAmount">Valor Total Financiado</Label>
              <Input
                id="totalAmount"
                type="number"
                step="0.01"
                placeholder="120000"
                value={formData.totalAmount}
                onChange={(e) => setFormData({ ...formData, totalAmount: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="remainingAmount">Saldo Devedor Atual</Label>
              <Input
                id="remainingAmount"
                type="number"
                step="0.01"
                placeholder="78000"
                value={formData.remainingAmount}
                onChange={(e) => setFormData({ ...formData, remainingAmount: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="monthlyPayment">Parcela Mensal</Label>
              <Input
                id="monthlyPayment"
                type="number"
                step="0.01"
                placeholder="2850"
                value={formData.monthlyPayment}
                onChange={(e) => setFormData({ ...formData, monthlyPayment: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="interestRate">Taxa de Juros (% a.m.)</Label>
              <Input
                id="interestRate"
                type="number"
                step="0.01"
                placeholder="1.29"
                value={formData.interestRate}
                onChange={(e) => setFormData({ ...formData, interestRate: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="totalInstallments">Total de Parcelas</Label>
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
                placeholder="15"
                value={formData.paidInstallments}
                onChange={(e) => setFormData({ ...formData, paidInstallments: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="flex gap-2">
            <Button type="button" variant="outline" className="flex-1" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" className="flex-1">
              Salvar Alterações
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
