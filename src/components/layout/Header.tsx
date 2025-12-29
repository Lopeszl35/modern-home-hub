import { Button } from "@/components/ui/button";
import { Bell, Search, Menu } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeaderProps {
  title: string;
  subtitle?: string;
  onMenuClick?: () => void;
  showSearch?: boolean;
  className?: string;
}

export function Header({
  title,
  subtitle,
  onMenuClick,
  showSearch = true,
  className,
}: HeaderProps) {
  return (
    <header
      className={cn(
        "flex items-center justify-between border-b border-border/50 bg-background/80 backdrop-blur-xl px-6 py-4 sticky top-0 z-40",
        className
      )}
    >
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuClick}
          className="lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </Button>
        <div className="animate-fade-in">
          <h1 className="text-xl font-bold">{title}</h1>
          {subtitle && (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        {showSearch && (
          <div className="relative hidden md:block animate-fade-in" style={{ animationDelay: "100ms" }}>
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar..."
              className="h-10 w-64 rounded-lg border border-border bg-muted/50 pl-10 pr-4 text-sm placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
        )}
        
        <Button variant="ghost" size="icon" className="relative animate-fade-in" style={{ animationDelay: "150ms" }}>
          <Bell className="h-5 w-5" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-destructive animate-pulse" />
        </Button>
      </div>
    </header>
  );
}
