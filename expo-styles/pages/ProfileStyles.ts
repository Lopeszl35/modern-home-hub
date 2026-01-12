import { StyleSheet } from 'react-native';
import { colors, spacing, borderRadius, fontSize, fontWeight, shadows } from '../theme';

const theme = colors.dark;

/**
 * Styles for Profile screen
 */
export const profileStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  scrollContent: {
    padding: spacing.lg,
    paddingBottom: spacing['4xl'],
  },
  
  // Header with avatar
  headerSection: {
    alignItems: 'center',
    paddingVertical: spacing['3xl'],
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: spacing.lg,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: theme.muted,
  },
  avatarPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: `${theme.primary}20`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: fontSize['4xl'],
    fontWeight: fontWeight.bold,
    color: theme.primary,
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: theme.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: theme.background,
  },
  userName: {
    fontSize: fontSize['2xl'],
    fontWeight: fontWeight.bold,
    color: theme.foreground,
    marginBottom: spacing.xs,
  },
  userEmail: {
    fontSize: fontSize.base,
    color: theme.mutedForeground,
    marginBottom: spacing.md,
  },
  memberSince: {
    fontSize: fontSize.sm,
    color: theme.mutedForeground,
  },
  
  // Section cards
  sectionCard: {
    backgroundColor: theme.card,
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: theme.border,
    ...shadows.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  sectionIconContainer: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.lg,
    backgroundColor: `${theme.primary}20`,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    color: theme.foreground,
  },
  
  // Form fields
  fieldGroup: {
    marginBottom: spacing.lg,
  },
  fieldLabel: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    color: theme.mutedForeground,
    marginBottom: spacing.sm,
  },
  fieldValue: {
    fontSize: fontSize.base,
    color: theme.foreground,
    backgroundColor: theme.muted,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.border,
  },
  fieldInput: {
    fontSize: fontSize.base,
    color: theme.foreground,
    backgroundColor: theme.muted,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.border,
  },
  fieldRow: {
    flexDirection: 'row',
    marginHorizontal: -spacing.sm,
  },
  fieldHalf: {
    flex: 1,
    marginHorizontal: spacing.sm,
  },
  
  // Editable field
  editableField: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.muted,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.border,
  },
  editableFieldText: {
    flex: 1,
    fontSize: fontSize.base,
    color: theme.foreground,
  },
  editButton: {
    padding: spacing.sm,
  },
  
  // Toggle field
  toggleField: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.border,
  },
  toggleFieldLast: {
    borderBottomWidth: 0,
  },
  toggleLabel: {
    fontSize: fontSize.base,
    color: theme.foreground,
  },
  toggleDescription: {
    fontSize: fontSize.sm,
    color: theme.mutedForeground,
    marginTop: 2,
  },
  
  // Stats row
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: spacing.lg,
    marginBottom: spacing.lg,
    backgroundColor: theme.muted,
    borderRadius: borderRadius.xl,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: theme.primary,
  },
  statLabel: {
    fontSize: fontSize.sm,
    color: theme.mutedForeground,
    marginTop: spacing.xs,
  },
  statDivider: {
    width: 1,
    backgroundColor: theme.border,
  },
  
  // Action buttons
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.border,
  },
  actionButtonLast: {
    borderBottomWidth: 0,
  },
  actionButtonIcon: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.lg,
    backgroundColor: theme.muted,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  actionButtonText: {
    flex: 1,
    fontSize: fontSize.base,
    color: theme.foreground,
  },
  actionButtonDestructive: {
    color: theme.destructive,
  },
  
  // Save button
  saveButton: {
    backgroundColor: theme.primary,
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.lg,
    ...shadows.sm,
  },
  saveButtonText: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.semibold,
    color: theme.primaryForeground,
  },
});
