import { StyleSheet } from 'react-native';
import { colors, spacing, borderRadius, fontSize, fontWeight, shadows } from '../theme';

const theme = colors.dark;

/**
 * Styles for Settings screen
 */
export const settingsStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  scrollContent: {
    padding: spacing.lg,
    paddingBottom: spacing['4xl'],
  },
  
  // Section
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
    color: theme.mutedForeground,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: spacing.md,
    marginLeft: spacing.sm,
  },
  sectionCard: {
    backgroundColor: theme.card,
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: theme.border,
    overflow: 'hidden',
    ...shadows.md,
  },
  
  // Setting item
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: theme.border,
  },
  settingItemLast: {
    borderBottomWidth: 0,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.medium,
    color: theme.foreground,
  },
  settingDescription: {
    fontSize: fontSize.sm,
    color: theme.mutedForeground,
    marginTop: 2,
  },
  settingValue: {
    fontSize: fontSize.sm,
    color: theme.mutedForeground,
    marginRight: spacing.sm,
  },
  
  // Toggle switch
  toggleSwitch: {
    width: 51,
    height: 31,
    borderRadius: 15.5,
    backgroundColor: theme.muted,
    padding: 2,
    justifyContent: 'center',
  },
  toggleSwitchActive: {
    backgroundColor: theme.primary,
  },
  toggleKnob: {
    width: 27,
    height: 27,
    borderRadius: 13.5,
    backgroundColor: '#ffffff',
    ...shadows.sm,
  },
  toggleKnobActive: {
    alignSelf: 'flex-end',
  },
  
  // Select button
  selectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.muted,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.lg,
  },
  selectButtonText: {
    fontSize: fontSize.sm,
    color: theme.foreground,
    marginRight: spacing.sm,
  },
  
  // Theme options
  themeOptions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  themeOption: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.lg,
    backgroundColor: theme.muted,
    borderWidth: 1,
    borderColor: theme.border,
  },
  themeOptionActive: {
    backgroundColor: `${theme.primary}20`,
    borderColor: theme.primary,
  },
  themeOptionText: {
    fontSize: fontSize.sm,
    color: theme.mutedForeground,
  },
  themeOptionTextActive: {
    color: theme.primary,
    fontWeight: fontWeight.medium,
  },
  
  // Color picker
  colorOptions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  colorOption: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  colorOptionSelected: {
    borderWidth: 3,
    borderColor: '#ffffff',
  },
  
  // Slider
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  slider: {
    flex: 1,
    height: 4,
    backgroundColor: theme.muted,
    borderRadius: borderRadius.full,
  },
  sliderFill: {
    height: '100%',
    backgroundColor: theme.primary,
    borderRadius: borderRadius.full,
  },
  sliderThumb: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: theme.primary,
    ...shadows.md,
  },
  sliderValue: {
    fontSize: fontSize.sm,
    color: theme.foreground,
    fontWeight: fontWeight.medium,
    minWidth: 40,
    textAlign: 'right',
  },
  
  // Danger zone
  dangerSection: {
    marginTop: spacing.xl,
  },
  dangerCard: {
    backgroundColor: `${theme.destructive}10`,
    borderColor: `${theme.destructive}30`,
  },
  dangerItem: {
    borderBottomColor: `${theme.destructive}20`,
  },
  dangerIcon: {
    backgroundColor: `${theme.destructive}20`,
  },
  dangerTitle: {
    color: theme.destructive,
  },
  
  // Version info
  versionContainer: {
    alignItems: 'center',
    marginTop: spacing['3xl'],
    marginBottom: spacing.xl,
  },
  versionText: {
    fontSize: fontSize.sm,
    color: theme.mutedForeground,
  },
  versionNumber: {
    fontSize: fontSize.sm,
    color: theme.mutedForeground,
    marginTop: spacing.xs,
  },
  
  // Action button
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.muted,
    padding: spacing.lg,
    borderRadius: borderRadius.xl,
    marginTop: spacing.lg,
    borderWidth: 1,
    borderColor: theme.border,
  },
  actionButtonText: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.medium,
    color: theme.foreground,
    marginLeft: spacing.sm,
  },
  logoutButton: {
    backgroundColor: `${theme.destructive}10`,
    borderColor: `${theme.destructive}30`,
  },
  logoutButtonText: {
    color: theme.destructive,
  },
});
