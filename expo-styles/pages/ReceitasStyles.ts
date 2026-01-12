import { StyleSheet } from 'react-native';
import { colors, spacing, borderRadius, fontSize, fontWeight, shadows } from '../theme';

const theme = colors.dark;

/**
 * Styles for Receitas (Income) screen
 */
export const receitasStyles = StyleSheet.create({
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
    color: theme.success,
  },
  summaryDivider: {
    width: 1,
    backgroundColor: theme.border,
  },
  
  // Tabs
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: theme.muted,
    borderRadius: borderRadius.lg,
    padding: spacing.xs,
    marginBottom: spacing.xl,
  },
  tab: {
    flex: 1,
    paddingVertical: spacing.md,
    alignItems: 'center',
    borderRadius: borderRadius.md,
  },
  tabActive: {
    backgroundColor: theme.card,
    ...shadows.sm,
  },
  tabText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    color: theme.mutedForeground,
  },
  tabTextActive: {
    color: theme.foreground,
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
  
  // Income card
  incomeCard: {
    backgroundColor: theme.card,
    borderRadius: borderRadius.xl,
    marginBottom: spacing.md,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: theme.border,
    ...shadows.md,
  },
  incomeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
  },
  incomeIcon: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.lg,
    backgroundColor: `${theme.success}20`,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  incomeInfo: {
    flex: 1,
  },
  incomeTitle: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.semibold,
    color: theme.foreground,
  },
  incomeType: {
    fontSize: fontSize.sm,
    color: theme.mutedForeground,
    marginTop: 2,
  },
  incomeAmount: {
    alignItems: 'flex-end',
  },
  incomeValue: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: theme.success,
  },
  incomeFrequency: {
    fontSize: fontSize.xs,
    color: theme.mutedForeground,
    marginTop: 2,
  },
  
  // Income details
  incomeDetails: {
    padding: spacing.lg,
    paddingTop: 0,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.border,
  },
  detailRowLast: {
    borderBottomWidth: 0,
  },
  detailLabel: {
    fontSize: fontSize.sm,
    color: theme.mutedForeground,
  },
  detailValue: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    color: theme.foreground,
  },
  
  // Income actions
  incomeActions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: theme.border,
  },
  incomeAction: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    borderRightWidth: 1,
    borderRightColor: theme.border,
  },
  incomeActionLast: {
    borderRightWidth: 0,
  },
  incomeActionText: {
    fontSize: fontSize.sm,
    color: theme.foreground,
    marginLeft: spacing.xs,
  },
  incomeActionDelete: {
    color: theme.destructive,
  },
  
  // Type badge
  typeBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
  },
  typeBadgePF: {
    backgroundColor: `${theme.primary}20`,
  },
  typeBadgePJ: {
    backgroundColor: `${theme.warning}20`,
  },
  typeBadgeText: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.semibold,
  },
  typeBadgeTextPF: {
    color: theme.primary,
  },
  typeBadgeTextPJ: {
    color: theme.warning,
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
