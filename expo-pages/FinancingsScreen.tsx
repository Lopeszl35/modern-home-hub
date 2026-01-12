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
import { useNavigation } from '@react-navigation/native';
import { financingsStyles as styles } from '../styles/pages/FinancingsStyles';
import { colors } from '../styles/theme';

const theme = colors.dark;

interface Financing {
  id: string;
  name: string;
  type: 'vehicle' | 'property' | 'personal';
  totalAmount: number;
  remainingAmount: number;
  monthlyPayment: number;
  interestRate: number;
  totalInstallments: number;
  paidInstallments: number;
  bank: string;
}

const mockFinancings: Financing[] = [
  { id: '1', name: 'Honda Civic 2023', type: 'vehicle', totalAmount: 120000, remainingAmount: 78000, monthlyPayment: 2850, interestRate: 1.29, totalInstallments: 48, paidInstallments: 15, bank: 'Banco Honda' },
  { id: '2', name: 'Apartamento Centro', type: 'property', totalAmount: 450000, remainingAmount: 380000, monthlyPayment: 3200, interestRate: 0.85, totalInstallments: 360, paidInstallments: 24, bank: 'Caixa Econômica' },
  { id: '3', name: 'Empréstimo Reforma', type: 'personal', totalAmount: 50000, remainingAmount: 35000, monthlyPayment: 1800, interestRate: 1.99, totalInstallments: 36, paidInstallments: 10, bank: 'Nubank' },
];

const typeConfig: Record<string, { label: string; icon: string; color: string }> = {
  vehicle: { label: 'Veículo', icon: 'car', color: theme.primary },
  property: { label: 'Imóvel', icon: 'home', color: theme.success },
  personal: { label: 'Pessoal', icon: 'wallet', color: theme.warning },
};

export default function FinancingsScreen() {
  const navigation = useNavigation();
  const [financings] = useState<Financing[]>(mockFinancings);
  const [refreshing, setRefreshing] = useState(false);

  const formatCurrency = (value: number) =>
    value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  const onRefresh = async () => {
    setRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  const totalDebt = financings.reduce((acc, f) => acc + f.remainingAmount, 0);
  const totalMonthlyPayment = financings.reduce((acc, f) => acc + f.monthlyPayment, 0);
  const averageRate = financings.length > 0 ? financings.reduce((acc, f) => acc + f.interestRate, 0) / financings.length : 0;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={theme.primary} />}
        showsVerticalScrollIndicator={false}
      >
        {/* Summary Card */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Resumo dos Financiamentos</Text>
          <View style={styles.summaryGrid}>
            <View style={styles.summaryItem}>
              <View style={styles.summaryItemCard}>
                <Text style={styles.summaryLabel}>Dívida Total</Text>
                <Text style={styles.summaryValue}>{formatCurrency(totalDebt)}</Text>
              </View>
            </View>
            <View style={styles.summaryItem}>
              <View style={styles.summaryItemCard}>
                <Text style={styles.summaryLabel}>Parcelas/Mês</Text>
                <Text style={[styles.summaryValue, styles.summaryValueWarning]}>{formatCurrency(totalMonthlyPayment)}</Text>
              </View>
            </View>
            <View style={styles.summaryItem}>
              <View style={styles.summaryItemCard}>
                <Text style={styles.summaryLabel}>Taxa Média</Text>
                <Text style={styles.summaryValue}>{averageRate.toFixed(2)}% a.m.</Text>
              </View>
            </View>
            <View style={styles.summaryItem}>
              <View style={styles.summaryItemCard}>
                <Text style={styles.summaryLabel}>Financiamentos</Text>
                <Text style={styles.summaryValue}>{financings.length}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Section Header */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Seus Financiamentos</Text>
          <TouchableOpacity style={styles.addButton}>
            <Ionicons name="add" size={18} color={theme.primaryForeground} />
            <Text style={styles.addButtonText}>Novo</Text>
          </TouchableOpacity>
        </View>

        {/* Financings List */}
        {financings.map((financing) => {
          const config = typeConfig[financing.type];
          const progress = ((financing.totalAmount - financing.remainingAmount) / financing.totalAmount) * 100;
          const remainingInstallments = financing.totalInstallments - financing.paidInstallments;

          return (
            <TouchableOpacity key={financing.id} style={styles.financingCard} activeOpacity={0.8}>
              <View style={styles.financingHeader}>
                <View style={[styles.financingIcon, { backgroundColor: `${config.color}20` }]}>
                  <Ionicons name={config.icon as any} size={28} color={config.color} />
                </View>
                <View style={styles.financingInfo}>
                  <Text style={styles.financingTitle}>{financing.name}</Text>
                  <Text style={styles.financingInstitution}>{financing.bank}</Text>
                </View>
                <TouchableOpacity style={styles.financingMenuButton}>
                  <Ionicons name="ellipsis-vertical" size={20} color={theme.mutedForeground} />
                </TouchableOpacity>
              </View>

              {/* Details Grid */}
              <View style={styles.financingDetails}>
                <View style={styles.detailsGrid}>
                  <View style={styles.detailItem}>
                    <View style={styles.detailCard}>
                      <Text style={styles.detailLabel}>Valor Total</Text>
                      <Text style={styles.detailValue}>{formatCurrency(financing.totalAmount)}</Text>
                    </View>
                  </View>
                  <View style={styles.detailItem}>
                    <View style={styles.detailCard}>
                      <Text style={styles.detailLabel}>Saldo Devedor</Text>
                      <Text style={styles.detailValue}>{formatCurrency(financing.remainingAmount)}</Text>
                    </View>
                  </View>
                  <View style={styles.detailItem}>
                    <View style={styles.detailCard}>
                      <Text style={styles.detailLabel}>Parcela</Text>
                      <Text style={[styles.detailValue, styles.detailValueHighlight]}>{formatCurrency(financing.monthlyPayment)}</Text>
                    </View>
                  </View>
                  <View style={styles.detailItem}>
                    <View style={styles.detailCard}>
                      <Text style={styles.detailLabel}>Taxa</Text>
                      <Text style={styles.detailValue}>{financing.interestRate}% a.m.</Text>
                    </View>
                  </View>
                </View>
              </View>

              {/* Progress Section */}
              <View style={styles.progressSection}>
                <View style={styles.progressHeader}>
                  <Text style={styles.progressLabel}>Progresso</Text>
                  <Text style={styles.progressValue}>
                    {financing.paidInstallments}/{financing.totalInstallments} parcelas
                  </Text>
                </View>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: `${progress}%` }]} />
                </View>
                <Text style={styles.progressText}>
                  {progress.toFixed(1)}% quitado • Faltam {remainingInstallments} parcelas
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}

        {/* Empty State */}
        {financings.length === 0 && (
          <View style={styles.emptyState}>
            <View style={styles.emptyIcon}>
              <Ionicons name="document-text-outline" size={40} color={theme.mutedForeground} />
            </View>
            <Text style={styles.emptyTitle}>Nenhum financiamento</Text>
            <Text style={styles.emptyText}>Adicione seus financiamentos para acompanhar o pagamento.</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
