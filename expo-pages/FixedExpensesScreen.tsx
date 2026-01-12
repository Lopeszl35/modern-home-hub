import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { fixedExpensesStyles as styles } from '../styles/pages/FixedExpensesStyles';
import { colors } from '../styles/theme';

const theme = colors.dark;

interface FixedExpense {
  id: string;
  name: string;
  category: string;
  amount: number;
  dueDay: number;
  isActive: boolean;
}

const mockExpenses: FixedExpense[] = [
  { id: '1', name: 'Conta de Luz', category: 'utilities', amount: 180.0, dueDay: 10, isActive: true },
  { id: '2', name: 'Conta de Água', category: 'utilities', amount: 85.0, dueDay: 15, isActive: true },
  { id: '3', name: 'Internet', category: 'subscriptions', amount: 120.0, dueDay: 5, isActive: true },
  { id: '4', name: 'Netflix', category: 'subscriptions', amount: 55.9, dueDay: 8, isActive: true },
  { id: '5', name: 'Academia', category: 'health', amount: 150.0, dueDay: 1, isActive: true },
  { id: '6', name: 'Plano de Saúde', category: 'health', amount: 450.0, dueDay: 20, isActive: true },
  { id: '7', name: 'Aluguel', category: 'housing', amount: 1800.0, dueDay: 5, isActive: true },
  { id: '8', name: 'Condomínio', category: 'housing', amount: 600.0, dueDay: 10, isActive: true },
];

const categoryConfig: Record<string, { label: string; icon: string; color: string }> = {
  utilities: { label: 'Utilidades', icon: 'flash', color: theme.warning },
  subscriptions: { label: 'Assinaturas', icon: 'play-circle', color: '#7c3aed' },
  health: { label: 'Saúde', icon: 'medical', color: theme.success },
  housing: { label: 'Moradia', icon: 'home', color: theme.primary },
  education: { label: 'Educação', icon: 'school', color: '#06b6d4' },
  other: { label: 'Outros', icon: 'ellipsis-horizontal', color: theme.muted },
};

export default function FixedExpensesScreen() {
  const [expenses, setExpenses] = useState<FixedExpense[]>(mockExpenses);
  const [refreshing, setRefreshing] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const formatCurrency = (value: number) =>
    value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  const onRefresh = async () => {
    setRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  const toggleExpense = (id: string) => {
    setExpenses(expenses.map((exp) => (exp.id === id ? { ...exp, isActive: !exp.isActive } : exp)));
  };

  const activeExpenses = expenses.filter((e) => e.isActive);
  const totalMonthly = activeExpenses.reduce((acc, exp) => acc + exp.amount, 0);
  const totalAnnual = totalMonthly * 12;

  const today = new Date().getDate();
  const upcomingExpenses = activeExpenses.filter((e) => e.dueDay >= today && e.dueDay <= today + 7);

  const filteredExpenses = activeFilter === 'all' ? expenses : expenses.filter((e) => e.category === activeFilter);

  const categoryTotals = activeExpenses.reduce((acc, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
    return acc;
  }, {} as Record<string, number>);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={theme.primary} />}
        showsVerticalScrollIndicator={false}
      >
        {/* Summary Cards */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Total Mensal</Text>
              <Text style={[styles.summaryValue, styles.summaryValueDefault]}>{formatCurrency(totalMonthly)}</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Total Anual</Text>
              <Text style={[styles.summaryValue, styles.summaryValueDefault]}>{formatCurrency(totalAnnual)}</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Em 7 dias</Text>
              <Text style={[styles.summaryValue, styles.summaryValuePending]}>
                {formatCurrency(upcomingExpenses.reduce((acc, e) => acc + e.amount, 0))}
              </Text>
            </View>
          </View>
        </View>

        {/* Section Header */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Despesas Fixas</Text>
          <TouchableOpacity style={styles.addButton}>
            <Ionicons name="add" size={18} color={theme.primaryForeground} />
            <Text style={styles.addButtonText}>Nova</Text>
          </TouchableOpacity>
        </View>

        {/* Filter Tabs */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 16 }}>
          <View style={styles.filterTabs}>
            <TouchableOpacity
              style={[styles.filterTab, activeFilter === 'all' && styles.filterTabActive]}
              onPress={() => setActiveFilter('all')}
            >
              <Text style={[styles.filterTabText, activeFilter === 'all' && styles.filterTabTextActive]}>Todas</Text>
            </TouchableOpacity>
            {Object.entries(categoryConfig).map(([key, config]) => (
              <TouchableOpacity
                key={key}
                style={[styles.filterTab, activeFilter === key && styles.filterTabActive]}
                onPress={() => setActiveFilter(key)}
              >
                <Text style={[styles.filterTabText, activeFilter === key && styles.filterTabTextActive]}>
                  {config.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* Expenses List */}
        {filteredExpenses.map((expense) => {
          const config = categoryConfig[expense.category] || categoryConfig.other;
          const daysUntilDue = expense.dueDay - today;
          
          return (
            <View key={expense.id} style={[styles.expenseCard, !expense.isActive && { opacity: 0.5 }]}>
              <View style={styles.expenseHeader}>
                <View style={[styles.expenseIcon, { backgroundColor: `${config.color}20` }]}>
                  <Ionicons name={config.icon as any} size={24} color={config.color} />
                </View>
                <View style={styles.expenseInfo}>
                  <Text style={styles.expenseTitle}>{expense.name}</Text>
                  <Text style={styles.expenseCategory}>{config.label}</Text>
                </View>
                <View style={styles.expenseAmount}>
                  <Text style={styles.expenseValue}>{formatCurrency(expense.amount)}</Text>
                  <Text
                    style={[
                      styles.expenseDueDate,
                      daysUntilDue <= 0 ? styles.expenseDueDateOverdue : daysUntilDue <= 3 ? styles.expenseDueDateWarning : styles.expenseDueDateNormal,
                    ]}
                  >
                    Dia {expense.dueDay}
                  </Text>
                </View>
              </View>

              <View style={styles.expenseActions}>
                <TouchableOpacity style={styles.expenseAction}>
                  <Ionicons name="create-outline" size={18} color={theme.foreground} />
                  <Text style={styles.expenseActionText}>Editar</Text>
                </TouchableOpacity>
                <View style={[styles.expenseAction, styles.expenseActionLast, { justifyContent: 'flex-end' }]}>
                  <Text style={styles.expenseActionText}>{expense.isActive ? 'Ativa' : 'Inativa'}</Text>
                  <Switch
                    value={expense.isActive}
                    onValueChange={() => toggleExpense(expense.id)}
                    trackColor={{ false: theme.muted, true: theme.primary }}
                    thumbColor="#ffffff"
                    style={{ marginLeft: 8 }}
                  />
                </View>
              </View>
            </View>
          );
        })}

        {/* Empty State */}
        {filteredExpenses.length === 0 && (
          <View style={styles.emptyState}>
            <View style={styles.emptyIcon}>
              <Ionicons name="receipt-outline" size={40} color={theme.mutedForeground} />
            </View>
            <Text style={styles.emptyTitle}>Nenhuma despesa fixa</Text>
            <Text style={styles.emptyText}>Adicione suas despesas recorrentes para melhor controle.</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
