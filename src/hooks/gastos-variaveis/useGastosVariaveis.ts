import { useCallback, useEffect, useMemo, useState } from "react";
import { useUser } from "@/contexts/UserContext";
import { 
  getCategoriasAtivas, 
  getLimiteGastoMes,
  createCategoria,
  updateCategoria,
  deleteCategoria,
  configLimiteGastoMes,
  addGasto
} from "@/services/categoriasService";
import type { 
  Categoria, 
  CategoriaCreate, 
  CategoriaUpdate,
  ConfiguracaoGastoMes,
  StatusCategoria,
  CategoriaComStatus 
} from "@/types/categoria";
import { toast } from "@/hooks/use-toast";

export function useGastosVariaveis() {
  const { user } = useUser();

  const [initialLoading, setInitialLoading] = useState(true);
  const [overlayLoading, setOverlayLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [configuracoesGastoMes, setConfiguracoesGastoMes] = useState<ConfiguracaoGastoMes | null>(null);
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  const mes = useMemo(
    () =>
      new Date()
        .toLocaleString("pt-BR", { month: "long" })
        .replace(/^./, (m) => m.toUpperCase()),
    []
  );

  const gastoTotalMes = useMemo(() => {
    return Number(configuracoesGastoMes?.gasto_atual_mes) || 0;
  }, [configuracoesGastoMes]);

  const gastosLimiteMes = useMemo(() => {
    return Number(configuracoesGastoMes?.limite_gasto_mes) || 0;
  }, [configuracoesGastoMes]);

  const progressoMes = useMemo(() => {
    if (gastosLimiteMes <= 0) return 0;
    return Math.min((gastoTotalMes / gastosLimiteMes) * 100, 100);
  }, [gastoTotalMes, gastosLimiteMes]);

  const alertaGastoExcedido = useMemo(
    () => gastoTotalMes > gastosLimiteMes && gastosLimiteMes > 0,
    [gastoTotalMes, gastosLimiteMes]
  );

  const categoriasComStatus = useMemo((): CategoriaComStatus[] => {
    return categorias.map(cat => {
      const limite = Number(cat.limite) || 0;
      const totalMes = Number(cat.totalGastoCategoriaMes) || 0;
      
      const backendPct = Number.parseFloat(String(cat.percentualGastoCategoriaMes ?? ""));
      const ratioFallback = limite > 0 ? totalMes / limite : 0;
      const ratio = Number.isFinite(backendPct) ? backendPct / 100 : ratioFallback;
      
      let status: StatusCategoria = 'ok';
      if (limite > 0) {
        if (ratio >= 1) status = 'danger';
        else if (ratio >= 0.8) status = 'warn';
      }

      return {
        ...cat,
        status,
        percentualCalculado: Math.round(ratio * 100),
      };
    });
  }, [categorias]);

  const fetchCategorias = useCallback(
    async (opts?: { showOverlay?: boolean }) => {
      const showOverlay = opts?.showOverlay ?? false;

      if (!user || !user.id_usuario) {
        console.warn("Usuário não definido ao buscar categorias.");
        setInitialLoading(false);
        return;
      }

      try {
        setError(null);
        if (showOverlay) setOverlayLoading(true);

        const data = await getCategoriasAtivas(user.id_usuario);
        const categoriasArray = Array.isArray(data) ? data : [];
        setCategorias(categoriasArray);

        if (categoriasArray.length === 0) {
          setConfiguracoesGastoMes(null);
          setError(null);
          return;
        }

        const limiteGastosMes = await getLimiteGastoMes(
          user.id_usuario,
          new Date().getFullYear(),
          new Date().getMonth() + 1
        );
        
        setConfiguracoesGastoMes(limiteGastosMes);
      } catch (e: unknown) {
        const message = e instanceof Error ? e.message : "Erro ao buscar categorias.";
        setError(message);
        setCategorias([]);
      } finally {
        setInitialLoading(false);
        setOverlayLoading(false);
      }
    },
    [user?.id_usuario]
  );

  useEffect(() => {
    if (!user?.id_usuario) {
      setInitialLoading(false);
      setCategorias([]);
      setError("Usuário não carregado. Faça login novamente.");
      return;
    }

    fetchCategorias();
  }, [user?.id_usuario, fetchCategorias]);

  const refresh = useCallback(async () => {
    try {
      setRefreshing(true);
      await fetchCategorias();
    } finally {
      setRefreshing(false);
    }
  }, [fetchCategorias]);

  // Actions
  const handleCriarCategoria = useCallback(async (data: CategoriaCreate) => {
    if (!user?.id_usuario) return;
    
    try {
      setOverlayLoading(true);
      await createCategoria(user.id_usuario, data);
      toast({ title: "Sucesso", description: "Categoria criada com sucesso!" });
      await fetchCategorias();
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Erro ao criar categoria.";
      toast({ title: "Erro", description: message, variant: "destructive" });
      throw e;
    } finally {
      setOverlayLoading(false);
    }
  }, [user?.id_usuario, fetchCategorias]);

  const handleAtualizarCategoria = useCallback(async (
    idCategoria: number,
    data: CategoriaUpdate
  ) => {
    try {
      setOverlayLoading(true);
      await updateCategoria(idCategoria, data);
      toast({ title: "Sucesso", description: "Categoria atualizada com sucesso!" });
      await fetchCategorias();
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Erro ao atualizar categoria.";
      toast({ title: "Erro", description: message, variant: "destructive" });
      throw e;
    } finally {
      setOverlayLoading(false);
    }
  }, [fetchCategorias]);

  const handleExcluirCategoria = useCallback(async (idCategoria: number) => {
    try {
      setOverlayLoading(true);
      await deleteCategoria(idCategoria);
      setCategorias(prev => prev.filter(c => c.id_categoria !== idCategoria));
      toast({ title: "Sucesso", description: "Categoria excluída com sucesso!" });
      await fetchCategorias();
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Erro ao excluir categoria.";
      toast({ title: "Erro", description: message, variant: "destructive" });
      throw e;
    } finally {
      setOverlayLoading(false);
    }
  }, [fetchCategorias]);

  const handleConfigLimiteMes = useCallback(async (config: {
    limiteGastoMes: number;
    mes: number;
    ano: number;
  }) => {
    if (!user?.id_usuario) return;

    try {
      setOverlayLoading(true);
      await configLimiteGastoMes(user.id_usuario, config);
      toast({ title: "Sucesso", description: "Limite do mês atualizado!" });
      await fetchCategorias();
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Erro ao configurar limite.";
      toast({ title: "Erro", description: message, variant: "destructive" });
      throw e;
    } finally {
      setOverlayLoading(false);
    }
  }, [user?.id_usuario, fetchCategorias]);

  const handleAdicionarGasto = useCallback(async (gasto: {
    idCategoria: number;
    dataGasto: string;
    valor: number;
    descricao: string;
    formaPagamento: 'PIX' | 'DINHEIRO' | 'DEBITO' | 'CREDITO';
    idCartao?: number | null;
  }) => {
    if (!user?.id_usuario) return;

    try {
      setOverlayLoading(true);
      await addGasto(user.id_usuario, {
        id_categoria: gasto.idCategoria,
        data_gasto: gasto.dataGasto,
        valor: gasto.valor,
        descricao: gasto.descricao,
        forma_pagamento: gasto.formaPagamento,
        id_cartao: gasto.formaPagamento === 'CREDITO' ? gasto.idCartao : null,
      });
      toast({ title: "Sucesso", description: "Gasto adicionado com sucesso!" });
      await fetchCategorias();
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Erro ao adicionar gasto.";
      toast({ title: "Erro", description: message, variant: "destructive" });
      throw e;
    } finally {
      setOverlayLoading(false);
    }
  }, [user?.id_usuario, fetchCategorias]);

  return {
    user,
    mes,
    categorias: categoriasComStatus,
    
    initialLoading,
    overlayLoading,
    refreshing,
    error,

    gastoTotalMes,
    gastosLimiteMes,
    alertaGastoExcedido,
    progressoMes,

    fetchCategorias,
    refresh,

    // Actions
    handleCriarCategoria,
    handleAtualizarCategoria,
    handleExcluirCategoria,
    handleConfigLimiteMes,
    handleAdicionarGasto,
  };
}
