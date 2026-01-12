import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { gastosVariaveisStyles as styles } from '../styles/pages/GastosVariaveisStyles';
import { colors } from '../styles/theme';

const theme = colors.dark;

interface Categoria {
  id: string;
  nome: string;
  icone: string;
  cor: string;
  orcamento: number;
  gasto: number;
}

const mockCategorias: Categoria[] = [
  { id: '1', nome: 'Alimentação', icone: 'fast-food', cor: theme.warning, orcamento: 800, gasto: 650 },
  { id: '2', nome: 'Transporte', icone: 'car', cor: theme.primary, orcamento: 400, gasto: 280 },
  { id: '3', nome: 'Lazer', icone: 'game-controller', cor: theme.destructive, orcamento: 300, gasto: 420 },
  { id: '4', nome: 'Compras', icone: 'bag-handle', cor: '#7c3aed', orcamento: 500, gasto: 150 },
  { id: '5', nome: 'Saúde', icone: 'medical', cor: '#06b6d4', orcamento: 200, gasto: 80 },
];

export default function GastosVariaveisScreen() {
  const [categorias] = useState<Categoria[]>(mockCategorias);
  const [refreshing, setRefreshing] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const formatCurrency = (value: number) =>
    value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  const onRefresh = async () => {
    setRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  const totalOrcamento = categorias.reduce((acc, c) => acc + c.orcamento, 0);
  const totalGasto = categorias.reduce((acc, c) => acc + c.gasto, 0);
  const totalDisponivel = totalOrcamento - totalGasto;
  const percentualUsado = (totalGasto / totalOrcamento) * 100;

  const getProgressColor = (gasto: number, orcamento: number) => {
    const percent = (gasto / orcamento) * 100;
    if (percent >= 100) return theme.destructive;
    if (percent >= 80) return theme.warning;
    return theme.success;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={theme.primary} />}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Summary */}
        <View style={styles.headerCard}>
          <View style={styles.headerRow}>
            <Text style={styles.headerTitle}>Gastos do Mês</Text>
            <TouchableOpacity style={styles.monthSelector}>
              <Ionicons name="chevron-back" size={18} color={theme.foreground} />
              <Text style={styles.monthText}>Janeiro 2026</Text>
              <Ionicons name="chevron-forward" size={18} color={theme.foreground} />
            </TouchableOpacity>
          </View>

          <View style={styles.spendingSummary}>
            <View style={styles.spendingItem}>
              <Text style={styles.spendingLabel}>Orçamento</Text>
              <Text style={styles.spendingValue}>{formatCurrency(totalOrcamento)}</Text>
            </View>
            <View style={styles.spendingDivider} />
            <View style={styles.spendingItem}>
              <Text style={styles.spendingLabel}>Gasto</Text>
              <Text style={[styles.spendingValue, percentualUsado >= 80 ? styles.spendingValueWarning : styles.spendingValueSuccess]}>
                {formatCurrency(totalGasto)}
              </Text>
            </View>
            <View style={styles.spendingDivider} />
            <View style={styles.spendingItem}>
              <Text style={styles.spendingLabel}>Disponível</Text>
              <Text style={[styles.spendingValue, totalDisponivel < 0 ? styles.spendingValueDanger : styles.spendingValueSuccess]}>
                {formatCurrency(totalDisponivel)}
              </Text>
            </View>
          </View>

          {/* Progress Bar */}
          <View style={styles.progressContainer}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressLabel}>Uso do Orçamento</Text>
              <Text style={[styles.progressPercent, { color: getProgressColor(totalGasto, totalOrcamento) }]}>
                {percentualUsado.toFixed(1)}%
              </Text>
            </View>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${Math.min(percentualUsado, 100)}%`, backgroundColor: getProgressColor(totalGasto, totalOrcamento) },
                ]}
              />
            </View>
          </View>
        </View>

        {/* Categories Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Categorias</Text>
          <TouchableOpacity style={styles.addCategoryButton}>
            <Ionicons name="add" size={18} color={theme.foreground} />
            <Text style={styles.addCategoryText}>Nova</Text>
          </TouchableOpacity>
        </View>

        {/* Categories List */}
        {categorias.map((categoria) => {
          const isExpanded = expandedId === categoria.id;
          const percent = (categoria.gasto / categoria.orcamento) * 100;
          const remaining = categoria.orcamento - categoria.gasto;
          
          return (
            <TouchableOpacity
              key={categoria.id}
              style={[styles.categoryCard, isExpanded && styles.categoryCardExpanded]}
              activeOpacity={0.8}
              onPress={() => setExpandedId(isExpanded ? null : categoria.id)}
            >
              <View style={styles.categoryHeader}>
                <View style={[styles.categoryIcon, { backgroundColor: `${categoria.cor}20` }]}>
                  <Ionicons name={categoria.icone as any} size={24} color={categoria.cor} />
                </View>
                <View style={styles.categoryInfo}>
                  <Text style={styles.categoryName}>{categoria.nome}</Text>
                  <Text style={styles.categoryBudget}>Orçamento: {formatCurrency(categoria.orcamento)}</Text>
                </View>
                <View style={styles.categoryAmount}>
                  <Text style={styles.categorySpent}>{formatCurrency(categoria.gasto)}</Text>
                  <Text style={[styles.categoryRemaining, { color: remaining >= 0 ? theme.success : theme.destructive }]}>
                    {remaining >= 0 ? `Sobram ${formatCurrency(remaining)}` : `Excedido ${formatCurrency(Math.abs(remaining))}`}
                  </Text>
                </View>
              </View>

              {/* Progress Bar */}
              <View style={styles.categoryProgress}>
                <View style={styles.categoryProgressBar}>
                  <View
                    style={[
                      styles.progressFill,
                      { width: `${Math.min(percent, 100)}%`, backgroundColor: getProgressColor(categoria.gasto, categoria.orcamento) },
                    ]}
                  />
                </View>
              </View>

              {/* Expanded Content */}
              {isExpanded && (
                <View style={styles.categoryActions}>
                  <TouchableOpacity style={styles.actionButton}>
                    <Ionicons name="add-circle-outline" size={18} color={theme.foreground} />
                    <Text style={styles.actionButtonText}>Adicionar Gasto</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionButton}>
                    <Ionicons name="create-outline" size={18} color={theme.foreground} />
                    <Text style={styles.actionButtonText}>Editar</Text>
                  </TouchableOpacity>
                </View>
              )}
            </TouchableOpacity>
          );
        })}

        {/* Empty State */}
        {categorias.length === 0 && (
          <View style={styles.emptyState}>
            <View style={styles.emptyIcon}>
              <Ionicons name="wallet-outline" size={40} color={theme.mutedForeground} />
            </View>
            <Text style={styles.emptyTitle}>Nenhuma categoria cadastrada</Text>
            <Text style={styles.emptyText}>
              Crie categorias para organizar seus gastos variáveis do mês.
            </Text>
            <TouchableOpacity style={styles.emptyButton}>
              <Text style={styles.emptyButtonText}>Criar Categoria</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
