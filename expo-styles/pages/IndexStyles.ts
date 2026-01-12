import { StyleSheet } from 'react-native';
import { colors, spacing, borderRadius, fontSize, fontWeight, shadows } from '../theme';

const theme = colors.dark;

/**
 * Styles for Index/Dashboard screen
 */
export const indexStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  scrollContent: {
    padding: spacing.lg,
    paddingBottom: spacing['4xl'],
  },
  
  // Header section
  header: {
    marginBottom: spacing.xl,
  },
  greeting: {
    fontSize: fontSize.lg,
    color: theme.mutedForeground,
    marginBottom: spacing.xs,
  },
  userName: {
    fontSize: fontSize['2xl'],
    fontWeight: fontWeight.bold,
    color: theme.foreground,
  },
  
  // Stats grid
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -spacing.sm,
    marginBottom: spacing.xl,
  },
  statCardWrapper: {
    width: '50%',
    padding: spacing.sm,
  },
  statCard: {
    backgroundColor: theme.card,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: theme.border,
    ...shadows.md,
  },
  statCardGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    borderTopLeftRadius: borderRadius.xl,
    borderTopRightRadius: borderRadius.xl,
  },
  statIconContainer: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  statTitle: {
    fontSize: fontSize.sm,
    color: theme.mutedForeground,
    marginBottom: spacing.xs,
  },
  statValue: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: theme.foreground,
  },
  statTrend: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  statTrendText: {
    fontSize: fontSize.xs,
    marginLeft: spacing.xs,
  },
  statTrendPositive: {
    color: theme.success,
  },
  statTrendNegative: {
    color: theme.destructive,
  },
  
  // Monthly overview
  monthlyOverviewCard: {
    backgroundColor: theme.card,
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
    marginBottom: spacing.xl,
    borderWidth: 1,
    borderColor: theme.border,
    ...shadows.lg,
  },
  monthlyOverviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  monthlyOverviewTitle: {
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
  monthSelectorText: {
    fontSize: fontSize.sm,
    color: theme.foreground,
    marginHorizontal: spacing.sm,
  },
  
  // Progress bars
  progressSection: {
    marginTop: spacing.lg,
  },
  progressItem: {
    marginBottom: spacing.lg,
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
  progressValue: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    color: theme.foreground,
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
  
  // Quick actions
  quickActionsSection: {
    marginBottom: spacing.xl,
  },
  quickActionsTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    color: theme.foreground,
    marginBottom: spacing.md,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -spacing.xs,
  },
  quickActionButton: {
    width: '25%',
    padding: spacing.xs,
  },
  quickActionContent: {
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: theme.card,
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: theme.border,
  },
  quickActionIcon: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  quickActionLabel: {
    fontSize: fontSize.xs,
    color: theme.mutedForeground,
    textAlign: 'center',
  },
  
  // Recent transactions
  transactionsSection: {
    marginBottom: spacing.xl,
  },
  transactionsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  transactionsTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    color: theme.foreground,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    fontSize: fontSize.sm,
    color: theme.primary,
    marginRight: spacing.xs,
  },
  transactionCard: {
    backgroundColor: theme.card,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: theme.border,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.border,
  },
  transactionItemLast: {
    borderBottomWidth: 0,
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionTitle: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.medium,
    color: theme.foreground,
  },
  transactionCategory: {
    fontSize: fontSize.sm,
    color: theme.mutedForeground,
    marginTop: 2,
  },
  transactionAmount: {
    alignItems: 'flex-end',
  },
  transactionValue: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.semibold,
  },
  transactionDate: {
    fontSize: fontSize.xs,
    color: theme.mutedForeground,
    marginTop: 2,
  },
  incomeValue: {
    color: theme.success,
  },
  expenseValue: {
    color: theme.destructive,
  },
});
