import { StyleSheet } from 'react-native';
import { colors, spacing, borderRadius, fontSize, fontWeight, shadows } from '../theme';

const theme = colors.dark;

/**
 * Styles for AI Assistant Chat screen
 */
export const assistenteIAStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  
  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: theme.border,
    backgroundColor: theme.card,
  },
  headerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: `${theme.primary}20`,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  headerInfo: {
    flex: 1,
  },
  headerTitle: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.semibold,
    color: theme.foreground,
  },
  headerStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  headerStatusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.success,
    marginRight: spacing.xs,
  },
  headerStatusText: {
    fontSize: fontSize.xs,
    color: theme.mutedForeground,
  },
  headerActions: {
    flexDirection: 'row',
  },
  headerAction: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: spacing.sm,
  },
  
  // Messages list
  messagesList: {
    flex: 1,
    padding: spacing.lg,
  },
  messagesContent: {
    paddingBottom: spacing.lg,
  },
  
  // Message bubble
  messageBubble: {
    maxWidth: '80%',
    marginBottom: spacing.md,
  },
  messageBubbleUser: {
    alignSelf: 'flex-end',
  },
  messageBubbleAssistant: {
    alignSelf: 'flex-start',
  },
  messageContent: {
    padding: spacing.md,
    borderRadius: borderRadius.xl,
  },
  messageContentUser: {
    backgroundColor: theme.primary,
    borderBottomRightRadius: borderRadius.sm,
  },
  messageContentAssistant: {
    backgroundColor: theme.card,
    borderBottomLeftRadius: borderRadius.sm,
    borderWidth: 1,
    borderColor: theme.border,
  },
  messageText: {
    fontSize: fontSize.base,
    lineHeight: 22,
  },
  messageTextUser: {
    color: theme.primaryForeground,
  },
  messageTextAssistant: {
    color: theme.foreground,
  },
  messageTime: {
    fontSize: fontSize.xs,
    color: theme.mutedForeground,
    marginTop: spacing.xs,
  },
  messageTimeUser: {
    textAlign: 'right',
  },
  
  // Typing indicator
  typingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: theme.card,
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: theme.border,
    alignSelf: 'flex-start',
    marginBottom: spacing.md,
  },
  typingDots: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  typingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.mutedForeground,
  },
  
  // Empty state
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing['3xl'],
  },
  emptyIcon: {
    width: 80,
    height: 80,
    borderRadius: borderRadius['2xl'],
    backgroundColor: `${theme.primary}20`,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xl,
  },
  emptyTitle: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: theme.foreground,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: fontSize.base,
    color: theme.mutedForeground,
    textAlign: 'center',
    marginBottom: spacing.xl,
    lineHeight: 24,
  },
  
  // Suggestions
  suggestionsContainer: {
    marginTop: spacing.lg,
  },
  suggestionsTitle: {
    fontSize: fontSize.sm,
    color: theme.mutedForeground,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  suggestionsList: {
    gap: spacing.sm,
  },
  suggestionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.card,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.border,
  },
  suggestionIcon: {
    marginRight: spacing.md,
  },
  suggestionText: {
    flex: 1,
    fontSize: fontSize.sm,
    color: theme.foreground,
  },
  
  // Composer
  composerContainer: {
    padding: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: theme.border,
    backgroundColor: theme.card,
  },
  composerRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: spacing.sm,
  },
  composerInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: theme.muted,
    borderRadius: borderRadius.xl,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderWidth: 1,
    borderColor: theme.border,
    minHeight: 48,
    maxHeight: 120,
  },
  composerInput: {
    flex: 1,
    fontSize: fontSize.base,
    color: theme.foreground,
    paddingVertical: spacing.sm,
    maxHeight: 100,
  },
  composerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: spacing.sm,
  },
  composerAction: {
    width: 32,
    height: 32,
    borderRadius: borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButton: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.full,
    backgroundColor: theme.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.sm,
  },
  sendButtonDisabled: {
    backgroundColor: theme.muted,
  },
  
  // Quick actions bar
  quickActionsBar: {
    flexDirection: 'row',
    paddingTop: spacing.sm,
    gap: spacing.sm,
  },
  quickAction: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: theme.muted,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: theme.border,
  },
  quickActionText: {
    fontSize: fontSize.xs,
    color: theme.foreground,
  },
});
