import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import { Investment, InvestmentType, investmentTypeLabels } from "@/types/investment";
import { toast } from "sonner";

interface AddInvestmentModalProps {
  onAdd: (investment: Omit<Investment, "id">) => void;
}

export function AddInvestmentModal({ onAdd }: AddInvestmentModalProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [type, setType] = useState<InvestmentType>("cdb");
  const [ticker, setTicker] = useState("");
  const [institution, setInstitution] = useState("");
  const [investedAmount, setInvestedAmount] = useState("");
  const [currentAmount, setCurrentAmount] = useState("");
  const [returnRate, setReturnRate] = useState("");
  const [maturityDate, setMaturityDate] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");
  const [quantity, setQuantity] = useState("");
  const [notes, setNotes] = useState("");

  const showTicker = ["acoes", "fiis", "cripto"].includes(type);
  const showMaturity = ["cdb", "tesouro_selic", "tesouro_ipca", "tesouro_pre", "lci_lca"].includes(type);
  const showQuantity = ["acoes", "fiis", "cripto"].includes(type);

  const handleSubmit = () => {
    if (!name || !institution || !investedAmount || !purchaseDate) {
      toast.error("Preencha os campos obrigatórios");
      return;
    }
    onAdd({
      name,
      type,
      ticker: ticker || undefined,
      institution,
      investedAmount: parseFloat(investedAmount),
      currentAmount: parseFloat(currentAmount || investedAmount),
      returnRate: returnRate ? parseFloat(returnRate) : undefined,
      maturityDate: maturityDate || undefined,
      purchaseDate,
      quantity: quantity ? parseFloat(quantity) : undefined,
      notes: notes || undefined,
    });
    setOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setName(""); setType("cdb"); setTicker(""); setInstitution("");
    setInvestedAmount(""); setCurrentAmount(""); setReturnRate("");
    setMaturityDate(""); setPurchaseDate(""); setQuantity(""); setNotes("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="rounded-full h-14 w-14 shadow-glow">
          <Plus className="h-6 w-6" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Novo Investimento</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-2">
          <div>
            <Label>Nome *</Label>
            <Input placeholder="Ex: CDB Banco Inter 120%" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <Label>Tipo *</Label>
            <Select value={type} onValueChange={(v) => setType(v as InvestmentType)}>
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
              <Input placeholder="Ex: PETR4, BTC" value={ticker} onChange={(e) => setTicker(e.target.value.toUpperCase())} />
            </div>
          )}
          <div>
            <Label>Instituição *</Label>
            <Input placeholder="Ex: Nubank, XP, Binance" value={institution} onChange={(e) => setInstitution(e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Valor Investido *</Label>
              <Input type="number" placeholder="0,00" value={investedAmount} onChange={(e) => setInvestedAmount(e.target.value)} />
            </div>
            <div>
              <Label>Valor Atual</Label>
              <Input type="number" placeholder="0,00" value={currentAmount} onChange={(e) => setCurrentAmount(e.target.value)} />
            </div>
          </div>
          {showQuantity && (
            <div>
              <Label>Quantidade</Label>
              <Input type="number" placeholder="0" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
            </div>
          )}
          <div>
            <Label>Rentabilidade (% a.a.)</Label>
            <Input type="number" placeholder="Ex: 12.5" value={returnRate} onChange={(e) => setReturnRate(e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Data da Compra *</Label>
              <Input type="date" value={purchaseDate} onChange={(e) => setPurchaseDate(e.target.value)} />
            </div>
            {showMaturity && (
              <div>
                <Label>Vencimento</Label>
                <Input type="date" value={maturityDate} onChange={(e) => setMaturityDate(e.target.value)} />
              </div>
            )}
          </div>
          <div>
            <Label>Observações</Label>
            <Textarea placeholder="Anotações..." value={notes} onChange={(e) => setNotes(e.target.value)} />
          </div>
          <Button onClick={handleSubmit} className="w-full">Adicionar Investimento</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
