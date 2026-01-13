import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { SurpriseExpensesStyles as styles } from '../expo-styles/pages/SurpriseExpensesStyles';
import { colors } from '../expo-styles/theme';

interface SurpriseExpense {
  id: string;
  description: string;
  category: 'car' | 'health' | 'home' | 'appliance' | 'pet' | 'other';
  amount: number;
  date: string;
  notes?: string;
}

const categoryConfig = {
  car: { label: 'Veículo', icon: 'car', bgStyle: 'categoryCarBg', textStyle: 'categoryCarText' },
  health: { label: 'Saúde', icon: 'heart', bgStyle: 'categoryHealthBg', textStyle: 'categoryHealthText' },
  home: { label: 'Casa', icon: 'home', bgStyle: 'categoryHomeBg', textStyle: 'categoryHomeText' },
  appliance: { label: 'Eletrodoméstico', icon: 'tv', bgStyle: 'categoryApplianceBg', textStyle: 'categoryApplianceText' },
  pet: { label: 'Pet', icon: 'paw', bgStyle: 'categoryPetBg', textStyle: 'categoryPetText' },
  other: { label: 'Outros', icon: 'help-circle', bgStyle: 'categoryOtherBg', textStyle: 'categoryOtherText' },
};

const SurpriseExpensesScreen = () => {
  const [expenses, setExpenses] = useState<SurpriseExpense[]>([
    {
      id: '1',
      description: 'Troca de pneu furado',
      category: 'car',
      amount: 450,
      date: '2024-01-10',
      notes: 'Pneu traseiro direito',
    },
    {
      id: '2',
      description: 'Consulta veterinária de emergência',
      category: 'pet',
      amount: 280,
      date: '2024-01-08',
    },
    {
      id: '3',
      description: 'Conserto da máquina de lavar',
      category: 'appliance',
      amount: 350,
      date: '2024-01-05',
      notes: 'Troca da placa eletrônica',
    },
  ]);

  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);

  const expensesByCategory = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {} as Record<string, number>);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const handleDelete = (id: string) => {
    Alert.alert('Excluir', 'Deseja excluir este gasto?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: () => setExpenses(expenses.filter((e) => e.id !== id)),
      },
    ]);
  };

  const getCategoryStyle = (category: string, type: 'bg' | 'text') => {
    const config = categoryConfig[category as keyof typeof categoryConfig];
    if (type === 'bg') {
      return styles[config.bgStyle as keyof typeof styles];
    }
    return styles[config.textStyle as keyof typeof styles];
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        {/* Header */}
        <View style={[styles.header, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
          <View>
            <Text style={styles.title}>Gastos Surpresa</Text>
            <Text style={styles.subtitle}>Registre gastos inesperados</Text>
          </View>
          <TouchableOpacity style={styles.addButton}>
            <Ionicons name="add" size={20} color={colors.primaryForeground} />
            <Text style={styles.addButtonText}>Novo</Text>
          </TouchableOpacity>
        </View>

        {/* Summary Card */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryHeader}>
            <Ionicons name="warning" size={24} color={colors.destructive} />
            <View>
              <Text style={styles.summaryLabel}>Total em Gastos Surpresa</Text>
              <Text style={styles.summaryValue}>{formatCurrency(totalExpenses)}</Text>
            </View>
          </View>

          <View style={styles.categoryBadges}>
            {Object.entries(expensesByCategory).map(([category, amount]) => {
              const config = categoryConfig[category as keyof typeof categoryConfig];
              return (
                <View
                  key={category}
                  style={[styles.categoryBadge, getCategoryStyle(category, 'bg')]}
                >
                  <Ionicons
                    name={config.icon as any}
                    size={12}
                    color={getCategoryStyle(category, 'text')?.color || colors.foreground}
                  />
                  <Text style={[styles.categoryBadgeText, getCategoryStyle(category, 'text')]}>
                    {config.label}: {formatCurrency(amount)}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* Expenses List */}
        <Text style={styles.sectionTitle}>Histórico de Gastos</Text>

        {expenses.length === 0 ? (
          <View style={styles.emptyState}>
            <View style={styles.emptyStateIcon}>
              <Ionicons name="warning" size={48} color={colors.mutedForeground} />
            </View>
            <Text style={styles.emptyStateText}>Nenhum gasto surpresa registrado</Text>
            <Text style={styles.emptyStateSubtext}>
              Isso é ótimo! Significa que não houve imprevistos.
            </Text>
          </View>
        ) : (
          expenses.map((expense) => {
            const config = categoryConfig[expense.category];
            return (
              <View key={expense.id} style={styles.expenseCard}>
                <View style={styles.expenseHeader}>
                  <View style={[styles.categoryIcon, getCategoryStyle(expense.category, 'bg')]}>
                    <Ionicons
                      name={config.icon as any}
                      size={20}
                      color={getCategoryStyle(expense.category, 'text')?.color || colors.foreground}
                    />
                  </View>
                  <View style={styles.expenseInfo}>
                    <Text style={styles.expenseTitle}>{expense.description}</Text>
                    <Text style={styles.expenseCategory}>{config.label}</Text>
                  </View>
                </View>

                <View style={styles.expenseRow}>
                  <Text style={styles.expenseAmount}>{formatCurrency(expense.amount)}</Text>
                  <Text style={styles.expenseDate}>{formatDate(expense.date)}</Text>
                </View>

                {expense.notes && (
                  <Text style={styles.expenseNotes}>"{expense.notes}"</Text>
                )}

                <View style={styles.actions}>
                  <TouchableOpacity style={[styles.actionButton, styles.editButton]}>
                    <Ionicons name="pencil" size={16} color={colors.foreground} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.actionButton, styles.deleteButton]}
                    onPress={() => handleDelete(expense.id)}
                  >
                    <Ionicons name="trash" size={16} color={colors.primaryForeground} />
                  </TouchableOpacity>
                </View>
              </View>
            );
          })
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default SurpriseExpensesScreen;
