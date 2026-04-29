import { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { supabase } from '../src/utils/supabase';
import { AuthService } from '@/src/features/auth/authService';
import LoginComponent from '@/src/features/auth/components/LoginComponent';
import RegisterComponent from '@/src/features/auth/components/RegisterComponent';

export default function LoginScreen() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <View style={styles.container}>

      <Text style={styles.title}>DivTADS</Text>

      {isLogin 
        ? <LoginComponent></LoginComponent>
        : <RegisterComponent></RegisterComponent>
      }

        <View style={styles.buttonContainer}>
          <Button title={isLogin ? "Crie sua conta" : "Já possui uma conta?"} onPress={() => setIsLogin(!isLogin)} color="#666" />
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#f5f5f5' },
  title: { fontSize: 32, fontWeight: 'bold', textAlign: 'center', marginTop: 100 },
  input: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#ddd', padding: 15, borderRadius: 8, marginBottom: 15 },
  buttonContainer: { marginBottom: 10 }
});