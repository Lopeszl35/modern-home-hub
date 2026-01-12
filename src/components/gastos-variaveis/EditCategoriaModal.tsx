import { useEffect, useState } from "react";
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
} from "@/components/ui/dialog";
import type { Categoria, CategoriaUpdate } from "@/types/categoria";

interface EditCategoriaModalProps {
  categoria: Categoria | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (idCategoria: number, data: CategoriaUpdate) => Promise<void>;
}

export function EditCategoriaModal({ 
  categoria, 
  open, 
  onOpenChange, 
  onSave 
}: EditCategoriaModalProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    limite: "",
  });

  useEffect(() => {
    if (categoria) {
      setFormData({
        nome: categoria.nome,
        limite: String(categoria.limite || ""),
      });
    }
  }, [categoria]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!categoria || !formData.nome.trim() || !formData.limite) return;

    try {
      setLoading(true);
      await onSave(categoria.id_categoria, {
        nome: formData.nome.trim(),
        limite: Number(formData.limite),
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
          <DialogTitle>Editar Categoria</DialogTitle>
          <DialogDescription>
            Atualize as informações da categoria.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="edit-nome">Nome da Categoria</Label>
            <Input
              id="edit-nome"
              placeholder="Ex: Alimentação, Transporte..."
              value={formData.nome}
              onChange={(e) => setFormData(prev => ({ ...prev, nome: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-limite">Limite Mensal (R$)</Label>
            <Input
              id="edit-limite"
              type="number"
              min="0"
              step="0.01"
              placeholder="0,00"
              value={formData.limite}
              onChange={(e) => setFormData(prev => ({ ...prev, limite: e.target.value }))}
              required
            />
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
              disabled={loading || !formData.nome.trim() || !formData.limite}
            >
              {loading ? "Salvando..." : "Salvar Alterações"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
