import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <DashboardLayout title="Página não encontrada">
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
        <div className="relative">
          <span className="text-[150px] font-bold text-muted/30 select-none">404</span>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="rounded-full bg-primary/10 p-6 animate-pulse-glow">
              <Home className="h-12 w-12 text-primary" />
            </div>
          </div>
        </div>
        
        <div className="space-y-2 max-w-md">
          <h1 className="text-2xl font-bold">Página não encontrada</h1>
          <p className="text-muted-foreground">
            A página que você está procurando não existe ou foi movida.
          </p>
        </div>

        <Button onClick={() => navigate("/")} size="lg">
          Voltar ao Dashboard
        </Button>
      </div>
    </DashboardLayout>
  );
};

export default NotFound;
