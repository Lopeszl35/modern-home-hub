import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface QuickAction {
  id: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
  color?: "primary" | "success" | "warning" | "destructive";
}

interface QuickActionsProps {
  actions: QuickAction[];
  className?: string;
}

const colorStyles = {
  primary: "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground",
  success: "bg-success/10 text-success group-hover:bg-success group-hover:text-success-foreground",
  warning: "bg-warning/10 text-warning group-hover:bg-warning group-hover:text-warning-foreground",
  destructive: "bg-destructive/10 text-destructive group-hover:bg-destructive group-hover:text-destructive-foreground",
};

export function QuickActions({ actions, className }: QuickActionsProps) {
  return (
    <Card variant="elevated" className={cn("animate-fade-in-up", className)} style={{ animationDelay: "200ms" }}>
      <CardHeader className="pb-4">
        <CardTitle>Ações Rápidas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {actions.map((action, index) => (
            <button
              key={action.id}
              onClick={action.onClick}
              className={cn(
                "group flex flex-col items-center gap-3 rounded-xl border border-border/50 bg-muted/30 p-4",
                "transition-all duration-300 hover:border-primary/50 hover:bg-muted/50 hover:shadow-glow",
                "animate-scale-in"
              )}
              style={{ animationDelay: `${250 + index * 50}ms` }}
            >
              <div
                className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-300",
                  colorStyles[action.color || "primary"]
                )}
              >
                {action.icon}
              </div>
              <div className="text-center">
                <p className="font-medium text-sm">{action.label}</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {action.description}
                </p>
              </div>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
