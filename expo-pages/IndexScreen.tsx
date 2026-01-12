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
import { indexStyles as styles } from '../styles/pages/IndexStyles';
import { colors } from '../styles/theme';

const theme = colors.dark;

// Types
interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date: string;
}

interface QuickAction {
  id: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
}

// Mock data
const mockTransactions: Transaction[] = [
  { id: '1', description: 'Salário', amount: 5000, type: 'income', category: 'Trabalho', date: '2024-12-28' },
  { id: '2', description: 'Supermercado Extra', amount: 350.5, type: 'expense', category: 'Alimentação', date: '2024-12-27' },
  { id: '3', description: 'Dividendos PETR4', amount: 120.75, type: 'income', category: 'Investimentos', date: '2024-12-26' },
  { id: '4', description: 'Netflix', amount: 55.9, type: 'expense', category: 'Streaming', date: '2024-12-25' },
  { id: '5', description: 'Uber', amount: 28.0, type: 'expense', category: 'Transporte', date: '2024-12-24' },
];

const quickActions: QuickAction[] = [
  { id: '1', label: 'Receita', icon: 'arrow-up', color: theme.success },
  { id: '2', label: 'Despesa', icon: 'arrow-down', color: theme.destructive },
  { id: '3', label: 'Investir', icon: 'trending-up', color: theme.primary },
  { id: '4', label: 'Meta', icon: 'flag', color: theme.warning },
];

export default function IndexScreen() {
  const [refreshing, setRefreshing] = useState(false);

  // Mock summary data
  const totalBalance = 15750.25;
  const monthlyIncome = 5120.75;
  const monthlyExpenses = 2340.4;
  const totalInvestments = 25000.0;

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

  const formatDate = (date: string) => new Date(date).toLocaleDateString('pt-BR');

  const onRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  const stats = [
    { title: 'Saldo Total', value: formatCurrency(totalBalance), icon: 'wallet', color: theme.primary, trend: '+12.5%' },
    { title: 'Receitas', value: formatCurrency(monthlyIncome), icon: 'trending-up', color: theme.success, trend: '+8.2%' },
    { title: 'Despesas', value: formatCurrency(monthlyExpenses), icon: 'trending-down', color: theme.destructive, trend: '-3.1%' },
    { title: 'Investimentos', value: formatCurrency(totalInvestments), icon: 'pie-chart', color: theme.warning, trend: '+15.8%' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={theme.primary} />}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.greeting}>Bem-vindo de volta!</Text>
          <Text style={styles.userName}>João Silva</Text>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          {stats.map((stat, index) => (
            <View key={index} style={styles.statCardWrapper}>
              <View style={styles.statCard}>
                <View style={[styles.statCardGradient, { backgroundColor: stat.color }]} />
                <View style={[styles.statIconContainer, { backgroundColor: `${stat.color}20` }]}>
                  <Ionicons name={stat.icon as any} size={24} color={stat.color} />
                </View>
                <Text style={styles.statTitle}>{stat.title}</Text>
                <Text style={styles.statValue}>{stat.value}</Text>
                <View style={styles.statTrend}>
                  <Ionicons
                    name={stat.trend.startsWith('+') ? 'arrow-up' : 'arrow-down'}
                    size={12}
                    color={stat.trend.startsWith('+') ? theme.success : theme.destructive}
                  />
                  <Text style={[styles.statTrendText, stat.trend.startsWith('+') ? styles.statTrendPositive : styles.statTrendNegative]}>
                    {stat.trend}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsSection}>
          <Text style={styles.quickActionsTitle}>Ações Rápidas</Text>
          <View style={styles.quickActionsGrid}>
            {quickActions.map((action) => (
              <TouchableOpacity key={action.id} style={styles.quickActionButton} activeOpacity={0.7}>
                <View style={styles.quickActionContent}>
                  <View style={[styles.quickActionIcon, { backgroundColor: `${action.color}20` }]}>
                    <Ionicons name={action.icon} size={22} color={action.color} />
                  </View>
                  <Text style={styles.quickActionLabel}>{action.label}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent Transactions */}
        <View style={styles.transactionsSection}>
          <View style={styles.transactionsHeader}>
            <Text style={styles.transactionsTitle}>Transações Recentes</Text>
            <TouchableOpacity style={styles.viewAllButton}>
              <Text style={styles.viewAllText}>Ver todas</Text>
              <Ionicons name="chevron-forward" size={16} color={theme.primary} />
            </TouchableOpacity>
          </View>

          <View style={styles.transactionCard}>
            {mockTransactions.map((transaction, index) => (
              <View
                key={transaction.id}
                style={[styles.transactionItem, index === mockTransactions.length - 1 && styles.transactionItemLast]}
              >
                <View
                  style={[
                    styles.transactionIcon,
                    { backgroundColor: transaction.type === 'income' ? `${theme.success}20` : `${theme.destructive}20` },
                  ]}
                >
                  <Ionicons
                    name={transaction.type === 'income' ? 'arrow-up' : 'arrow-down'}
                    size={20}
                    color={transaction.type === 'income' ? theme.success : theme.destructive}
                  />
                </View>
                <View style={styles.transactionInfo}>
                  <Text style={styles.transactionTitle}>{transaction.description}</Text>
                  <Text style={styles.transactionCategory}>{transaction.category}</Text>
                </View>
                <View style={styles.transactionAmount}>
                  <Text style={[styles.transactionValue, transaction.type === 'income' ? styles.incomeValue : styles.expenseValue]}>
                    {transaction.type === 'income' ? '+' : '-'}
                    {formatCurrency(transaction.amount)}
                  </Text>
                  <Text style={styles.transactionDate}>{formatDate(transaction.date)}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
