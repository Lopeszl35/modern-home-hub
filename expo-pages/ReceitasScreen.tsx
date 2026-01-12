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
import { receitasStyles as styles } from '../styles/pages/ReceitasStyles';
import { colors } from '../styles/theme';

const theme = colors.dark;

interface ReceitaPF {
  id: string;
  descricao: string;
  valor: number;
  tipo: string;
  data: string;
  recorrente: boolean;
}

interface ReceitaPJ {
  id: string;
  descricao: string;
  cliente: string;
  valor_bruto: number;
  impostos: number;
  valor_liquido: number;
  tipo: string;
  status: 'recebido' | 'pendente' | 'atrasado';
  data_emissao: string;
  numero_nf: string;
}

const mockReceitasPF: ReceitaPF[] = [
  { id: '1', descricao: 'Salário', valor: 5000, tipo: 'salario', data: '2026-01-05', recorrente: true },
  { id: '2', descricao: 'Freelance Design', valor: 1500, tipo: 'freelance', data: '2026-01-10', recorrente: false },
  { id: '3', descricao: 'Dividendos PETR4', valor: 320, tipo: 'outros', data: '2026-01-15', recorrente: false },
];

const mockReceitasPJ: ReceitaPJ[] = [
  { id: '1', descricao: 'Consultoria em TI', cliente: 'Empresa ABC', valor_bruto: 8000, impostos: 1200, valor_liquido: 6800, tipo: 'consultoria', status: 'recebido', data_emissao: '2026-01-02', numero_nf: '2024001' },
  { id: '2', descricao: 'Desenvolvimento App', cliente: 'Startup XYZ', valor_bruto: 15000, impostos: 2250, valor_liquido: 12750, tipo: 'servico', status: 'pendente', data_emissao: '2026-01-08', numero_nf: '2024002' },
];

const tiposPFLabels: Record<string, string> = {
  salario: 'Salário',
  freelance: 'Freelance',
  outros: 'Outros',
};

const statusLabels = {
  recebido: { label: 'Recebido', color: theme.success, icon: 'checkmark-circle' },
  pendente: { label: 'Pendente', color: theme.warning, icon: 'time' },
  atrasado: { label: 'Atrasado', color: theme.destructive, icon: 'alert-circle' },
};

export default function ReceitasScreen() {
  const [activeTab, setActiveTab] = useState<'pf' | 'pj'>('pf');
  const [refreshing, setRefreshing] = useState(false);

  const formatCurrency = (value: number) =>
    value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  const formatDate = (date: string) => new Date(date).toLocaleDateString('pt-BR');

  const onRefresh = async () => {
    setRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  const totalPF = mockReceitasPF.reduce((acc, r) => acc + r.valor, 0);
  const totalPJ = mockReceitasPJ.reduce((acc, r) => acc + r.valor_liquido, 0);
  const totalMes = totalPF + totalPJ;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={theme.primary} />}
        showsVerticalScrollIndicator={false}
      >
        {/* Summary Card */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Total do Mês</Text>
              <Text style={styles.summaryValue}>{formatCurrency(totalMes)}</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Pessoa Física</Text>
              <Text style={styles.summaryValue}>{formatCurrency(totalPF)}</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Pessoa Jurídica</Text>
              <Text style={styles.summaryValue}>{formatCurrency(totalPJ)}</Text>
            </View>
          </View>
        </View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'pf' && styles.tabActive]}
            onPress={() => setActiveTab('pf')}
          >
            <Text style={[styles.tabText, activeTab === 'pf' && styles.tabTextActive]}>
              Pessoa Física
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'pj' && styles.tabActive]}
            onPress={() => setActiveTab('pj')}
          >
            <Text style={[styles.tabText, activeTab === 'pj' && styles.tabTextActive]}>
              Pessoa Jurídica
            </Text>
          </TouchableOpacity>
        </View>

        {/* Section Header */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            {activeTab === 'pf' ? 'Entradas PF' : 'Entradas PJ'}
          </Text>
          <TouchableOpacity style={styles.addButton}>
            <Ionicons name="add" size={18} color={theme.primaryForeground} />
            <Text style={styles.addButtonText}>Nova</Text>
          </TouchableOpacity>
        </View>

        {/* PF Content */}
        {activeTab === 'pf' && mockReceitasPF.map((receita) => (
          <View key={receita.id} style={styles.incomeCard}>
            <View style={styles.incomeHeader}>
              <View style={styles.incomeIcon}>
                <Ionicons name="cash" size={24} color={theme.success} />
              </View>
              <View style={styles.incomeInfo}>
                <Text style={styles.incomeTitle}>{receita.descricao}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                  <View style={styles.typeBadgePF}>
                    <Text style={styles.typeBadgeTextPF}>{tiposPFLabels[receita.tipo]}</Text>
                  </View>
                  <Text style={styles.incomeType}> • {formatDate(receita.data)}</Text>
                  {receita.recorrente && (
                    <Text style={[styles.incomeType, { color: theme.primary }]}> • Recorrente</Text>
                  )}
                </View>
              </View>
              <View style={styles.incomeAmount}>
                <Text style={styles.incomeValue}>{formatCurrency(receita.valor)}</Text>
              </View>
            </View>
          </View>
        ))}

        {/* PJ Content */}
        {activeTab === 'pj' && mockReceitasPJ.map((receita) => {
          const status = statusLabels[receita.status];
          return (
            <View key={receita.id} style={styles.incomeCard}>
              <View style={styles.incomeHeader}>
                <View style={[styles.incomeIcon, { backgroundColor: `${theme.primary}20` }]}>
                  <Ionicons name="business" size={24} color={theme.primary} />
                </View>
                <View style={styles.incomeInfo}>
                  <Text style={styles.incomeTitle}>{receita.descricao}</Text>
                  <Text style={styles.incomeType}>{receita.cliente}</Text>
                </View>
                <View style={[styles.typeBadge, { backgroundColor: `${status.color}20` }]}>
                  <Text style={[styles.typeBadgeText, { color: status.color }]}>{status.label}</Text>
                </View>
              </View>

              <View style={styles.incomeDetails}>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Valor Bruto</Text>
                  <Text style={styles.detailValue}>{formatCurrency(receita.valor_bruto)}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Impostos</Text>
                  <Text style={[styles.detailValue, { color: theme.destructive }]}>
                    -{formatCurrency(receita.impostos)}
                  </Text>
                </View>
                <View style={[styles.detailRow, styles.detailRowLast]}>
                  <Text style={styles.detailLabel}>Valor Líquido</Text>
                  <Text style={[styles.detailValue, { color: theme.success, fontWeight: 'bold' }]}>
                    {formatCurrency(receita.valor_liquido)}
                  </Text>
                </View>
              </View>
            </View>
          );
        })}

        {/* Empty State */}
        {((activeTab === 'pf' && mockReceitasPF.length === 0) || (activeTab === 'pj' && mockReceitasPJ.length === 0)) && (
          <View style={styles.emptyState}>
            <View style={styles.emptyIcon}>
              <Ionicons name="cash-outline" size={40} color={theme.mutedForeground} />
            </View>
            <Text style={styles.emptyTitle}>Nenhuma receita cadastrada</Text>
            <Text style={styles.emptyText}>
              Adicione suas receitas para acompanhar suas entradas.
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
