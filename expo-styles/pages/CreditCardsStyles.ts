import { StyleSheet } from 'react-native';
import { colors, spacing, borderRadius, fontSize, fontWeight, shadows } from '../theme';

const theme = colors.dark;

/**
 * Styles for Credit Cards screen
 */
export const creditCardsStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  scrollContent: {
    padding: spacing.lg,
    paddingBottom: spacing['4xl'],
  },
  
  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  headerTitle: {
    fontSize: fontSize['2xl'],
    fontWeight: fontWeight.bold,
    color: theme.foreground,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.primary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.lg,
    ...shadows.sm,
  },
  addButtonText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
    color: theme.primaryForeground,
    marginLeft: spacing.sm,
  },
  
  // Summary cards
  summaryGrid: {
    flexDirection: 'row',
    marginHorizontal: -spacing.sm,
    marginBottom: spacing.xl,
  },
  summaryCard: {
    flex: 1,
    marginHorizontal: spacing.sm,
    backgroundColor: theme.card,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: theme.border,
    ...shadows.md,
  },
  summaryLabel: {
    fontSize: fontSize.sm,
    color: theme.mutedForeground,
    marginBottom: spacing.xs,
  },
  summaryValue: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: theme.foreground,
  },
  summaryValueSuccess: {
    color: theme.success,
  },
  summaryValueWarning: {
    color: theme.warning,
  },
  
  // Credit card item
  cardItem: {
    backgroundColor: theme.card,
    borderRadius: borderRadius.xl,
    marginBottom: spacing.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: theme.border,
    ...shadows.md,
  },
  cardGradient: {
    padding: spacing.xl,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.xl,
  },
  cardBrand: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: '#ffffff',
  },
  cardMenuButton: {
    padding: spacing.sm,
  },
  cardNumber: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.medium,
    color: '#ffffff',
    letterSpacing: 2,
    marginBottom: spacing.lg,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardLabel: {
    fontSize: fontSize.xs,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 2,
  },
  cardValue: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    color: '#ffffff',
  },
  
  // Card details section
  cardDetails: {
    padding: spacing.lg,
    backgroundColor: theme.card,
  },
  cardDetailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  cardDetailsLabel: {
    fontSize: fontSize.sm,
    color: theme.mutedForeground,
  },
  cardDetailsValue: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    color: theme.foreground,
  },
  
  // Limit progress
  limitSection: {
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.border,
  },
  limitHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  limitLabel: {
    fontSize: fontSize.sm,
    color: theme.mutedForeground,
  },
  limitValue: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
    color: theme.foreground,
  },
  limitBar: {
    height: 8,
    backgroundColor: theme.muted,
    borderRadius: borderRadius.full,
    overflow: 'hidden',
  },
  limitFill: {
    height: '100%',
    borderRadius: borderRadius.full,
  },
  limitFillSafe: {
    backgroundColor: theme.success,
  },
  limitFillWarning: {
    backgroundColor: theme.warning,
  },
  limitFillDanger: {
    backgroundColor: theme.destructive,
  },
  
  // Expenses list
  expensesSection: {
    marginTop: spacing.lg,
  },
  expensesSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  expensesSectionTitle: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.semibold,
    color: theme.foreground,
  },
  expenseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.border,
  },
  expenseItemLast: {
    borderBottomWidth: 0,
  },
  expenseIcon: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.lg,
    backgroundColor: theme.muted,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  expenseInfo: {
    flex: 1,
  },
  expenseTitle: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.medium,
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
    color: theme.destructive,
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
  },
  emptyText: {
    fontSize: fontSize.sm,
    color: theme.mutedForeground,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
});
