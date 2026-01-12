import { useState } from "react";
import { RefreshCw, Plus, Eye, Layers } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useGastosVariaveis } from "@/hooks/gastos-variaveis/useGastosVariaveis";
import { GastosHeader } from "@/components/gastos-variaveis/GastosHeader";
import { CategoriaCard } from "@/components/gastos-variaveis/CategoriaCard";
import { AddCategoriaModal } from "@/components/gastos-variaveis/AddCategoriaModal";
import { EditCategoriaModal } from "@/components/gastos-variaveis/EditCategoriaModal";
import { AddGastoModal } from "@/components/gastos-variaveis/AddGastoModal";
import { ConfirmDeleteModal } from "@/components/gastos-variaveis/ConfirmDeleteModal";
import type { CategoriaComStatus } from "@/types/categoria";

export default function GastosVariaveis() {
  const {
    mes,
    categorias,
    initialLoading,
    overlayLoading,
    error,
    gastoTotalMes,
    gastosLimiteMes,
    alertaGastoExcedido,
    progressoMes,
    refresh,
    handleCriarCategoria,
    handleAtualizarCategoria,
    handleExcluirCategoria,
    handleConfigLimiteMes,
    handleAdicionarGasto,
  } = useGastosVariaveis();

  const [categoriaSelecionada, setCategoriaSelecionada] = useState<CategoriaComStatus | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddGastoModal, setShowAddGastoModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleDelete = async () => {
    if (!categoriaSelecionada) return;
    try {
      setDeleteLoading(true);
      await handleExcluirCategoria(categoriaSelecionada.id_categoria);
      setShowDeleteModal(false);
      setCategoriaSelecionada(null);
    } finally {
      setDeleteLoading(false);
    }
  };

  // Loading state
  if (initialLoading) {
    return (
      <DashboardLayout title="Gastos Variáveis">
        <div className="space-y-6 animate-fade-in">
          <Skeleton className="h-48 w-full rounded-2xl" />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-40 rounded-2xl" />
            ))}
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // Error state
  if (error) {
    return (
      <DashboardLayout title="Gastos Variáveis">
        <div className="flex flex-col items-center justify-center py-20 space-y-4 animate-fade-in">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/20">
            <Layers className="h-8 w-8 text-destructive" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">Erro ao carregar dados</h3>
          <p className="text-sm text-muted-foreground text-center max-w-md">{error}</p>
          <Button onClick={refresh} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Tentar novamente
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Gastos Variáveis">
      <div className="space-y-6 animate-fade-in">
        {/* Loading overlay */}
        {overlayLoading && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-3">
              <RefreshCw className="h-8 w-8 text-primary animate-spin" />
              <p className="text-sm text-muted-foreground">Atualizando...</p>
            </div>
          </div>
        )}

        {/* Header Card */}
        <GastosHeader
          mes={mes}
          gastoTotalMes={gastoTotalMes}
          gastosLimiteMes={gastosLimiteMes}
          progressoMes={progressoMes}
          alertaGastoExcedido={alertaGastoExcedido}
          onConfigLimite={handleConfigLimiteMes}
        />

        {/* Section Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-semibold text-foreground">Categorias</h3>
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              <Eye className="h-4 w-4 mr-1" />
              Inativas
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={refresh}
              className="text-muted-foreground hover:text-foreground"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
            <AddCategoriaModal onSave={handleCriarCategoria} />
          </div>
        </div>

        {/* Empty State */}
        {categorias.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 space-y-4 rounded-2xl border border-dashed border-border bg-card/50">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Plus className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">Nenhuma categoria</h3>
            <p className="text-sm text-muted-foreground text-center max-w-md">
              Crie uma categoria para começar a organizar seus gastos variáveis.
            </p>
            <AddCategoriaModal onSave={handleCriarCategoria} />
          </div>
        ) : (
          /* Categories Grid */
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {categorias.map((categoria, index) => (
              <div 
                key={categoria.id_categoria}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <CategoriaCard
                  categoria={categoria}
                  onAddGasto={() => {
                    setCategoriaSelecionada(categoria);
                    setShowAddGastoModal(true);
                  }}
                  onEdit={() => {
                    setCategoriaSelecionada(categoria);
                    setShowEditModal(true);
                  }}
                  onDelete={() => {
                    setCategoriaSelecionada(categoria);
                    setShowDeleteModal(true);
                  }}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modals */}
      <EditCategoriaModal
        categoria={categoriaSelecionada}
        open={showEditModal}
        onOpenChange={setShowEditModal}
        onSave={handleAtualizarCategoria}
      />

      <AddGastoModal
        categoria={categoriaSelecionada}
        open={showAddGastoModal}
        onOpenChange={setShowAddGastoModal}
        onSave={handleAdicionarGasto}
      />

      <ConfirmDeleteModal
        open={showDeleteModal}
        onOpenChange={setShowDeleteModal}
        nomeCategoria={categoriaSelecionada?.nome || ""}
        onConfirm={handleDelete}
        loading={deleteLoading}
      />
    </DashboardLayout>
  );
}
