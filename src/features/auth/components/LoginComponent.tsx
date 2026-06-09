import { useAuth } from '@/src/contexts/AuthContext';
import { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { LoginComponentStyles } from './styles/LoginComponentStyle';

export default function LoginComponent() {
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    login({ email, password });
  }

  return (
    <View style={LoginComponentStyles.container}>
      <TextInput
        style={LoginComponentStyles.input}
        placeholder="E-mail"
        placeholderTextColor="#666"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={LoginComponentStyles.input}
        placeholder="Senha"
        placeholderTextColor="#666"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity
        style={[LoginComponentStyles.button, isLoading && LoginComponentStyles.buttonDisabled]}
        onPress={handleLogin}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={LoginComponentStyles.buttonText}>Entrar</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

