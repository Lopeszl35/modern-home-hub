import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Investment, InvestmentType, investmentTypeLabels } from "@/types/investment";
import { toast } from "sonner";

interface EditInvestmentModalProps {
  investment: Investment | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (investment: Investment) => void;
}

export function EditInvestmentModal({ investment, open, onOpenChange, onSave }: EditInvestmentModalProps) {
  const [form, setForm] = useState<Investment | null>(null);

  useEffect(() => {
    if (investment) setForm({ ...investment });
  }, [investment]);

  if (!form) return null;

  const showTicker = ["acoes", "fiis", "cripto"].includes(form.type);
  const showMaturity = ["cdb", "tesouro_selic", "tesouro_ipca", "tesouro_pre", "lci_lca"].includes(form.type);

  const handleSubmit = () => {
    if (!form.name || !form.institution || !form.investedAmount) {
      toast.error("Preencha os campos obrigatórios");
      return;
    }
    onSave(form);
    onOpenChange(false);
    toast.success("Investimento atualizado!");
  };

  const update = (field: keyof Investment, value: any) => setForm({ ...form, [field]: value });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar Investimento</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-2">
          <div>
            <Label>Nome</Label>
            <Input value={form.name} onChange={(e) => update("name", e.target.value)} />
          </div>
          <div>
            <Label>Tipo</Label>
            <Select value={form.type} onValueChange={(v) => update("type", v as InvestmentType)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {Object.entries(investmentTypeLabels).map(([key, label]) => (
                  <SelectItem key={key} value={key}>{label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {showTicker && (
            <div>
              <Label>Ticker</Label>
              <Input value={form.ticker || ""} onChange={(e) => update("ticker", e.target.value.toUpperCase())} />
            </div>
          )}
          <div>
            <Label>Instituição</Label>
            <Input value={form.institution} onChange={(e) => update("institution", e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Valor Investido</Label>
              <Input type="number" value={form.investedAmount} onChange={(e) => update("investedAmount", parseFloat(e.target.value) || 0)} />
            </div>
            <div>
              <Label>Valor Atual</Label>
              <Input type="number" value={form.currentAmount} onChange={(e) => update("currentAmount", parseFloat(e.target.value) || 0)} />
            </div>
          </div>
          <div>
            <Label>Rentabilidade (% a.a.)</Label>
            <Input type="number" value={form.returnRate || ""} onChange={(e) => update("returnRate", parseFloat(e.target.value) || undefined)} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Data da Compra</Label>
              <Input type="date" value={form.purchaseDate} onChange={(e) => update("purchaseDate", e.target.value)} />
            </div>
            {showMaturity && (
              <div>
                <Label>Vencimento</Label>
                <Input type="date" value={form.maturityDate || ""} onChange={(e) => update("maturityDate", e.target.value)} />
              </div>
            )}
          </div>
          <div>
            <Label>Observações</Label>
            <Textarea value={form.notes || ""} onChange={(e) => update("notes", e.target.value)} />
          </div>
          <Button onClick={handleSubmit} className="w-full">Salvar Alterações</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
