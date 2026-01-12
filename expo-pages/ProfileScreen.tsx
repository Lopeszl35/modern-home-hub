import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { profileStyles as styles } from '../styles/pages/ProfileStyles';
import { colors } from '../styles/theme';

const theme = colors.dark;

export default function ProfileScreen() {
  const [formData, setFormData] = useState({
    nome: 'João Silva',
    email: 'joao.silva@email.com',
    perfilFinanceiro: 'moderado',
    salarioMensal: '5000',
  });

  const [isEditing, setIsEditing] = useState(false);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleSave = () => {
    // Save logic here
    setIsEditing(false);
  };

  const stats = [
    { label: 'Transações', value: '128' },
    { label: 'Metas', value: '5' },
    { label: 'Economia', value: 'R$ 2.4k' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <View style={styles.headerSection}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarText}>{getInitials(formData.nome)}</Text>
            </View>
            <TouchableOpacity style={styles.editAvatarButton}>
              <Ionicons name="camera" size={18} color={theme.primaryForeground} />
            </TouchableOpacity>
          </View>
          <Text style={styles.userName}>{formData.nome}</Text>
          <Text style={styles.userEmail}>{formData.email}</Text>
          <Text style={styles.memberSince}>Membro desde Janeiro 2024</Text>
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          {stats.map((stat, index) => (
            <React.Fragment key={stat.label}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
              {index < stats.length - 1 && <View style={styles.statDivider} />}
            </React.Fragment>
          ))}
        </View>

        {/* Personal Info Section */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionIconContainer}>
              <Ionicons name="person" size={20} color={theme.primary} />
            </View>
            <Text style={styles.sectionTitle}>Informações Pessoais</Text>
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Nome Completo</Text>
            <TextInput
              style={styles.fieldInput}
              value={formData.nome}
              onChangeText={(value) => setFormData({ ...formData, nome: value })}
              editable={isEditing}
              placeholderTextColor={theme.mutedForeground}
            />
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>E-mail</Text>
            <TextInput
              style={styles.fieldInput}
              value={formData.email}
              onChangeText={(value) => setFormData({ ...formData, email: value })}
              editable={isEditing}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor={theme.mutedForeground}
            />
          </View>

          <View style={styles.fieldRow}>
            <View style={styles.fieldHalf}>
              <Text style={styles.fieldLabel}>Perfil Financeiro</Text>
              <View style={styles.editableField}>
                <Text style={styles.editableFieldText}>
                  {formData.perfilFinanceiro === 'conservador' && '🛡️ Conservador'}
                  {formData.perfilFinanceiro === 'moderado' && '⚖️ Moderado'}
                  {formData.perfilFinanceiro === 'arrojado' && '🚀 Arrojado'}
                </Text>
                <Ionicons name="chevron-down" size={18} color={theme.mutedForeground} />
              </View>
            </View>

            <View style={styles.fieldHalf}>
              <Text style={styles.fieldLabel}>Salário Mensal</Text>
              <TextInput
                style={styles.fieldInput}
                value={`R$ ${formData.salarioMensal}`}
                onChangeText={(value) => setFormData({ ...formData, salarioMensal: value.replace(/\D/g, '') })}
                editable={isEditing}
                keyboardType="numeric"
                placeholderTextColor={theme.mutedForeground}
              />
            </View>
          </View>
        </View>

        {/* Actions Section */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionIconContainer}>
              <Ionicons name="settings" size={20} color={theme.primary} />
            </View>
            <Text style={styles.sectionTitle}>Conta</Text>
          </View>

          <TouchableOpacity style={styles.actionButton}>
            <View style={styles.actionButtonIcon}>
              <Ionicons name="notifications-outline" size={20} color={theme.foreground} />
            </View>
            <Text style={styles.actionButtonText}>Notificações</Text>
            <Ionicons name="chevron-forward" size={20} color={theme.mutedForeground} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <View style={styles.actionButtonIcon}>
              <Ionicons name="shield-outline" size={20} color={theme.foreground} />
            </View>
            <Text style={styles.actionButtonText}>Segurança</Text>
            <Ionicons name="chevron-forward" size={20} color={theme.mutedForeground} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <View style={styles.actionButtonIcon}>
              <Ionicons name="help-circle-outline" size={20} color={theme.foreground} />
            </View>
            <Text style={styles.actionButtonText}>Ajuda</Text>
            <Ionicons name="chevron-forward" size={20} color={theme.mutedForeground} />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.actionButton, styles.actionButtonLast]}>
            <View style={[styles.actionButtonIcon, { backgroundColor: `${theme.destructive}20` }]}>
              <Ionicons name="log-out-outline" size={20} color={theme.destructive} />
            </View>
            <Text style={[styles.actionButtonText, styles.actionButtonDestructive]}>Sair</Text>
            <Ionicons name="chevron-forward" size={20} color={theme.mutedForeground} />
          </TouchableOpacity>
        </View>

        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Salvar Alterações</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
