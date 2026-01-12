import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { assistenteIAStyles as styles } from '../styles/pages/AssistenteIAStyles';
import { colors } from '../styles/theme';

const theme = colors.dark;

interface Message {
  id: string;
  autor: 'usuario' | 'assistente';
  texto: string;
  criado_em: string;
}

const suggestions = [
  { icon: 'wallet', text: 'Como posso economizar mais?' },
  { icon: 'trending-up', text: 'Analise meus gastos do mês' },
  { icon: 'flag', text: 'Ajude-me a criar uma meta' },
  { icon: 'bulb', text: 'Dicas de investimento' },
];

export default function AssistenteIAScreen() {
  const navigation = useNavigation();
  const scrollViewRef = useRef<ScrollView>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [sending, setSending] = useState(false);

  const formatTime = (date: string) => {
    return new Date(date).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

  const sendMessage = async (text: string) => {
    if (!text.trim() || sending) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      autor: 'usuario',
      texto: text.trim(),
      criado_em: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setSending(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        autor: 'assistente',
        texto: 'Obrigado pela sua pergunta! Analisando seus dados financeiros, posso ver que você tem um bom controle de gastos. Vou preparar algumas sugestões personalizadas para você.',
        criado_em: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setSending(false);
    }, 2000);

    scrollViewRef.current?.scrollToEnd({ animated: true });
  };

  const handleSuggestionClick = (text: string) => {
    sendMessage(text);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerAvatar}>
          <Ionicons name="sparkles" size={20} color={theme.primary} />
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Text style={styles.headerTitle}>Assistente IA</Text>
          <View style={styles.headerStatus}>
            <View style={styles.headerStatusDot} />
            <Text style={styles.headerStatusText}>Online</Text>
          </View>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerAction}>
            <Ionicons name="refresh" size={20} color={theme.mutedForeground} />
          </TouchableOpacity>
        </View>
      </View>

      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        {/* Messages */}
        <ScrollView
          ref={scrollViewRef}
          style={styles.messagesList}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
        >
          {messages.length === 0 ? (
            // Empty State
            <View style={styles.emptyState}>
              <View style={styles.emptyIcon}>
                <Ionicons name="chatbubbles" size={40} color={theme.primary} />
              </View>
              <Text style={styles.emptyTitle}>Olá! Sou seu assistente financeiro</Text>
              <Text style={styles.emptyText}>
                Posso ajudar você a entender seus gastos, criar metas financeiras e dar dicas personalizadas.
              </Text>

              {/* Suggestions */}
              <View style={styles.suggestionsContainer}>
                <Text style={styles.suggestionsTitle}>Tente perguntar:</Text>
                <View style={styles.suggestionsList}>
                  {suggestions.map((suggestion, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.suggestionButton}
                      onPress={() => handleSuggestionClick(suggestion.text)}
                    >
                      <Ionicons name={suggestion.icon as any} size={18} color={theme.primary} style={styles.suggestionIcon} />
                      <Text style={styles.suggestionText}>{suggestion.text}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>
          ) : (
            // Messages
            <>
              {messages.map((message) => (
                <View
                  key={message.id}
                  style={[
                    styles.messageBubble,
                    message.autor === 'usuario' ? styles.messageBubbleUser : styles.messageBubbleAssistant,
                  ]}
                >
                  <View
                    style={[
                      styles.messageContent,
                      message.autor === 'usuario' ? styles.messageContentUser : styles.messageContentAssistant,
                    ]}
                  >
                    <Text
                      style={[
                        styles.messageText,
                        message.autor === 'usuario' ? styles.messageTextUser : styles.messageTextAssistant,
                      ]}
                    >
                      {message.texto}
                    </Text>
                  </View>
                  <Text style={[styles.messageTime, message.autor === 'usuario' && styles.messageTimeUser]}>
                    {formatTime(message.criado_em)}
                  </Text>
                </View>
              ))}

              {/* Typing Indicator */}
              {sending && (
                <View style={styles.typingIndicator}>
                  <View style={styles.typingDots}>
                    <View style={styles.typingDot} />
                    <View style={styles.typingDot} />
                    <View style={styles.typingDot} />
                  </View>
                </View>
              )}
            </>
          )}
        </ScrollView>

        {/* Composer */}
        <View style={styles.composerContainer}>
          <View style={styles.composerRow}>
            <View style={styles.composerInputContainer}>
              <TextInput
                style={styles.composerInput}
                placeholder="Pergunte sobre suas finanças..."
                placeholderTextColor={theme.mutedForeground}
                value={inputText}
                onChangeText={setInputText}
                multiline
                maxLength={500}
              />
              <View style={styles.composerActions}>
                <TouchableOpacity style={styles.composerAction}>
                  <Ionicons name="mic" size={20} color={theme.mutedForeground} />
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity
              style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]}
              onPress={() => sendMessage(inputText)}
              disabled={!inputText.trim() || sending}
            >
              {sending ? (
                <ActivityIndicator size="small" color={theme.primaryForeground} />
              ) : (
                <Ionicons name="send" size={20} color={theme.primaryForeground} />
              )}
            </TouchableOpacity>
          </View>

          {/* Quick Actions */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.quickActionsBar}>
              {['Gastos', 'Metas', 'Investir', 'Economia'].map((action) => (
                <TouchableOpacity key={action} style={styles.quickAction} onPress={() => sendMessage(`Fale sobre ${action.toLowerCase()}`)}>
                  <Text style={styles.quickActionText}>{action}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
