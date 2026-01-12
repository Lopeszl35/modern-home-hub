import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { settingsStyles as styles } from '../styles/pages/SettingsStyles';
import { colors } from '../styles/theme';

const theme = colors.dark;

export default function SettingsScreen() {
  const [settings, setSettings] = useState({
    notificacoesEmail: true,
    notificacoesPush: true,
    alertasGastos: true,
    lembretesPagamento: true,
    tema: 'dark',
    idioma: 'pt-BR',
    compartilharDados: false,
    autenticacaoDoisFatores: false,
    moeda: 'BRL',
    limiteAlerta: '80',
  });

  const updateSetting = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Notificações */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notificações</Text>
          <View style={styles.sectionCard}>
            <View style={styles.settingItem}>
              <View style={[styles.settingIcon, { backgroundColor: `${theme.primary}20` }]}>
                <Ionicons name="mail-outline" size={20} color={theme.primary} />
              </View>
              <View style={styles.settingContent}>
                <Text style={styles.settingTitle}>Notificações por E-mail</Text>
                <Text style={styles.settingDescription}>Receba resumos e alertas por e-mail</Text>
              </View>
              <Switch
                value={settings.notificacoesEmail}
                onValueChange={(value) => updateSetting('notificacoesEmail', value)}
                trackColor={{ false: theme.muted, true: theme.primary }}
                thumbColor="#ffffff"
              />
            </View>

            <View style={styles.settingItem}>
              <View style={[styles.settingIcon, { backgroundColor: `${theme.primary}20` }]}>
                <Ionicons name="notifications-outline" size={20} color={theme.primary} />
              </View>
              <View style={styles.settingContent}>
                <Text style={styles.settingTitle}>Notificações Push</Text>
                <Text style={styles.settingDescription}>Receba alertas em tempo real</Text>
              </View>
              <Switch
                value={settings.notificacoesPush}
                onValueChange={(value) => updateSetting('notificacoesPush', value)}
                trackColor={{ false: theme.muted, true: theme.primary }}
                thumbColor="#ffffff"
              />
            </View>

            <View style={styles.settingItem}>
              <View style={[styles.settingIcon, { backgroundColor: `${theme.warning}20` }]}>
                <Ionicons name="warning-outline" size={20} color={theme.warning} />
              </View>
              <View style={styles.settingContent}>
                <Text style={styles.settingTitle}>Alertas de Gastos</Text>
                <Text style={styles.settingDescription}>Aviso ao atingir limite de gastos</Text>
              </View>
              <Switch
                value={settings.alertasGastos}
                onValueChange={(value) => updateSetting('alertasGastos', value)}
                trackColor={{ false: theme.muted, true: theme.primary }}
                thumbColor="#ffffff"
              />
            </View>

            <View style={[styles.settingItem, styles.settingItemLast]}>
              <View style={[styles.settingIcon, { backgroundColor: `${theme.primary}20` }]}>
                <Ionicons name="card-outline" size={20} color={theme.primary} />
              </View>
              <View style={styles.settingContent}>
                <Text style={styles.settingTitle}>Lembretes de Pagamento</Text>
                <Text style={styles.settingDescription}>Lembre-me antes do vencimento</Text>
              </View>
              <Switch
                value={settings.lembretesPagamento}
                onValueChange={(value) => updateSetting('lembretesPagamento', value)}
                trackColor={{ false: theme.muted, true: theme.primary }}
                thumbColor="#ffffff"
              />
            </View>
          </View>
        </View>

        {/* Aparência */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Aparência</Text>
          <View style={styles.sectionCard}>
            <View style={styles.settingItem}>
              <View style={[styles.settingIcon, { backgroundColor: `${theme.primary}20` }]}>
                <Ionicons name="color-palette-outline" size={20} color={theme.primary} />
              </View>
              <View style={styles.settingContent}>
                <Text style={styles.settingTitle}>Tema</Text>
                <Text style={styles.settingDescription}>Escolha entre claro, escuro ou automático</Text>
              </View>
              <View style={styles.themeOptions}>
                {['light', 'dark', 'system'].map((t) => (
                  <TouchableOpacity
                    key={t}
                    style={[styles.themeOption, settings.tema === t && styles.themeOptionActive]}
                    onPress={() => updateSetting('tema', t)}
                  >
                    <Text style={[styles.themeOptionText, settings.tema === t && styles.themeOptionTextActive]}>
                      {t === 'light' ? '☀️' : t === 'dark' ? '🌙' : '📱'}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={[styles.settingItem, styles.settingItemLast]}>
              <View style={[styles.settingIcon, { backgroundColor: `${theme.primary}20` }]}>
                <Ionicons name="globe-outline" size={20} color={theme.primary} />
              </View>
              <View style={styles.settingContent}>
                <Text style={styles.settingTitle}>Idioma</Text>
                <Text style={styles.settingDescription}>Idioma do aplicativo</Text>
              </View>
              <TouchableOpacity style={styles.selectButton}>
                <Text style={styles.selectButtonText}>🇧🇷 Português</Text>
                <Ionicons name="chevron-down" size={16} color={theme.foreground} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Configurações Financeiras */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Financeiro</Text>
          <View style={styles.sectionCard}>
            <View style={styles.settingItem}>
              <View style={[styles.settingIcon, { backgroundColor: `${theme.success}20` }]}>
                <Ionicons name="cash-outline" size={20} color={theme.success} />
              </View>
              <View style={styles.settingContent}>
                <Text style={styles.settingTitle}>Moeda</Text>
                <Text style={styles.settingDescription}>Moeda padrão para exibição</Text>
              </View>
              <TouchableOpacity style={styles.selectButton}>
                <Text style={styles.selectButtonText}>R$ BRL</Text>
                <Ionicons name="chevron-down" size={16} color={theme.foreground} />
              </TouchableOpacity>
            </View>

            <View style={[styles.settingItem, styles.settingItemLast]}>
              <View style={[styles.settingIcon, { backgroundColor: `${theme.warning}20` }]}>
                <Ionicons name="alert-circle-outline" size={20} color={theme.warning} />
              </View>
              <View style={styles.settingContent}>
                <Text style={styles.settingTitle}>Limite de Alerta</Text>
                <Text style={styles.settingDescription}>Alertar quando gastos atingirem % do orçamento</Text>
              </View>
              <TouchableOpacity style={styles.selectButton}>
                <Text style={styles.selectButtonText}>{settings.limiteAlerta}%</Text>
                <Ionicons name="chevron-down" size={16} color={theme.foreground} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Privacidade e Segurança */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Privacidade e Segurança</Text>
          <View style={styles.sectionCard}>
            <View style={styles.settingItem}>
              <View style={[styles.settingIcon, { backgroundColor: `${theme.primary}20` }]}>
                <Ionicons name="shield-checkmark-outline" size={20} color={theme.primary} />
              </View>
              <View style={styles.settingContent}>
                <Text style={styles.settingTitle}>Autenticação em Dois Fatores</Text>
                <Text style={styles.settingDescription}>Camada extra de segurança</Text>
              </View>
              <Switch
                value={settings.autenticacaoDoisFatores}
                onValueChange={(value) => updateSetting('autenticacaoDoisFatores', value)}
                trackColor={{ false: theme.muted, true: theme.primary }}
                thumbColor="#ffffff"
              />
            </View>

            <View style={[styles.settingItem, styles.settingItemLast]}>
              <View style={[styles.settingIcon, { backgroundColor: `${theme.muted}` }]}>
                <Ionicons name="analytics-outline" size={20} color={theme.foreground} />
              </View>
              <View style={styles.settingContent}>
                <Text style={styles.settingTitle}>Compartilhar Dados Anônimos</Text>
                <Text style={styles.settingDescription}>Ajude-nos a melhorar o app</Text>
              </View>
              <Switch
                value={settings.compartilharDados}
                onValueChange={(value) => updateSetting('compartilharDados', value)}
                trackColor={{ false: theme.muted, true: theme.primary }}
                thumbColor="#ffffff"
              />
            </View>
          </View>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={[styles.actionButton, styles.logoutButton]}>
          <Ionicons name="log-out-outline" size={20} color={theme.destructive} />
          <Text style={[styles.actionButtonText, styles.logoutButtonText]}>Sair da Conta</Text>
        </TouchableOpacity>

        {/* Version Info */}
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>FinApp</Text>
          <Text style={styles.versionNumber}>Versão 1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
