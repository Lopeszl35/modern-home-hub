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
import { PaymentRemindersStyles as styles } from '../expo-styles/pages/PaymentRemindersStyles';
import { colors } from '../expo-styles/theme';

interface PaymentReminder {
  id: string;
  description: string;
  vendorName: string;
  amount: number;
  purchaseDate: string;
  dueDate: string;
  paymentMethod: 'pix' | 'dinheiro';
  status: 'pending' | 'paid';
  notes?: string;
  paidAt?: string;
}

const PaymentRemindersScreen = () => {
  const [reminders, setReminders] = useState<PaymentReminder[]>([
    {
      id: '1',
      description: 'Bolo de aniversário',
      vendorName: 'Maria Doces',
      amount: 150,
      purchaseDate: '2024-01-10',
      dueDate: '2024-01-15',
      paymentMethod: 'pix',
      status: 'pending',
    },
    {
      id: '2',
      description: 'Marmitas da semana',
      vendorName: 'Restaurante da Vó',
      amount: 200,
      purchaseDate: '2024-01-08',
      dueDate: '2024-01-12',
      paymentMethod: 'dinheiro',
      status: 'paid',
      paidAt: '2024-01-12',
    },
  ]);

  const pendingReminders = reminders.filter((r) => r.status === 'pending');
  const paidReminders = reminders.filter((r) => r.status === 'paid');
  const totalPending = pendingReminders.reduce((sum, r) => sum + r.amount, 0);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date();
  };

  const handleMarkAsPaid = (id: string) => {
    Alert.alert('Confirmar', 'Marcar este pagamento como pago?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Confirmar',
        onPress: () => {
          setReminders(
            reminders.map((r) =>
              r.id === id ? { ...r, status: 'paid' as const, paidAt: new Date().toISOString() } : r
            )
          );
        },
      },
    ]);
  };

  const handleDelete = (id: string) => {
    Alert.alert('Excluir', 'Deseja excluir este lembrete?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: () => setReminders(reminders.filter((r) => r.id !== id)),
      },
    ]);
  };

  const renderReminderCard = (reminder: PaymentReminder) => {
    const overdue = reminder.status === 'pending' && isOverdue(reminder.dueDate);

    return (
      <View
        key={reminder.id}
        style={[
          styles.reminderCard,
          overdue && styles.reminderCardOverdue,
          reminder.status === 'paid' && styles.paidCard,
        ]}
      >
        <View style={styles.reminderHeader}>
          <View>
            <Text style={styles.reminderTitle}>{reminder.description}</Text>
            <Text style={styles.reminderVendor}>{reminder.vendorName}</Text>
          </View>
          <View style={styles.badge}>
            <Ionicons
              name={reminder.paymentMethod === 'pix' ? 'qr-code' : 'cash'}
              size={12}
              color={colors.foreground}
            />
            <Text style={styles.badgeText}>
              {reminder.paymentMethod === 'pix' ? 'PIX' : 'Dinheiro'}
            </Text>
          </View>
        </View>

        <View style={styles.expenseRow}>
          <Text style={styles.reminderAmount}>{formatCurrency(reminder.amount)}</Text>
          <View style={styles.reminderDue}>
            <Text style={styles.reminderDueLabel}>Vencimento</Text>
            <Text
              style={[styles.reminderDueDate, overdue && styles.reminderDueDateOverdue]}
            >
              {formatDate(reminder.dueDate)}
              {overdue && ' (Atrasado)'}
            </Text>
          </View>
        </View>

        {reminder.notes && <Text style={styles.reminderNotes}>"{reminder.notes}"</Text>}

        {reminder.status === 'pending' ? (
          <View style={styles.actions}>
            <TouchableOpacity
              style={[styles.actionButton, styles.markPaidButton]}
              onPress={() => handleMarkAsPaid(reminder.id)}
            >
              <Ionicons name="checkmark-circle" size={16} color={colors.primaryForeground} />
              <Text style={styles.markPaidButtonText}>Marcar Pago</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionButton, styles.editButton]}>
              <Ionicons name="pencil" size={16} color={colors.foreground} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, styles.deleteButton]}
              onPress={() => handleDelete(reminder.id)}
            >
              <Ionicons name="trash" size={16} color={colors.primaryForeground} />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.actions}>
            <View style={[styles.badge, styles.paidBadge]}>
              <Text style={[styles.badgeText, styles.paidBadgeText]}>Pago</Text>
            </View>
            <TouchableOpacity
              style={[styles.actionButton, styles.deleteButton]}
              onPress={() => handleDelete(reminder.id)}
            >
              <Ionicons name="trash" size={16} color={colors.primaryForeground} />
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        {/* Header */}
        <View style={[styles.header, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
          <View>
            <Text style={styles.title}>Lembretes de Pagamento</Text>
            <Text style={styles.subtitle}>Gerencie pagamentos pendentes</Text>
          </View>
          <TouchableOpacity style={styles.addButton}>
            <Ionicons name="add" size={20} color={colors.primaryForeground} />
            <Text style={styles.addButtonText}>Novo</Text>
          </TouchableOpacity>
        </View>

        {/* Summary Card */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <View>
              <Text style={styles.summaryLabel}>Total Pendente</Text>
              <Text style={styles.summaryValue}>{formatCurrency(totalPending)}</Text>
            </View>
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={[styles.statValue, { color: colors.amber }]}>
                  {pendingReminders.length}
                </Text>
                <Text style={styles.statLabel}>Pendentes</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={[styles.statValue, { color: colors.success }]}>
                  {paidReminders.length}
                </Text>
                <Text style={styles.statLabel}>Pagos</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Pending Reminders */}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <Ionicons name="time" size={20} color={colors.amber} />
          <Text style={styles.sectionTitle}>Pagamentos Pendentes</Text>
        </View>

        {pendingReminders.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>Nenhum pagamento pendente</Text>
          </View>
        ) : (
          pendingReminders.map(renderReminderCard)
        )}

        {/* Paid Reminders */}
        {paidReminders.length > 0 && (
          <>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 24, marginBottom: 16 }}>
              <Ionicons name="checkmark-circle" size={20} color={colors.success} />
              <Text style={styles.sectionTitle}>Pagamentos Realizados</Text>
            </View>
            {paidReminders.map(renderReminderCard)}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default PaymentRemindersScreen;
