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
import { creditCardsStyles as styles } from '../styles/pages/CreditCardsStyles';
import { colors } from '../styles/theme';

const theme = colors.dark;

interface CreditCard {
  id: string;
  name: string;
  lastDigits: string;
  brand: string;
  limit: number;
  usedLimit: number;
  dueDay: number;
  closingDay: number;
  color: string;
}

const mockCards: CreditCard[] = [
  { id: '1', name: 'Nubank', lastDigits: '4532', brand: 'mastercard', limit: 8000, usedLimit: 3250, dueDay: 15, closingDay: 8, color: '#7c3aed' },
  { id: '2', name: 'Itaú Platinum', lastDigits: '8821', brand: 'visa', limit: 15000, usedLimit: 4800, dueDay: 20, closingDay: 13, color: '#ea580c' },
  { id: '3', name: 'Bradesco', lastDigits: '1199', brand: 'elo', limit: 5000, usedLimit: 1200, dueDay: 10, closingDay: 3, color: '#dc2626' },
];

export default function CreditCardsScreen() {
  const navigation = useNavigation();
  const [cards] = useState<CreditCard[]>(mockCards);
  const [refreshing, setRefreshing] = useState(false);

  const formatCurrency = (value: number) =>
    value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  const onRefresh = async () => {
    setRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  const totalLimit = cards.reduce((acc, c) => acc + c.limit, 0);
  const totalUsed = cards.reduce((acc, c) => acc + c.usedLimit, 0);

  const getUsagePercentage = (used: number, limit: number) => (used / limit) * 100;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={theme.primary} />}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Cartões de Crédito</Text>
          <TouchableOpacity style={styles.addButton}>
            <Ionicons name="add" size={20} color={theme.primaryForeground} />
            <Text style={styles.addButtonText}>Novo</Text>
          </TouchableOpacity>
        </View>

        {/* Summary */}
        <View style={styles.summaryGrid}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Total Limite</Text>
            <Text style={styles.summaryValue}>{formatCurrency(totalLimit)}</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Total Usado</Text>
            <Text style={[styles.summaryValue, styles.summaryValueWarning]}>{formatCurrency(totalUsed)}</Text>
          </View>
        </View>

        {/* Cards List */}
        {cards.map((card, index) => {
          const usage = getUsagePercentage(card.usedLimit, card.limit);
          return (
            <TouchableOpacity
              key={card.id}
              style={styles.cardItem}
              activeOpacity={0.8}
              onPress={() => {/* Navigate to card details */}}
            >
              {/* Card Gradient */}
              <View style={[styles.cardGradient, { backgroundColor: card.color }]}>
                <View style={styles.cardHeader}>
                  <Text style={styles.cardBrand}>{card.name}</Text>
                  <TouchableOpacity style={styles.cardMenuButton}>
                    <Ionicons name="ellipsis-vertical" size={20} color="#fff" />
                  </TouchableOpacity>
                </View>
                <Text style={styles.cardNumber}>•••• •••• •••• {card.lastDigits}</Text>
                <View style={styles.cardFooter}>
                  <View>
                    <Text style={styles.cardLabel}>Vencimento</Text>
                    <Text style={styles.cardValue}>Dia {card.dueDay}</Text>
                  </View>
                  <View>
                    <Text style={styles.cardLabel}>Fechamento</Text>
                    <Text style={styles.cardValue}>Dia {card.closingDay}</Text>
                  </View>
                </View>
              </View>

              {/* Card Details */}
              <View style={styles.cardDetails}>
                <View style={styles.cardDetailsRow}>
                  <Text style={styles.cardDetailsLabel}>Limite Total</Text>
                  <Text style={styles.cardDetailsValue}>{formatCurrency(card.limit)}</Text>
                </View>
                <View style={styles.cardDetailsRow}>
                  <Text style={styles.cardDetailsLabel}>Usado</Text>
                  <Text style={styles.cardDetailsValue}>{formatCurrency(card.usedLimit)}</Text>
                </View>
                <View style={styles.cardDetailsRow}>
                  <Text style={styles.cardDetailsLabel}>Disponível</Text>
                  <Text style={[styles.cardDetailsValue, { color: theme.success }]}>
                    {formatCurrency(card.limit - card.usedLimit)}
                  </Text>
                </View>

                {/* Progress Bar */}
                <View style={styles.limitSection}>
                  <View style={styles.limitHeader}>
                    <Text style={styles.limitLabel}>Uso do Limite</Text>
                    <Text style={styles.limitValue}>{usage.toFixed(1)}%</Text>
                  </View>
                  <View style={styles.limitBar}>
                    <View
                      style={[
                        styles.limitFill,
                        { width: `${Math.min(usage, 100)}%` },
                        usage < 50 ? styles.limitFillSafe : usage < 80 ? styles.limitFillWarning : styles.limitFillDanger,
                      ]}
                    />
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}

        {/* Empty State */}
        {cards.length === 0 && (
          <View style={styles.emptyState}>
            <View style={styles.emptyIcon}>
              <Ionicons name="card-outline" size={40} color={theme.mutedForeground} />
            </View>
            <Text style={styles.emptyTitle}>Nenhum cartão cadastrado</Text>
            <Text style={styles.emptyText}>
              Adicione seu primeiro cartão de crédito para começar a controlar seus gastos.
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
