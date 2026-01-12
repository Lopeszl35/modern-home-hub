import { StyleSheet } from 'react-native';
import { colors, spacing, borderRadius, fontSize, fontWeight, shadows } from '../theme';

const theme = colors.dark;

/**
 * Styles for Gastos Variáveis (Variable Expenses) screen
 */
export const gastosVariaveisStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  scrollContent: {
    padding: spacing.lg,
    paddingBottom: spacing['4xl'],
  },
  
  // Header summary
  headerCard: {
    backgroundColor: theme.card,
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
    marginBottom: spacing.xl,
    borderWidth: 1,
    borderColor: theme.border,
    ...shadows.lg,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  headerTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    color: theme.foreground,
  },
  monthSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.muted,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.lg,
  },
  monthText: {
    fontSize: fontSize.sm,
    color: theme.foreground,
    marginHorizontal: spacing.sm,
  },
  
  // Spending summary
  spendingSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  spendingItem: {
    alignItems: 'center',
    flex: 1,
  },
  spendingLabel: {
    fontSize: fontSize.xs,
    color: theme.mutedForeground,
    marginBottom: spacing.xs,
  },
  spendingValue: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: theme.foreground,
  },
  spendingValueSuccess: {
    color: theme.success,
  },
  spendingValueWarning: {
    color: theme.warning,
  },
  spendingValueDanger: {
    color: theme.destructive,
  },
  spendingDivider: {
    width: 1,
    backgroundColor: theme.border,
    marginHorizontal: spacing.md,
  },
  
  // Progress bar
  progressContainer: {
    marginTop: spacing.md,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  progressLabel: {
    fontSize: fontSize.sm,
    color: theme.mutedForeground,
  },
  progressPercent: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
  },
  progressBar: {
    height: 8,
    backgroundColor: theme.muted,
    borderRadius: borderRadius.full,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: borderRadius.full,
  },
  
  // Categories section
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
  addCategoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.muted,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.border,
  },
  addCategoryText: {
    fontSize: fontSize.sm,
    color: theme.foreground,
    marginLeft: spacing.xs,
  },
  
  // Category card
  categoryCard: {
    backgroundColor: theme.card,
    borderRadius: borderRadius.xl,
    marginBottom: spacing.md,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: theme.border,
    ...shadows.md,
  },
  categoryCardExpanded: {
    borderColor: theme.primary,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryName: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.semibold,
    color: theme.foreground,
  },
  categoryBudget: {
    fontSize: fontSize.sm,
    color: theme.mutedForeground,
    marginTop: 2,
  },
  categoryAmount: {
    alignItems: 'flex-end',
  },
  categorySpent: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: theme.foreground,
  },
  categoryRemaining: {
    fontSize: fontSize.sm,
    marginTop: 2,
  },
  
  // Category progress
  categoryProgress: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
  },
  categoryProgressBar: {
    height: 6,
    backgroundColor: theme.muted,
    borderRadius: borderRadius.full,
    overflow: 'hidden',
  },
  
  // Category expenses list
  categoryExpenses: {
    borderTopWidth: 1,
    borderTopColor: theme.border,
  },
  expenseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: theme.border,
  },
  expenseItemLast: {
    borderBottomWidth: 0,
  },
  expenseInfo: {
    flex: 1,
  },
  expenseTitle: {
    fontSize: fontSize.base,
    color: theme.foreground,
  },
  expenseDate: {
    fontSize: fontSize.sm,
    color: theme.mutedForeground,
    marginTop: 2,
  },
  expenseAmount: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.semibold,
    color: theme.foreground,
  },
  
  // Add expense button
  addExpenseButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.border,
    backgroundColor: theme.muted,
  },
  addExpenseText: {
    fontSize: fontSize.sm,
    color: theme.primary,
    fontWeight: fontWeight.medium,
    marginLeft: spacing.xs,
  },
  
  // Category actions
  categoryActions: {
    flexDirection: 'row',
    padding: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: theme.border,
    gap: spacing.sm,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.lg,
    backgroundColor: theme.muted,
  },
  actionButtonText: {
    fontSize: fontSize.sm,
    color: theme.foreground,
    marginLeft: spacing.xs,
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
  emptyButton: {
    backgroundColor: theme.primary,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.lg,
  },
  emptyButtonText: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.semibold,
    color: theme.primaryForeground,
  },
});
