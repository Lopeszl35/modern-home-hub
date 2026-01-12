import { StyleSheet } from 'react-native';
import { colors, spacing, borderRadius, fontSize, fontWeight, shadows } from '../theme';

const theme = colors.dark;

/**
 * Styles for Login screen
 */
export const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: spacing.xl,
  },
  
  // Logo section
  logoSection: {
    alignItems: 'center',
    marginBottom: spacing['4xl'],
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: borderRadius['2xl'],
    backgroundColor: `${theme.primary}20`,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
    ...shadows.glow(theme.primary),
  },
  appName: {
    fontSize: fontSize['3xl'],
    fontWeight: fontWeight.bold,
    color: theme.foreground,
    marginBottom: spacing.xs,
  },
  appTagline: {
    fontSize: fontSize.base,
    color: theme.mutedForeground,
  },
  
  // Form section
  formCard: {
    backgroundColor: theme.card,
    borderRadius: borderRadius['2xl'],
    padding: spacing.xl,
    borderWidth: 1,
    borderColor: theme.border,
    ...shadows.lg,
  },
  formTitle: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.semibold,
    color: theme.foreground,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  formSubtitle: {
    fontSize: fontSize.sm,
    color: theme.mutedForeground,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  
  // Input fields
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
  
  // Remember me & forgot password
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  rememberMe: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: borderRadius.sm,
    borderWidth: 2,
    borderColor: theme.border,
    marginRight: spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: theme.primary,
    borderColor: theme.primary,
  },
  rememberMeText: {
    fontSize: fontSize.sm,
    color: theme.mutedForeground,
  },
  forgotPassword: {
    padding: spacing.xs,
  },
  forgotPasswordText: {
    fontSize: fontSize.sm,
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
  
  // Divider
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.lg,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: theme.border,
  },
  dividerText: {
    fontSize: fontSize.sm,
    color: theme.mutedForeground,
    marginHorizontal: spacing.md,
  },
  
  // Social login
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  socialButton: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.lg,
    backgroundColor: theme.muted,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: theme.border,
  },
  
  // Register link
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerText: {
    fontSize: fontSize.sm,
    color: theme.mutedForeground,
  },
  registerLink: {
    padding: spacing.xs,
  },
  registerLinkText: {
    fontSize: fontSize.sm,
    color: theme.primary,
    fontWeight: fontWeight.semibold,
  },
  
  // Error message
  errorContainer: {
    backgroundColor: `${theme.destructive}20`,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
  },
  errorText: {
    flex: 1,
    fontSize: fontSize.sm,
    color: theme.destructive,
    marginLeft: spacing.sm,
  },
});
