import { StyleSheet } from 'react-native';
import { colors, spacing, borderRadius, fontSize, fontWeight, shadows } from '../theme';

const theme = colors.dark;

/**
 * Styles for Fixed Expenses screen
 */
export const fixedExpensesStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  scrollContent: {
    padding: spacing.lg,
    paddingBottom: spacing['4xl'],
  },
  
  // Summary header
  summaryCard: {
    backgroundColor: theme.card,
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
    marginBottom: spacing.xl,
    borderWidth: 1,
    borderColor: theme.border,
    ...shadows.lg,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: fontSize.sm,
    color: theme.mutedForeground,
    marginBottom: spacing.xs,
  },
  summaryValue: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
  },
  summaryValueDefault: {
    color: theme.foreground,
  },
  summaryValuePaid: {
    color: theme.success,
  },
  summaryValuePending: {
    color: theme.warning,
  },
  summaryDivider: {
    width: 1,
    backgroundColor: theme.border,
  },
  
  // Section header
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    color: theme.foreground,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.lg,
  },
  addButtonText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
    color: theme.primaryForeground,
    marginLeft: spacing.xs,
  },
  
  // Filter tabs
  filterTabs: {
    flexDirection: 'row',
    marginBottom: spacing.lg,
    gap: spacing.sm,
  },
  filterTab: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    backgroundColor: theme.muted,
    borderWidth: 1,
    borderColor: theme.border,
  },
  filterTabActive: {
    backgroundColor: `${theme.primary}20`,
    borderColor: theme.primary,
  },
  filterTabText: {
    fontSize: fontSize.sm,
    color: theme.mutedForeground,
  },
  filterTabTextActive: {
    color: theme.primary,
    fontWeight: fontWeight.medium,
  },
  
  // Expense card
  expenseCard: {
    backgroundColor: theme.card,
    borderRadius: borderRadius.xl,
    marginBottom: spacing.md,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: theme.border,
    ...shadows.md,
  },
  expenseCardOverdue: {
    borderColor: theme.destructive,
  },
  expenseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
  },
  expenseIcon: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  expenseInfo: {
    flex: 1,
  },
  expenseTitle: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.semibold,
    color: theme.foreground,
  },
  expenseCategory: {
    fontSize: fontSize.sm,
    color: theme.mutedForeground,
    marginTop: 2,
  },
  expenseAmount: {
    alignItems: 'flex-end',
  },
  expenseValue: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: theme.foreground,
  },
  expenseDueDate: {
    fontSize: fontSize.xs,
    marginTop: 2,
  },
  expenseDueDateNormal: {
    color: theme.mutedForeground,
  },
  expenseDueDateWarning: {
    color: theme.warning,
  },
  expenseDueDateOverdue: {
    color: theme.destructive,
  },
  
  // Status badge
  statusBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
    marginTop: spacing.xs,
  },
  statusBadgePaid: {
    backgroundColor: `${theme.success}20`,
  },
  statusBadgePending: {
    backgroundColor: `${theme.warning}20`,
  },
  statusBadgeOverdue: {
    backgroundColor: `${theme.destructive}20`,
  },
  statusBadgeText: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.semibold,
  },
  statusBadgeTextPaid: {
    color: theme.success,
  },
  statusBadgeTextPending: {
    color: theme.warning,
  },
  statusBadgeTextOverdue: {
    color: theme.destructive,
  },
  
  // Expense actions
  expenseActions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: theme.border,
  },
  expenseAction: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    borderRightWidth: 1,
    borderRightColor: theme.border,
  },
  expenseActionLast: {
    borderRightWidth: 0,
  },
  expenseActionText: {
    fontSize: fontSize.sm,
    color: theme.foreground,
    marginLeft: spacing.xs,
  },
  expenseActionPay: {
    color: theme.success,
  },
  
  // Empty state
  emptyState: {
    alignItems: 'center',
    padding: spacing['4xl'],
  },
  emptyIcon: {
    width: 80,
    height: 80,
    borderRadius: borderRadius['2xl'],
    backgroundColor: theme.muted,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xl,
  },
  emptyTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    color: theme.foreground,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: fontSize.sm,
    color: theme.mutedForeground,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
});
