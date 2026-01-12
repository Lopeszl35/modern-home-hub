import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import { registerStyles as styles } from '../styles/pages/RegisterStyles';
import { colors } from '../styles/theme';

const theme = colors.dark;

export default function RegisterScreen() {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    perfil_financeiro: 'moderado',
    salario_mensal: '',
    saldo_inicial: '',
    saldo_atual: '',
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  function validateForm(): string | null {
    if (!formData.nome || !formData.email || !formData.senha || !formData.salario_mensal) {
      return 'Preencha todos os campos obrigatórios';
    }
    if (!formData.email.includes('@')) {
      return 'Email inválido';
    }
    if (formData.senha.length < 8) {
      return 'A senha deve ter pelo menos 8 caracteres';
    }
    if (!acceptedTerms) {
      return 'Aceite os termos de uso';
    }
    return null;
  }

  async function handleRegister() {
    setError('');

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Navigate to login
      navigation.navigate('Login' as never);
    } catch (err: any) {
      setError(err.message || 'Erro ao cadastrar usuário');
    } finally {
      setLoading(false);
    }
  }

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color={theme.foreground} />
      </TouchableOpacity>

      <KeyboardAvoidingView 
        style={styles.keyboardAvoid} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Crie sua conta</Text>
            <Text style={styles.subtitle}>
              Comece a organizar suas finanças
            </Text>
          </View>

          {/* Form Card */}
          <View style={styles.formCard}>
            {/* Nome */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Nome completo</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="person-outline" size={18} color={theme.mutedForeground} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Digite seu nome"
                  placeholderTextColor={theme.mutedForeground}
                  value={formData.nome}
                  onChangeText={(value) => updateField('nome', value)}
                  autoCapitalize="words"
                />
              </View>
            </View>

            {/* Email */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>E-mail</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="mail-outline" size={18} color={theme.mutedForeground} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Digite seu e-mail"
                  placeholderTextColor={theme.mutedForeground}
                  value={formData.email}
                  onChangeText={(value) => updateField('email', value)}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>

            {/* Senha */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Senha</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="lock-closed-outline" size={18} color={theme.mutedForeground} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Mínimo 8 caracteres"
                  placeholderTextColor={theme.mutedForeground}
                  value={formData.senha}
                  onChangeText={(value) => updateField('senha', value)}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity 
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.inputPasswordToggle}
                >
                  <Ionicons 
                    name={showPassword ? 'eye-off-outline' : 'eye-outline'} 
                    size={20} 
                    color={theme.mutedForeground} 
                  />
                </TouchableOpacity>
              </View>
              
              {/* Password Strength */}
              <View style={styles.strengthContainer}>
                <View style={styles.strengthBars}>
                  <View style={[styles.strengthBar, formData.senha.length > 0 && styles.strengthBarWeak]} />
                  <View style={[styles.strengthBar, formData.senha.length >= 4 && styles.strengthBarMedium]} />
                  <View style={[styles.strengthBar, formData.senha.length >= 8 && styles.strengthBarStrong]} />
                </View>
                <Text style={styles.strengthText}>
                  {formData.senha.length === 0 ? '' : formData.senha.length < 4 ? 'Fraca' : formData.senha.length < 8 ? 'Média' : 'Forte'}
                </Text>
              </View>
            </View>

            {/* Salário e Saldo Row */}
            <View style={styles.inputRow}>
              <View style={[styles.inputGroup, styles.inputHalf]}>
                <Text style={styles.inputLabel}>Salário Mensal</Text>
                <View style={styles.inputContainer}>
                  <Ionicons name="cash-outline" size={18} color={theme.mutedForeground} style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="R$ 0,00"
                    placeholderTextColor={theme.mutedForeground}
                    value={formData.salario_mensal}
                    onChangeText={(value) => updateField('salario_mensal', value)}
                    keyboardType="numeric"
                  />
                </View>
              </View>

              <View style={[styles.inputGroup, styles.inputHalf]}>
                <Text style={styles.inputLabel}>Saldo Inicial</Text>
                <View style={styles.inputContainer}>
                  <Ionicons name="wallet-outline" size={18} color={theme.mutedForeground} style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="R$ 0,00"
                    placeholderTextColor={theme.mutedForeground}
                    value={formData.saldo_inicial}
                    onChangeText={(value) => updateField('saldo_inicial', value)}
                    keyboardType="numeric"
                  />
                </View>
              </View>
            </View>

            {/* Terms */}
            <TouchableOpacity 
              style={styles.termsContainer}
              onPress={() => setAcceptedTerms(!acceptedTerms)}
            >
              <View style={[styles.checkbox, acceptedTerms && styles.checkboxChecked]}>
                {acceptedTerms && <Ionicons name="checkmark" size={14} color="#fff" />}
              </View>
              <Text style={styles.termsText}>
                Concordo com os <Text style={styles.termsLink}>Termos de Uso</Text> e{' '}
                <Text style={styles.termsLink}>Política de Privacidade</Text>
              </Text>
            </TouchableOpacity>

            {/* Error */}
            {error ? (
              <View style={{ flexDirection: 'row', alignItems: 'center', padding: 12, backgroundColor: `${theme.destructive}20`, borderRadius: 12, marginBottom: 16 }}>
                <Ionicons name="alert-circle" size={18} color={theme.destructive} />
                <Text style={{ flex: 1, marginLeft: 8, color: theme.destructive, fontSize: 14 }}>{error}</Text>
              </View>
            ) : null}

            {/* Submit Button */}
            <TouchableOpacity 
              style={[styles.submitButton, loading && styles.submitButtonDisabled]}
              onPress={handleRegister}
              disabled={loading}
              activeOpacity={0.8}
            >
              {loading ? (
                <ActivityIndicator color={theme.primaryForeground} />
              ) : (
                <Text style={styles.submitButtonText}>Cadastrar</Text>
              )}
            </TouchableOpacity>

            {/* Login Link */}
            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>Já tem uma conta? </Text>
              <TouchableOpacity 
                style={styles.loginLink}
                onPress={() => navigation.navigate('Login' as never)}
              >
                <Text style={styles.loginLinkText}>Faça login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
