import { NavLink } from "@/components/NavLink";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Wallet,
  TrendingUp,
  PieChart,
  Target,
  Settings,
  HelpCircle,
  X,
  Bot,
  User,
  LogOut,
  BarChart3,
  Newspaper,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUser } from "@/contexts/UserContext";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const mainNavItems = [
  { to: "/", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/credit-cards", icon: Wallet, label: "Cartões de Crédito" },
  { to: "/receitas", icon: TrendingUp, label: "Receitas" },
  { to: "/gastos-variaveis", icon: TrendingUp, label: "Gastos Variáveis" },
  { to: "/fixed-expenses", icon: Target, label: "Gastos Fixos" },
  { to: "/financings", icon: TrendingUp, label: "Financiamentos" },
  { to: "/investments", icon: BarChart3, label: "Investimentos" },
  { to: "/market-news", icon: Newspaper, label: "Mercado" },
  { to: "/assistente-ia", icon: Bot, label: "Assistente IA" },
  { to: "/reports", icon: PieChart, label: "Relatórios" },
];

const secondaryNavItems = [
  { to: "/profile", icon: User, label: "Meu Perfil" },
  { to: "/settings", icon: Settings, label: "Configurações" },
  { to: "/help", icon: HelpCircle, label: "Ajuda" },
];

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate("/login");
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 flex h-full w-72 flex-col border-r border-border bg-sidebar transition-transform duration-300 lg:static lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-sidebar-border px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-primary shadow-glow">
              <Wallet className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h2 className="font-bold text-lg">FinanceApp</h2>
              <p className="text-xs text-muted-foreground">Gestão Inteligente</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="lg:hidden"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto p-4">
          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Menu Principal
          </p>
          {mainNavItems.map((item, index) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={cn(
                "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground transition-all duration-200 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                "animate-slide-in-left"
              )}
              activeClassName="bg-sidebar-accent text-sidebar-primary shadow-glow"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Secondary Navigation */}
        <div className="border-t border-sidebar-border p-4">
          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Suporte
          </p>
          {secondaryNavItems.map((item, index) => (
            <NavLink
              key={item.to}
              to={item.to}
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground transition-all duration-200 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              activeClassName="bg-sidebar-accent text-sidebar-primary"
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </NavLink>
          ))}
        </div>

        {/* User Profile */}
        <div className="border-t border-sidebar-border p-4 space-y-3">
          <div 
            className="flex items-center gap-3 rounded-xl bg-sidebar-accent/50 p-3 cursor-pointer hover:bg-sidebar-accent transition-colors"
            onClick={() => navigate("/profile")}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-primary font-bold">
              {user ? getInitials(user.nome) : "U"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">{user?.nome || "Usuário"}</p>
              <p className="text-xs text-muted-foreground truncate">
                {user?.email || "usuario@email.com"}
              </p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            className="w-full justify-start gap-2 text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
            Sair
          </Button>
        </div>
      </aside>
    </>
  );
}
