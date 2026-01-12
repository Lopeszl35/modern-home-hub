import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@/contexts/UserContext";
import { toast } from "@/hooks/use-toast";
import { Camera, Save, User } from "lucide-react";

export default function Profile() {
  const { user, setUser } = useUser();
  
  const [formData, setFormData] = useState({
    nome: user?.nome || "",
    email: user?.email || "",
    perfilFinanceiro: "moderado" as "conservador" | "moderado" | "arrojado",
    salarioMensal: "",
    avatarUrl: "",
  });

  const handleSave = () => {
    if (user) {
      setUser({
        ...user,
        nome: formData.nome,
        email: formData.email,
      });
    }
    toast({
      title: "Perfil atualizado!",
      description: "Suas informações foram salvas com sucesso.",
    });
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
    <DashboardLayout title="Meu Perfil" subtitle="Gerencie suas informações pessoais">
      <div className="space-y-6 max-w-2xl mx-auto">
        {/* Avatar Section */}
        <Card variant="glass">
          <CardHeader className="text-center">
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <Avatar className="h-24 w-24 border-4 border-primary/20">
                  <AvatarImage src={formData.avatarUrl} />
                  <AvatarFallback className="bg-primary/20 text-primary text-2xl font-bold">
                    {getInitials(formData.nome || "U")}
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="icon"
                  variant="secondary"
                  className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full"
                  onClick={() => toast({ title: "Em breve!", description: "Upload de foto em desenvolvimento." })}
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
              <div>
                <CardTitle className="text-xl">{formData.nome || "Usuário"}</CardTitle>
                <CardDescription>{formData.email || "email@exemplo.com"}</CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Personal Info */}
        <Card variant="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              Informações Pessoais
            </CardTitle>
            <CardDescription>Atualize seus dados pessoais</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome Completo</Label>
                <Input
                  id="nome"
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  placeholder="Seu nome"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="seu@email.com"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="perfil">Perfil Financeiro</Label>
                <Select
                  value={formData.perfilFinanceiro}
                  onValueChange={(value: "conservador" | "moderado" | "arrojado") =>
                    setFormData({ ...formData, perfilFinanceiro: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione seu perfil" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="conservador">🛡️ Conservador</SelectItem>
                    <SelectItem value="moderado">⚖️ Moderado</SelectItem>
                    <SelectItem value="arrojado">🚀 Arrojado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="salario">Salário Mensal</Label>
                <Input
                  id="salario"
                  type="number"
                  value={formData.salarioMensal}
                  onChange={(e) => setFormData({ ...formData, salarioMensal: e.target.value })}
                  placeholder="R$ 0,00"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button onClick={handleSave} className="gap-2">
            <Save className="h-4 w-4" />
            Salvar Alterações
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
