import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Construction, Hammer, Wrench, HardHat } from "lucide-react";

interface UnderConstructionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  featureName: string;
}

export function UnderConstructionModal({
  open,
  onOpenChange,
  featureName,
}: UnderConstructionModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-warning/20 animate-pulse-glow">
            <Construction className="h-10 w-10 text-warning animate-float" />
          </div>
          <DialogTitle className="text-xl text-center">
            {featureName}
          </DialogTitle>
          <DialogDescription className="text-center pt-2">
            <span className="block text-lg font-medium text-foreground mb-2">
              🚧 Em Construção 🚧
            </span>
            <span className="block text-muted-foreground">
              Estamos trabalhando duro para trazer essa funcionalidade para você!
              Em breve estará disponível.
            </span>
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-center gap-4 py-4">
          <div className="flex flex-col items-center gap-1 text-muted-foreground">
            <div className="p-2 rounded-lg bg-muted/50">
              <Hammer className="h-5 w-5" />
            </div>
            <span className="text-xs">Planejando</span>
          </div>
          <div className="flex flex-col items-center gap-1 text-warning">
            <div className="p-2 rounded-lg bg-warning/20">
              <Wrench className="h-5 w-5" />
            </div>
            <span className="text-xs">Construindo</span>
          </div>
          <div className="flex flex-col items-center gap-1 text-muted-foreground">
            <div className="p-2 rounded-lg bg-muted/50">
              <HardHat className="h-5 w-5" />
            </div>
            <span className="text-xs">Em breve</span>
          </div>
        </div>

        <div className="flex justify-center">
          <Button
            onClick={() => onOpenChange(false)}
            className="gradient-primary text-primary-foreground"
          >
            Entendi, aguardo ansioso!
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
