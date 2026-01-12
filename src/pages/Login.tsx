import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";
import { loginUser } from "@/services/userService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Wallet, Mail, Lock, Eye, EyeOff, AlertCircle, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function Login() {
  const navigate = useNavigate();
  const { setUser } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (!email || !password) {
        setError("Preencha todos os campos");
        setLoading(false);
        return;
      }

      if (!email.includes("@")) {
        setError("Email inválido");
        setLoading(false);
        return;
      }

      const data = await loginUser(email, password);
      setUser(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));
      
      toast({
        title: "Bem-vindo de volta!",
        description: `Olá, ${data.user.nome}!`,
      });
      
      navigate("/");
    } catch (err: any) {
      setError(err.message || "Erro ao fazer login");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      {/* Content */}
      <div className="relative w-full max-w-md animate-fade-in">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl gradient-primary shadow-glow mb-4">
            <Wallet className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">
            Bem-vindo de volta
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Gerencie suas finanças e conquiste seus objetivos
          </p>
        </div>

        {/* Card */}
        <div className="glass rounded-2xl p-8 shadow-card">
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                E-mail
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Digite seu e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-muted/50 border-border/50 focus:border-primary"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                Senha
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Digite sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 bg-muted/50 border-border/50 focus:border-primary"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 text-destructive text-sm animate-fade-in">
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <Button
              type="submit"
              className="w-full gradient-primary text-primary-foreground font-semibold h-11"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Entrando...</span>
                </div>
              ) : (
                "Entrar"
              )}
            </Button>

            <div className="text-center pt-2">
              <span className="text-muted-foreground text-sm">
                Não possui uma conta?{" "}
              </span>
              <Link
                to="/register"
                className="text-primary font-medium hover:underline text-sm"
              >
                Cadastre-se
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
