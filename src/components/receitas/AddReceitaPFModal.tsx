import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUser } from "@/contexts/UserContext";
import { createReceitaPF } from "@/services/receitasService";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

interface AddReceitaPFModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function AddReceitaPFModal({
  open,
  onOpenChange,
  onSuccess,
}: AddReceitaPFModalProps) {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    tipo: "salario" as const,
    descricao: "",
    valor: "",
    data: new Date().toISOString().split("T")[0],
    recorrente: false,
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user?.id_usuario) return;

    setLoading(true);
    try {
      await createReceitaPF({
        id_usuario: user.id_usuario,
        tipo: formData.tipo,
        descricao: formData.descricao,
        valor: parseFloat(formData.valor) || 0,
        data: formData.data,
        recorrente: formData.recorrente,
      });

      toast({
        title: "Receita adicionada!",
        description: "Sua receita foi registrada com sucesso.",
      });

      onSuccess();
      onOpenChange(false);
      setFormData({
        tipo: "salario",
        descricao: "",
        valor: "",
        data: new Date().toISOString().split("T")[0],
        recorrente: false,
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível adicionar a receita.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Nova Receita (Pessoa Física)</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Tipo de Receita</Label>
            <Select
              value={formData.tipo}
              onValueChange={(value: any) =>
                setFormData({ ...formData, tipo: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="salario">Salário</SelectItem>
                <SelectItem value="pix">PIX Recebido</SelectItem>
                <SelectItem value="venda">Venda</SelectItem>
                <SelectItem value="freelance">Freelance</SelectItem>
                <SelectItem value="outros">Outros</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Descrição</Label>
            <Input
              placeholder="Ex: Salário mensal"
              value={formData.descricao}
              onChange={(e) =>
                setFormData({ ...formData, descricao: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Valor (R$)</Label>
            <Input
              type="number"
              step="0.01"
              placeholder="0,00"
              value={formData.valor}
              onChange={(e) =>
                setFormData({ ...formData, valor: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Data</Label>
            <Input
              type="date"
              value={formData.data}
              onChange={(e) =>
                setFormData({ ...formData, data: e.target.value })
              }
              required
            />
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
            <div>
              <Label className="text-sm font-medium">Receita Recorrente</Label>
              <p className="text-xs text-muted-foreground">
                Se repete mensalmente
              </p>
            </div>
            <Switch
              checked={formData.recorrente}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, recorrente: checked })
              }
            />
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="flex-1 gradient-primary text-primary-foreground"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Adicionar"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
