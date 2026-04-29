import { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { supabase } from '../../../../src/utils/supabase';
import { AuthService } from '@/src/features/auth/authService';

export default function LoginComponent(){
  const authService: AuthService = new AuthService();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <View style={styles.buttonContainer}>
          <Button title="Entrar" onPress={ () => authService.signInWithEmail(email, password)} disabled={authService.isLoading} />
        </View>

      </View>

  );
}


const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#f5f5f5' },
  title: { fontSize: 32, fontWeight: 'bold', textAlign: 'center', marginBottom: 40 },
  input: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#ddd', padding: 15, borderRadius: 8, marginBottom: 15 },
  buttonContainer: { marginBottom: 10 }
});