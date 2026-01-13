import { StyleSheet } from 'react-native';
import { colors, spacing, borderRadius, fontSize, shadows } from '../theme';

export const PaymentRemindersStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    padding: spacing.md,
  },
  header: {
    marginBottom: spacing.lg,
  },
  title: {
    fontSize: fontSize['2xl'],
    fontWeight: '700',
    color: colors.foreground,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: fontSize.sm,
    color: colors.mutedForeground,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
    gap: spacing.xs,
  },
  addButtonText: {
    color: colors.primaryForeground,
    fontWeight: '600',
    fontSize: fontSize.sm,
  },
  summaryCard: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.amber + '33',
    ...shadows.md,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: fontSize.sm,
    color: colors.mutedForeground,
  },
  summaryValue: {
    fontSize: fontSize['3xl'],
    fontWeight: '700',
    color: colors.foreground,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: fontSize['2xl'],
    fontWeight: '700',
  },
  statLabel: {
    fontSize: fontSize.xs,
    color: colors.mutedForeground,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    color: colors.foreground,
    marginBottom: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  reminderCard: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.sm,
  },
  reminderCardOverdue: {
    borderColor: colors.destructive + '80',
    backgroundColor: colors.destructive + '0D',
  },
  reminderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  reminderTitle: {
    fontSize: fontSize.base,
    fontWeight: '600',
    color: colors.foreground,
  },
  reminderVendor: {
    fontSize: fontSize.sm,
    color: colors.mutedForeground,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 4,
  },
  badgeText: {
    fontSize: fontSize.xs,
    color: colors.foreground,
  },
  reminderAmount: {
    fontSize: fontSize.xl,
    fontWeight: '700',
    color: colors.foreground,
  },
  reminderDue: {
    alignItems: 'flex-end',
  },
  reminderDueLabel: {
    fontSize: fontSize.xs,
    color: colors.mutedForeground,
  },
  reminderDueDate: {
    fontSize: fontSize.sm,
    fontWeight: '500',
    color: colors.foreground,
  },
  reminderDueDateOverdue: {
    color: colors.destructive,
  },
  reminderNotes: {
    fontSize: fontSize.sm,
    color: colors.mutedForeground,
    fontStyle: 'italic',
    marginBottom: spacing.sm,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
    gap: spacing.xs,
  },
  markPaidButton: {
    backgroundColor: colors.primary,
  },
  markPaidButtonText: {
    color: colors.primaryForeground,
    fontWeight: '600',
    fontSize: fontSize.sm,
  },
  editButton: {
    backgroundColor: colors.secondary,
    paddingHorizontal: spacing.md,
  },
  deleteButton: {
    backgroundColor: colors.destructive,
    paddingHorizontal: spacing.md,
  },
  emptyState: {
    alignItems: 'center',
    padding: spacing['2xl'],
  },
  emptyStateText: {
    fontSize: fontSize.base,
    color: colors.mutedForeground,
    marginTop: spacing.md,
  },
  paidBadge: {
    backgroundColor: colors.success + '1A',
    borderColor: colors.success + '33',
  },
  paidBadgeText: {
    color: colors.success,
  },
  paidCard: {
    opacity: 0.75,
  },
});
