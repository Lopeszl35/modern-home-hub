import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import { 
  Bell, 
  Moon, 
  Sun, 
  Smartphone, 
  Shield, 
  Palette, 
  Globe, 
  Save,
  CreditCard,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";

export default function Settings() {
  const [settings, setSettings] = useState({
    // Notificações
    notificacoesEmail: true,
    notificacoesPush: true,
    alertasGastos: true,
    lembretesPagamento: true,
    
    // Aparência
    tema: "dark" as "light" | "dark" | "system",
    idioma: "pt-BR",
    
    // Privacidade
    compartilharDados: false,
    autenticacaoDoisFatores: false,
    
    // Financeiro
    moeda: "BRL",
    formatoData: "DD/MM/YYYY",
    limiteAlerta: "80",
  });

  const handleSave = () => {
    toast({
      title: "Configurações salvas!",
      description: "Suas preferências foram atualizadas.",
    });
  };

  const updateSetting = <K extends keyof typeof settings>(
    key: K,
    value: typeof settings[K]
  ) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <DashboardLayout title="Configurações" subtitle="Personalize sua experiência no app">
      <div className="space-y-6 max-w-2xl mx-auto">
        {/* Notificações */}
        <Card variant="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              Notificações
            </CardTitle>
            <CardDescription>Configure como deseja ser notificado</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Notificações por E-mail</Label>
                <p className="text-sm text-muted-foreground">Receba resumos e alertas por e-mail</p>
              </div>
              <Switch
                checked={settings.notificacoesEmail}
                onCheckedChange={(checked) => updateSetting("notificacoesEmail", checked)}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Notificações Push</Label>
                <p className="text-sm text-muted-foreground">Receba alertas em tempo real</p>
              </div>
              <Switch
                checked={settings.notificacoesPush}
                onCheckedChange={(checked) => updateSetting("notificacoesPush", checked)}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-warning" />
                  Alertas de Gastos
                </Label>
                <p className="text-sm text-muted-foreground">Aviso quando atingir limite de gastos</p>
              </div>
              <Switch
                checked={settings.alertasGastos}
                onCheckedChange={(checked) => updateSetting("alertasGastos", checked)}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-info" />
                  Lembretes de Pagamento
                </Label>
                <p className="text-sm text-muted-foreground">Lembre-me antes do vencimento</p>
              </div>
              <Switch
                checked={settings.lembretesPagamento}
                onCheckedChange={(checked) => updateSetting("lembretesPagamento", checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Aparência */}
        <Card variant="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5 text-primary" />
              Aparência
            </CardTitle>
            <CardDescription>Personalize o visual do aplicativo</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Tema</Label>
                <p className="text-sm text-muted-foreground">Escolha entre claro, escuro ou automático</p>
              </div>
              <Select
                value={settings.tema}
                onValueChange={(value: "light" | "dark" | "system") => updateSetting("tema", value)}
              >
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">
                    <span className="flex items-center gap-2">
                      <Sun className="h-4 w-4" /> Claro
                    </span>
                  </SelectItem>
                  <SelectItem value="dark">
                    <span className="flex items-center gap-2">
                      <Moon className="h-4 w-4" /> Escuro
                    </span>
                  </SelectItem>
                  <SelectItem value="system">
                    <span className="flex items-center gap-2">
                      <Smartphone className="h-4 w-4" /> Sistema
                    </span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Idioma</Label>
                <p className="text-sm text-muted-foreground">Idioma do aplicativo</p>
              </div>
              <Select
                value={settings.idioma}
                onValueChange={(value) => updateSetting("idioma", value)}
              >
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pt-BR">🇧🇷 Português</SelectItem>
                  <SelectItem value="en-US">🇺🇸 English</SelectItem>
                  <SelectItem value="es-ES">🇪🇸 Español</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Configurações Financeiras */}
        <Card variant="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Configurações Financeiras
            </CardTitle>
            <CardDescription>Ajuste suas preferências financeiras</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Moeda</Label>
                <p className="text-sm text-muted-foreground">Moeda padrão para exibição</p>
              </div>
              <Select
                value={settings.moeda}
                onValueChange={(value) => updateSetting("moeda", value)}
              >
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="BRL">R$ Real (BRL)</SelectItem>
                  <SelectItem value="USD">$ Dólar (USD)</SelectItem>
                  <SelectItem value="EUR">€ Euro (EUR)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Limite de Alerta (%)</Label>
                <p className="text-sm text-muted-foreground">Alertar quando gastos atingirem % do orçamento</p>
              </div>
              <Select
                value={settings.limiteAlerta}
                onValueChange={(value) => updateSetting("limiteAlerta", value)}
              >
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="50">50%</SelectItem>
                  <SelectItem value="70">70%</SelectItem>
                  <SelectItem value="80">80%</SelectItem>
                  <SelectItem value="90">90%</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Privacidade e Segurança */}
        <Card variant="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Privacidade e Segurança
            </CardTitle>
            <CardDescription>Gerencie sua segurança e dados</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Autenticação em Dois Fatores</Label>
                <p className="text-sm text-muted-foreground">Camada extra de segurança</p>
              </div>
              <Switch
                checked={settings.autenticacaoDoisFatores}
                onCheckedChange={(checked) => updateSetting("autenticacaoDoisFatores", checked)}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Compartilhar Dados Anônimos</Label>
                <p className="text-sm text-muted-foreground">Ajude-nos a melhorar o app</p>
              </div>
              <Switch
                checked={settings.compartilharDados}
                onCheckedChange={(checked) => updateSetting("compartilharDados", checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button onClick={handleSave} className="gap-2">
            <Save className="h-4 w-4" />
            Salvar Configurações
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
