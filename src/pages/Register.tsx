import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "@/services/userService";
import { UserCadastro } from "@/types/user";
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
import {
  Wallet,
  Mail,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  Loader2,
  User,
  DollarSign,
  PiggyBank,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    perfil_financeiro: "moderado" as 'conservador' | 'moderado' | 'arrojado',
    salario_mensal: "",
    saldo_inicial: "",
    saldo_atual: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  function validateForm(): string | null {
    if (!formData.nome || !formData.email || !formData.senha || !formData.salario_mensal) {
      return "Preencha todos os campos obrigatórios";
    }
    if (!formData.email.includes("@")) {
      return "Email inválido";
    }
    if (formData.senha.length < 8) {
      return "A senha deve ter pelo menos 8 caracteres";
    }
    return null;
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    try {
      const user: UserCadastro = {
        nome: formData.nome,
        email: formData.email,
        senha_hash: formData.senha,
        perfil_financeiro: formData.perfil_financeiro,
        salario_mensal: parseFloat(formData.salario_mensal) || 0,
        saldo_inicial: parseFloat(formData.saldo_inicial) || 0,
        saldo_atual: parseFloat(formData.saldo_atual) || 0,
      };

      const data = await registerUser(user);
      
      toast({
        title: "Conta criada com sucesso!",
        description: data.message || "Agora você pode fazer login",
      });
      
      navigate("/login");
    } catch (err: any) {
      setError(err.message || "Erro ao cadastrar usuário");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4 py-8 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      {/* Content */}
      <div className="relative w-full max-w-md animate-fade-in">
        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl gradient-primary shadow-glow mb-3">
            <Wallet className="h-7 w-7 text-primary-foreground" />
          </div>
          <h1 className="text-xl font-bold text-foreground text-center">
            Você está mais próximo de conquistar seus objetivos
          </h1>
          <p className="text-muted-foreground text-sm mt-1 text-center">
            Crie sua conta e comece a organizar suas finanças
          </p>
        </div>

        {/* Card */}
        <div className="glass rounded-2xl p-6 shadow-card">
          <h2 className="text-lg font-semibold mb-4 text-center">Cadastro</h2>
          
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="nome" className="text-sm">Nome completo</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="nome"
                  placeholder="Digite seu nome"
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  className="pl-10 bg-muted/50 border-border/50"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-sm">E-mail</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Digite seu e-mail"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="pl-10 bg-muted/50 border-border/50"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="senha" className="text-sm">Senha</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="senha"
                  type={showPassword ? "text" : "password"}
                  placeholder="Mínimo 8 caracteres"
                  value={formData.senha}
                  onChange={(e) => setFormData({ ...formData, senha: e.target.value })}
                  className="pl-10 pr-10 bg-muted/50 border-border/50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-sm">Perfil Financeiro</Label>
              <Select
                value={formData.perfil_financeiro}
                onValueChange={(value: 'conservador' | 'moderado' | 'arrojado') =>
                  setFormData({ ...formData, perfil_financeiro: value })
                }
              >
                <SelectTrigger className="bg-muted/50 border-border/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="conservador">Conservador</SelectItem>
                  <SelectItem value="moderado">Moderado</SelectItem>
                  <SelectItem value="arrojado">Arrojado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="salario" className="text-sm">Salário Mensal</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="salario"
                    type="number"
                    placeholder="R$ 0,00"
                    value={formData.salario_mensal}
                    onChange={(e) => setFormData({ ...formData, salario_mensal: e.target.value })}
                    className="pl-10 bg-muted/50 border-border/50"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="saldo_inicial" className="text-sm">Saldo Inicial</Label>
                <div className="relative">
                  <PiggyBank className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="saldo_inicial"
                    type="number"
                    placeholder="R$ 0,00"
                    value={formData.saldo_inicial}
                    onChange={(e) => setFormData({ ...formData, saldo_inicial: e.target.value })}
                    className="pl-10 bg-muted/50 border-border/50"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="saldo_atual" className="text-sm">Saldo Atual</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="saldo_atual"
                  type="number"
                  placeholder="R$ 0,00"
                  value={formData.saldo_atual}
                  onChange={(e) => setFormData({ ...formData, saldo_atual: e.target.value })}
                  className="pl-10 bg-muted/50 border-border/50"
                />
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
                  <span>Criando conta...</span>
                </div>
              ) : (
                "Cadastrar"
              )}
            </Button>

            <div className="text-center">
              <span className="text-muted-foreground text-sm">Já tem uma conta? </span>
              <Link to="/login" className="text-primary font-medium hover:underline text-sm">
                Faça login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
