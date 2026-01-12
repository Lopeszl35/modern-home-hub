import { StyleSheet } from 'react-native';
import { colors, spacing, borderRadius, fontSize, fontWeight, shadows } from '../theme';

const theme = colors.dark;

/**
 * Styles for Register screen
 */
export const registerStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: spacing.xl,
    paddingTop: spacing['4xl'],
  },
  
  // Back button
  backButton: {
    position: 'absolute',
    top: spacing.xl,
    left: spacing.lg,
    width: 40,
    height: 40,
    borderRadius: borderRadius.lg,
    backgroundColor: theme.muted,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  
  // Header
  header: {
    alignItems: 'center',
    marginBottom: spacing['3xl'],
  },
  title: {
    fontSize: fontSize['2xl'],
    fontWeight: fontWeight.bold,
    color: theme.foreground,
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: fontSize.base,
    color: theme.mutedForeground,
    textAlign: 'center',
  },
  
  // Form
  formCard: {
    backgroundColor: theme.card,
    borderRadius: borderRadius['2xl'],
    padding: spacing.xl,
    borderWidth: 1,
    borderColor: theme.border,
    ...shadows.lg,
  },
  
  // Input fields
  inputRow: {
    flexDirection: 'row',
    marginHorizontal: -spacing.sm,
  },
  inputHalf: {
    flex: 1,
    marginHorizontal: spacing.sm,
  },
  inputGroup: {
    marginBottom: spacing.lg,
  },
  inputLabel: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    color: theme.foreground,
    marginBottom: spacing.sm,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.muted,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.border,
    paddingHorizontal: spacing.md,
  },
  inputContainerFocused: {
    borderColor: theme.primary,
  },
  inputContainerError: {
    borderColor: theme.destructive,
  },
  inputIcon: {
    marginRight: spacing.sm,
  },
  input: {
    flex: 1,
    paddingVertical: spacing.md,
    fontSize: fontSize.base,
    color: theme.foreground,
  },
  inputPasswordToggle: {
    padding: spacing.sm,
  },
  inputError: {
    fontSize: fontSize.xs,
    color: theme.destructive,
    marginTop: spacing.xs,
  },
  
  // Password strength
  strengthContainer: {
    marginTop: spacing.sm,
  },
  strengthBars: {
    flexDirection: 'row',
    gap: spacing.xs,
    marginBottom: spacing.xs,
  },
  strengthBar: {
    flex: 1,
    height: 4,
    borderRadius: borderRadius.full,
    backgroundColor: theme.muted,
  },
  strengthBarActive: {
    backgroundColor: theme.primary,
  },
  strengthBarWeak: {
    backgroundColor: theme.destructive,
  },
  strengthBarMedium: {
    backgroundColor: theme.warning,
  },
  strengthBarStrong: {
    backgroundColor: theme.success,
  },
  strengthText: {
    fontSize: fontSize.xs,
    color: theme.mutedForeground,
  },
  
  // Terms
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.xl,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: borderRadius.sm,
    borderWidth: 2,
    borderColor: theme.border,
    marginRight: spacing.md,
    marginTop: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: theme.primary,
    borderColor: theme.primary,
  },
  termsText: {
    flex: 1,
    fontSize: fontSize.sm,
    color: theme.mutedForeground,
    lineHeight: 20,
  },
  termsLink: {
    color: theme.primary,
    fontWeight: fontWeight.medium,
  },
  
  // Submit button
  submitButton: {
    backgroundColor: theme.primary,
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
    ...shadows.sm,
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.semibold,
    color: theme.primaryForeground,
  },
  
  // Login link
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.lg,
  },
  loginText: {
    fontSize: fontSize.sm,
    color: theme.mutedForeground,
  },
  loginLink: {
    padding: spacing.xs,
  },
  loginLinkText: {
    fontSize: fontSize.sm,
    color: theme.primary,
    fontWeight: fontWeight.semibold,
  },
  
  // Success state
  successContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing['3xl'],
  },
  successIcon: {
    width: 80,
    height: 80,
    borderRadius: borderRadius.full,
    backgroundColor: `${theme.success}20`,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xl,
  },
  successTitle: {
    fontSize: fontSize['2xl'],
    fontWeight: fontWeight.bold,
    color: theme.foreground,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  successText: {
    fontSize: fontSize.base,
    color: theme.mutedForeground,
    textAlign: 'center',
  },
});
