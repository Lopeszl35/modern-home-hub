import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useUser } from "@/contexts/UserContext";
import {
  getReceitasPF,
  getReceitasPJ,
  getResumoReceitas,
} from "@/services/receitasService";
import { ReceitaPF, ReceitaPJ, ResumoReceitas } from "@/types/receita";
import {
  Plus,
  User,
  Building2,
  TrendingUp,
  TrendingDown,
  DollarSign,
  CalendarDays,
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  Repeat,
} from "lucide-react";
import { AddReceitaPFModal } from "@/components/receitas/AddReceitaPFModal";
import { AddReceitaPJModal } from "@/components/receitas/AddReceitaPJModal";

const tiposPFLabels: Record<string, string> = {
  salario: "Salário",
  pix: "PIX Recebido",
  venda: "Venda",
  freelance: "Freelance",
  outros: "Outros",
};

const tiposPJLabels: Record<string, string> = {
  servico: "Serviço",
  produto: "Produto",
  consultoria: "Consultoria",
  licenciamento: "Licenciamento",
  outros: "Outros",
};

const statusLabels: Record<string, { label: string; color: string; icon: any }> = {
  recebido: { label: "Recebido", color: "bg-success/20 text-success", icon: CheckCircle },
  pendente: { label: "Pendente", color: "bg-warning/20 text-warning", icon: Clock },
  atrasado: { label: "Atrasado", color: "bg-destructive/20 text-destructive", icon: AlertCircle },
};

