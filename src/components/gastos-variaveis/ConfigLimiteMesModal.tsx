import { useState } from "react";
import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ConfigLimiteMesModalProps {
  limiteAtual?: number;
  onSave: (config: { limiteGastoMes: number; mes: number; ano: number }) => Promise<void>;
}

export function ConfigLimiteMesModal({ limiteAtual, onSave }: ConfigLimiteMesModalProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [limite, setLimite] = useState(String(limiteAtual || ""));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!limite) return;

    try {
      setLoading(true);
      await onSave({
        limiteGastoMes: Number(limite),
        mes: new Date().getMonth() + 1,
        ano: new Date().getFullYear(),
      });
      setOpen(false);
    } catch {
      // Error handled by hook
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
          <Settings className="h-5 w-5" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Configurar Limite do Mês</DialogTitle>
          <DialogDescription>
            Defina o limite total de gastos variáveis para este mês.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="limite-mes">Limite Mensal (R$)</Label>
            <Input
              id="limite-mes"
              type="number"
              min="0"
              step="0.01"
              placeholder="0,00"
              value={limite}
              onChange={(e) => setLimite(e.target.value)}
              required
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              Cancelar
            </Button>
            <Button 
              type="submit" 
              className="gradient-primary"
              disabled={loading || !limite}
            >
              {loading ? "Salvando..." : "Salvar Limite"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
