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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUser } from "@/contexts/UserContext";
import { createReceitaPJ } from "@/services/receitasService";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

interface AddReceitaPJModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function AddReceitaPJModal({
  open,
  onOpenChange,
  onSuccess,
}: AddReceitaPJModalProps) {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    tipo: "servico" as const,
    descricao: "",
    cliente: "",
    numero_nf: "",
    valor_bruto: "",
    impostos: "",
    data_emissao: new Date().toISOString().split("T")[0],
    status: "pendente" as const,
  });

  const valorLiquido =
    (parseFloat(formData.valor_bruto) || 0) -
    (parseFloat(formData.impostos) || 0);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user?.id_usuario) return;

    setLoading(true);
    try {
      await createReceitaPJ({
        id_usuario: user.id_usuario,
        tipo: formData.tipo,
        descricao: formData.descricao,
        cliente: formData.cliente,
        numero_nf: formData.numero_nf,
        valor_bruto: parseFloat(formData.valor_bruto) || 0,
        impostos: parseFloat(formData.impostos) || 0,
        valor_liquido: valorLiquido,
        data_emissao: formData.data_emissao,
        status: formData.status,
      });

      toast({
        title: "Receita PJ adicionada!",
        description: "Sua nota fiscal foi registrada com sucesso.",
      });

      onSuccess();
      onOpenChange(false);
      setFormData({
        tipo: "servico",
        descricao: "",
        cliente: "",
        numero_nf: "",
        valor_bruto: "",
        impostos: "",
        data_emissao: new Date().toISOString().split("T")[0],
        status: "pendente",
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
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Nova Receita (Pessoa Jurídica)</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Tipo</Label>
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
                  <SelectItem value="servico">Serviço</SelectItem>
                  <SelectItem value="produto">Produto</SelectItem>
                  <SelectItem value="consultoria">Consultoria</SelectItem>
                  <SelectItem value="licenciamento">Licenciamento</SelectItem>
                  <SelectItem value="outros">Outros</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value: any) =>
                  setFormData({ ...formData, status: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pendente">Pendente</SelectItem>
                  <SelectItem value="recebido">Recebido</SelectItem>
                  <SelectItem value="atrasado">Atrasado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Descrição</Label>
            <Input
              placeholder="Ex: Consultoria de TI - Janeiro"
              value={formData.descricao}
              onChange={(e) =>
                setFormData({ ...formData, descricao: e.target.value })
              }
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Cliente</Label>
              <Input
                placeholder="Nome do cliente"
                value={formData.cliente}
                onChange={(e) =>
                  setFormData({ ...formData, cliente: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Número NF</Label>
              <Input
                placeholder="NF-2024-001"
                value={formData.numero_nf}
                onChange={(e) =>
                  setFormData({ ...formData, numero_nf: e.target.value })
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Valor Bruto (R$)</Label>
              <Input
                type="number"
                step="0.01"
                placeholder="0,00"
                value={formData.valor_bruto}
                onChange={(e) =>
                  setFormData({ ...formData, valor_bruto: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Impostos (R$)</Label>
              <Input
                type="number"
                step="0.01"
                placeholder="0,00"
                value={formData.impostos}
                onChange={(e) =>
                  setFormData({ ...formData, impostos: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Valor Líquido</Label>
              <div className="h-10 px-3 flex items-center rounded-md bg-success/10 text-success font-medium">
                R$ {valorLiquido.toFixed(2)}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Data de Emissão</Label>
            <Input
              type="date"
              value={formData.data_emissao}
              onChange={(e) =>
                setFormData({ ...formData, data_emissao: e.target.value })
              }
              required
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
