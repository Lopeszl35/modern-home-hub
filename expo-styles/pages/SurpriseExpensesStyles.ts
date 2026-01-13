import { StyleSheet } from 'react-native';
import { colors, spacing, borderRadius, fontSize, shadows } from '../theme';

export const SurpriseExpensesStyles = StyleSheet.create({
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
    borderColor: colors.destructive + '33',
    ...shadows.md,
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
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
  categoryBadges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    gap: 4,
  },
  categoryBadgeText: {
    fontSize: fontSize.xs,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    color: colors.foreground,
    marginBottom: spacing.md,
  },
  expenseCard: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.sm,
  },
  expenseHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  categoryIcon: {
    padding: spacing.sm,
    borderRadius: borderRadius.md,
  },
  expenseInfo: {
    flex: 1,
  },
  expenseTitle: {
    fontSize: fontSize.base,
    fontWeight: '600',
    color: colors.foreground,
  },
  expenseCategory: {
    fontSize: fontSize.sm,
    color: colors.mutedForeground,
  },
  expenseRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  expenseAmount: {
    fontSize: fontSize.xl,
    fontWeight: '700',
    color: colors.foreground,
  },
  expenseDate: {
    fontSize: fontSize.sm,
    color: colors.mutedForeground,
  },
  expenseNotes: {
    fontSize: fontSize.sm,
    color: colors.mutedForeground,
    fontStyle: 'italic',
    marginBottom: spacing.sm,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: spacing.sm,
  },
  actionButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
  },
  editButton: {
    backgroundColor: colors.secondary,
  },
  deleteButton: {
    backgroundColor: colors.destructive,
  },
  emptyState: {
    alignItems: 'center',
    padding: spacing['2xl'],
  },
  emptyStateIcon: {
    marginBottom: spacing.md,
  },
  emptyStateText: {
    fontSize: fontSize.base,
    color: colors.mutedForeground,
    textAlign: 'center',
  },
  emptyStateSubtext: {
    fontSize: fontSize.sm,
    color: colors.mutedForeground,
    textAlign: 'center',
    marginTop: spacing.xs,
  },
  // Category colors
  categoryCarBg: {
    backgroundColor: colors.info + '1A',
  },
  categoryCarText: {
    color: colors.info,
  },
  categoryHealthBg: {
    backgroundColor: colors.destructive + '1A',
  },
  categoryHealthText: {
    color: colors.destructive,
  },
  categoryHomeBg: {
    backgroundColor: colors.amber + '1A',
  },
  categoryHomeText: {
    color: colors.amber,
  },
  categoryApplianceBg: {
    backgroundColor: colors.purple + '1A',
  },
  categoryApplianceText: {
    color: colors.purple,
  },
  categoryPetBg: {
    backgroundColor: colors.success + '1A',
  },
  categoryPetText: {
    color: colors.success,
  },
  categoryOtherBg: {
    backgroundColor: colors.muted,
  },
  categoryOtherText: {
    color: colors.mutedForeground,
  },
});
