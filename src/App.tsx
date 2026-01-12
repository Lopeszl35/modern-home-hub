import { useState, useCallback } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "@/contexts/UserContext";
import { SplashScreen } from "@/components/shared/SplashScreen";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CreditCards from "./pages/CreditCards";
import FixedExpenses from "./pages/FixedExpenses";
import Financings from "./pages/Financings";
import AssistenteIA from "./pages/AssistenteIA";
import GastosVariaveis from "./pages/GastosVariaveis";
import Receitas from "./pages/Receitas";
import Login from "./pages/Login";
import Register from "./pages/Register";

const queryClient = new QueryClient();

const App = () => {
  const [showSplash, setShowSplash] = useState(true);
  const handleSplashFinish = useCallback(() => setShowSplash(false), []);

  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <TooltipProvider>
          {showSplash && <SplashScreen onFinish={handleSplashFinish} />}
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/credit-cards" element={<CreditCards />} />
              <Route path="/fixed-expenses" element={<FixedExpenses />} />
              <Route path="/financings" element={<Financings />} />
              <Route path="/gastos-variaveis" element={<GastosVariaveis />} />
              <Route path="/receitas" element={<Receitas />} />
              <Route path="/assistente-ia" element={<AssistenteIA />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </UserProvider>
    </QueryClientProvider>
  );
};

export default App;