export default function Receitas() {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState<"pf" | "pj">("pf");
  const [receitasPF, setReceitasPF] = useState<ReceitaPF[]>([]);
  const [receitasPJ, setReceitasPJ] = useState<ReceitaPJ[]>([]);
  const [resumo, setResumo] = useState<ResumoReceitas | null>(null);
  const [loading, setLoading] = useState(true);
  const [showAddPFModal, setShowAddPFModal] = useState(false);
  const [showAddPJModal, setShowAddPJModal] = useState(false);

  useEffect(() => {
    loadData();
  }, [user?.id_usuario]);

  async function loadData() {
    if (!user?.id_usuario) return;
    setLoading(true);
    try {
      const [pf, pj, res] = await Promise.all([
        getReceitasPF(user.id_usuario),
        getReceitasPJ(user.id_usuario),
        getResumoReceitas(user.id_usuario),
      ]);
      setReceitasPF(pf);
      setReceitasPJ(pj);
      setResumo(res);
    } finally {
      setLoading(false);
    }
  }

  function formatCurrency(value: number) {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  }

  function formatDate(date: string) {
    return new Date(date).toLocaleDateString("pt-BR");
  }

  const totalPF = receitasPF.reduce((acc, r) => acc + r.valor, 0);
  const totalPJ = receitasPJ.reduce((acc, r) => acc + r.valor_liquido, 0);

  return (
    <DashboardLayout title="Receitas" subtitle="Gerencie suas entradas">
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Receitas</h1>
            <p className="text-muted-foreground">
              Gerencie suas entradas de Pessoa Física e Jurídica
            </p>
          </div>
          <Button
            onClick={() => (activeTab === "pf" ? setShowAddPFModal(true) : setShowAddPJModal(true))}
            className="gradient-primary text-primary-foreground"
          >
            <Plus className="h-4 w-4 mr-2" />
            Nova Receita
          </Button>
        </div>

        {/* Resumo Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="glass shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-success/20">
                  <DollarSign className="h-5 w-5 text-success" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Total do Mês</p>
                  <p className="text-xl font-bold text-success">
                    {formatCurrency(resumo?.total_mes || 0)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/20">
                  <Repeat className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Recorrente</p>
                  <p className="text-xl font-bold">
                    {formatCurrency(resumo?.total_recorrente || 0)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-warning/20">
                  <TrendingUp className="h-5 w-5 text-warning" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Avulso</p>
                  <p className="text-xl font-bold">
                    {formatCurrency(resumo?.total_avulso || 0)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div
                  className={`p-2 rounded-lg ${
                    (resumo?.comparativo_mes_anterior || 0) >= 0
                      ? "bg-success/20"
                      : "bg-destructive/20"
                  }`}
                >
                  {(resumo?.comparativo_mes_anterior || 0) >= 0 ? (
                    <ArrowUpRight className="h-5 w-5 text-success" />
                  ) : (
                    <ArrowDownRight className="h-5 w-5 text-destructive" />
                  )}
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">vs Mês Anterior</p>
                  <p
                    className={`text-xl font-bold ${
                      (resumo?.comparativo_mes_anterior || 0) >= 0
                        ? "text-success"
                        : "text-destructive"
                    }`}
                  >
                    {(resumo?.comparativo_mes_anterior || 0) >= 0 ? "+" : ""}
                    {resumo?.comparativo_mes_anterior || 0}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "pf" | "pj")}>
          <TabsList className="grid w-full max-w-md grid-cols-2 bg-muted/50">
            <TabsTrigger
              value="pf"
              className="data-[state=active]:bg-card data-[state=active]:shadow-sm flex items-center gap-2"
            >
              <User className="h-4 w-4" />
              Pessoa Física
            </TabsTrigger>
            <TabsTrigger
              value="pj"
              className="data-[state=active]:bg-card data-[state=active]:shadow-sm flex items-center gap-2"
            >
              <Building2 className="h-4 w-4" />
              Pessoa Jurídica
            </TabsTrigger>
          </TabsList>

          {/* Pessoa Física */}
          <TabsContent value="pf" className="mt-6">
            <Card className="glass shadow-card">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Entradas PF</CardTitle>
                  <Badge variant="secondary" className="bg-success/20 text-success">
                    Total: {formatCurrency(totalPF)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {receitasPF.map((receita) => (
                    <div
                      key={receita.id}
                      className="flex items-center justify-between p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-2 rounded-lg bg-success/20">
                          <DollarSign className="h-5 w-5 text-success" />
                        </div>
                        <div>
                          <p className="font-medium">{receita.descricao}</p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Badge variant="outline" className="text-xs">
                              {tiposPFLabels[receita.tipo]}
                            </Badge>
                            <span>•</span>
                            <CalendarDays className="h-3 w-3" />
                            <span>{formatDate(receita.data)}</span>
                            {receita.recorrente && (
                              <>
                                <span>•</span>
                                <Repeat className="h-3 w-3 text-primary" />
                                <span className="text-primary">Recorrente</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      <p className="text-lg font-bold text-success">
                        {formatCurrency(receita.valor)}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Pessoa Jurídica */}
          <TabsContent value="pj" className="mt-6">
            <Card className="glass shadow-card">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Entradas PJ (CNPJ)</CardTitle>
                  <Badge variant="secondary" className="bg-success/20 text-success">
                    Total Líquido: {formatCurrency(totalPJ)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {receitasPJ.map((receita) => {
                    const statusInfo = statusLabels[receita.status];
                    const StatusIcon = statusInfo.icon;
                    return (
                      <div
                        key={receita.id}
                        className="p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors space-y-3"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-4">
                            <div className="p-2 rounded-lg bg-primary/20">
                              <Building2 className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium">{receita.descricao}</p>
                              <p className="text-sm text-muted-foreground">
                                {receita.cliente}
                              </p>
                            </div>
                          </div>
                          <Badge className={statusInfo.color}>
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {statusInfo.label}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                          <div>
                            <p className="text-muted-foreground text-xs">Valor Bruto</p>
                            <p className="font-medium">{formatCurrency(receita.valor_bruto)}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground text-xs">Impostos</p>
                            <p className="font-medium text-destructive">
                              -{formatCurrency(receita.impostos)}
                            </p>
                          </div>
                          <div>
                            <p className="text-muted-foreground text-xs">Valor Líquido</p>
                            <p className="font-bold text-success">
                              {formatCurrency(receita.valor_liquido)}
                            </p>
                          </div>
                          <div>
                            <p className="text-muted-foreground text-xs">NF</p>
                            <p className="font-medium flex items-center gap-1">
                              <FileText className="h-3 w-3" />
                              {receita.numero_nf}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 text-xs text-muted-foreground pt-2 border-t border-border/30">
                          <span className="flex items-center gap-1">
                            <CalendarDays className="h-3 w-3" />
                            Emissão: {formatDate(receita.data_emissao)}
                          </span>
                          {receita.data_recebimento && (
                            <span className="flex items-center gap-1">
                              <CheckCircle className="h-3 w-3 text-success" />
                              Recebido: {formatDate(receita.data_recebimento)}
                            </span>
                          )}
                          <Badge variant="outline" className="text-xs">
                            {tiposPJLabels[receita.tipo]}
                          </Badge>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <AddReceitaPFModal
        open={showAddPFModal}
        onOpenChange={setShowAddPFModal}
        onSuccess={loadData}
      />
      <AddReceitaPJModal
        open={showAddPJModal}
        onOpenChange={setShowAddPJModal}
        onSuccess={loadData}
      />
    </DashboardLayout>
  );
}
