import { StyleSheet } from 'react-native';
import { colors, spacing, borderRadius, fontSize, fontWeight, shadows } from '../theme';

const theme = colors.dark;

/**
 * Styles for Financings screen
 */
export const financingsStyles = StyleSheet.create({
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
  summaryTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    color: theme.foreground,
    marginBottom: spacing.lg,
  },
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -spacing.sm,
  },
  summaryItem: {
    width: '50%',
    padding: spacing.sm,
  },
  summaryItemCard: {
    backgroundColor: theme.muted,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
  },
  summaryLabel: {
    fontSize: fontSize.xs,
    color: theme.mutedForeground,
    marginBottom: spacing.xs,
  },
  summaryValue: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: theme.foreground,
  },
  summaryValueWarning: {
    color: theme.warning,
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
  
  // Financing card
  financingCard: {
    backgroundColor: theme.card,
    borderRadius: borderRadius.xl,
    marginBottom: spacing.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: theme.border,
    ...shadows.md,
  },
  financingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
  },
  financingIcon: {
    width: 56,
    height: 56,
    borderRadius: borderRadius.xl,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  financingInfo: {
    flex: 1,
  },
  financingTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    color: theme.foreground,
  },
  financingInstitution: {
    fontSize: fontSize.sm,
    color: theme.mutedForeground,
    marginTop: 2,
  },
  financingMenuButton: {
    padding: spacing.sm,
  },
  
  // Financing details
  financingDetails: {
    padding: spacing.lg,
    paddingTop: 0,
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -spacing.xs,
  },
  detailItem: {
    width: '50%',
    padding: spacing.xs,
  },
  detailCard: {
    backgroundColor: theme.muted,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
  },
  detailLabel: {
    fontSize: fontSize.xs,
    color: theme.mutedForeground,
    marginBottom: 2,
  },
  detailValue: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.semibold,
    color: theme.foreground,
  },
  detailValueHighlight: {
    color: theme.primary,
  },
  
  // Progress section
  progressSection: {
    padding: spacing.lg,
    paddingTop: 0,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  progressLabel: {
    fontSize: fontSize.sm,
    color: theme.mutedForeground,
  },
  progressValue: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
    color: theme.foreground,
  },
  progressBar: {
    height: 10,
    backgroundColor: theme.muted,
    borderRadius: borderRadius.full,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: theme.primary,
    borderRadius: borderRadius.full,
  },
  progressText: {
    fontSize: fontSize.xs,
    color: theme.mutedForeground,
    marginTop: spacing.xs,
    textAlign: 'center',
  },
  
  // Amortization section
  amortizationSection: {
    borderTopWidth: 1,
    borderTopColor: theme.border,
    padding: spacing.lg,
  },
  amortizationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  amortizationTitle: {
    fontSize: fontSize.base,
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
  
  // Payment row
  paymentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.border,
  },
  paymentRowLast: {
    borderBottomWidth: 0,
  },
  paymentNumber: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.full,
    backgroundColor: theme.muted,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  paymentNumberText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
    color: theme.foreground,
  },
  paymentInfo: {
    flex: 1,
  },
  paymentDate: {
    fontSize: fontSize.sm,
    color: theme.foreground,
  },
  paymentBreakdown: {
    fontSize: fontSize.xs,
    color: theme.mutedForeground,
    marginTop: 2,
  },
  paymentAmount: {
    alignItems: 'flex-end',
  },
  paymentValue: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.semibold,
    color: theme.foreground,
  },
  paymentStatus: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.full,
    marginTop: spacing.xs,
  },
  paymentStatusPaid: {
    backgroundColor: `${theme.success}20`,
  },
  paymentStatusPending: {
    backgroundColor: `${theme.warning}20`,
  },
  paymentStatusText: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.medium,
  },
  paymentStatusTextPaid: {
    color: theme.success,
  },
  paymentStatusTextPending: {
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
