import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Categoria } from "@/types/categoria";

type FormaPagamento = 'PIX' | 'DINHEIRO' | 'DEBITO' | 'CREDITO';

interface AddGastoModalProps {
  categoria: Categoria | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (gasto: {
    idCategoria: number;
    dataGasto: string;
    valor: number;
    descricao: string;
    formaPagamento: FormaPagamento;
    idCartao?: number | null;
  }) => Promise<void>;
}

export function AddGastoModal({ 
  categoria, 
  open, 
  onOpenChange, 
  onSave 
}: AddGastoModalProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    valor: "",
    descricao: "",
    dataGasto: new Date().toISOString().split('T')[0],
    formaPagamento: "PIX" as FormaPagamento,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!categoria || !formData.valor || !formData.descricao.trim()) return;

    try {
      setLoading(true);
      await onSave({
        idCategoria: categoria.id_categoria,
        dataGasto: formData.dataGasto,
        valor: Number(formData.valor),
        descricao: formData.descricao.trim(),
        formaPagamento: formData.formaPagamento,
      });
      setFormData({
        valor: "",
        descricao: "",
        dataGasto: new Date().toISOString().split('T')[0],
        formaPagamento: "PIX",
      });
      onOpenChange(false);
    } catch {
      // Error handled by hook
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Adicionar Gasto</DialogTitle>
          <DialogDescription>
            Registre um novo gasto em <strong>{categoria?.nome}</strong>
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="gasto-valor">Valor (R$)</Label>
            <Input
              id="gasto-valor"
              type="number"
              min="0.01"
              step="0.01"
              placeholder="0,00"
              value={formData.valor}
              onChange={(e) => setFormData(prev => ({ ...prev, valor: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="gasto-descricao">Descrição</Label>
            <Textarea
              id="gasto-descricao"
              placeholder="Descreva o gasto..."
              value={formData.descricao}
              onChange={(e) => setFormData(prev => ({ ...prev, descricao: e.target.value }))}
              required
              rows={2}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="gasto-data">Data</Label>
              <Input
                id="gasto-data"
                type="date"
                value={formData.dataGasto}
                onChange={(e) => setFormData(prev => ({ ...prev, dataGasto: e.target.value }))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Forma de Pagamento</Label>
              <Select
                value={formData.formaPagamento}
                onValueChange={(value: FormaPagamento) => 
                  setFormData(prev => ({ ...prev, formaPagamento: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PIX">PIX</SelectItem>
                  <SelectItem value="DINHEIRO">Dinheiro</SelectItem>
                  <SelectItem value="DEBITO">Débito</SelectItem>
                  <SelectItem value="CREDITO">Crédito</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancelar
            </Button>
            <Button 
              type="submit" 
              className="gradient-primary"
              disabled={loading || !formData.valor || !formData.descricao.trim()}
            >
              {loading ? "Adicionando..." : "Adicionar Gasto"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
