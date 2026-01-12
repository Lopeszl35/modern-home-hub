import { StyleSheet } from 'react-native';
import { colors, spacing, borderRadius, fontSize, fontWeight, shadows } from './theme';

const theme = colors.dark;

/**
 * Common reusable styles across all screens
 */
export const commonStyles = StyleSheet.create({
  // Layout
  safeArea: {
    flex: 1,
    backgroundColor: theme.background,
  },
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing['3xl'],
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.background,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  
  // Cards
  card: {
    backgroundColor: theme.card,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: theme.border,
    ...shadows.md,
  },
  cardElevated: {
    backgroundColor: theme.card,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: theme.border,
    ...shadows.lg,
  },
  cardInteractive: {
    backgroundColor: theme.card,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: theme.border,
    ...shadows.md,
  },
  
  // Typography
  title: {
    fontSize: fontSize['2xl'],
    fontWeight: fontWeight.bold,
    color: theme.foreground,
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    color: theme.foreground,
  },
  heading: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.semibold,
    color: theme.foreground,
  },
  bodyText: {
    fontSize: fontSize.base,
    color: theme.foreground,
    lineHeight: 24,
  },
  mutedText: {
    fontSize: fontSize.sm,
    color: theme.mutedForeground,
  },
  smallText: {
    fontSize: fontSize.xs,
    color: theme.mutedForeground,
  },
  
  // Buttons
  primaryButton: {
    backgroundColor: theme.primary,
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.sm,
  },
  primaryButtonText: {
    color: theme.primaryForeground,
    fontSize: fontSize.base,
    fontWeight: fontWeight.semibold,
  },
  secondaryButton: {
    backgroundColor: theme.secondary,
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: theme.border,
  },
  secondaryButtonText: {
    color: theme.secondaryForeground,
    fontSize: fontSize.base,
    fontWeight: fontWeight.medium,
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: theme.border,
  },
  outlineButtonText: {
    color: theme.foreground,
    fontSize: fontSize.base,
    fontWeight: fontWeight.medium,
  },
  destructiveButton: {
    backgroundColor: theme.destructive,
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  destructiveButtonText: {
    color: theme.destructiveForeground,
    fontSize: fontSize.base,
    fontWeight: fontWeight.semibold,
  },
  
  // Inputs
  input: {
    backgroundColor: theme.muted,
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    fontSize: fontSize.base,
    color: theme.foreground,
    borderWidth: 1,
    borderColor: theme.border,
  },
  inputLabel: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    color: theme.foreground,
    marginBottom: spacing.xs,
  },
  inputError: {
    borderColor: theme.destructive,
  },
  inputErrorText: {
    fontSize: fontSize.xs,
    color: theme.destructive,
    marginTop: spacing.xs,
  },
  
  // Icons
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.lg,
    backgroundColor: theme.muted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainerPrimary: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.lg,
    backgroundColor: `${theme.primary}20`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  // Badges
  badge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
    backgroundColor: theme.muted,
  },
  badgeText: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.medium,
    color: theme.mutedForeground,
  },
  badgePrimary: {
    backgroundColor: `${theme.primary}20`,
  },
  badgePrimaryText: {
    color: theme.primary,
  },
  badgeSuccess: {
    backgroundColor: `${theme.success}20`,
  },
  badgeSuccessText: {
    color: theme.success,
  },
  badgeWarning: {
    backgroundColor: `${theme.warning}20`,
  },
  badgeWarningText: {
    color: theme.warning,
  },
  badgeDestructive: {
    backgroundColor: `${theme.destructive}20`,
  },
  badgeDestructiveText: {
    color: theme.destructive,
  },
  
  // Dividers
  divider: {
    height: 1,
    backgroundColor: theme.border,
    marginVertical: spacing.lg,
  },
  
  // Loading states
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.background,
  },
  loadingText: {
    marginTop: spacing.md,
    fontSize: fontSize.sm,
    color: theme.mutedForeground,
  },
  
  // Empty states
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing['3xl'],
  },
  emptyTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    color: theme.foreground,
    marginTop: spacing.lg,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: fontSize.sm,
    color: theme.mutedForeground,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
  
  // Overlays
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: theme.card,
    borderRadius: borderRadius['2xl'],
    padding: spacing.xl,
    marginHorizontal: spacing.xl,
    maxWidth: 400,
    width: '100%',
    ...shadows.xl,
  },
});
