import LoginComponent from '@/src/features/auth/components/LoginComponent';
import RegisterComponent from '@/src/features/auth/components/RegisterComponent';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        
        <View style={styles.headerContainer}>
          <Text style={styles.title}>DivTADS</Text>
          <Text style={styles.subtitle}>
            {isLogin ? 'Bem-vindo de volta!' : 'Crie sua conta para começar'}
          </Text>
        </View>

        {isLogin 
          ? <LoginComponent />
          : <RegisterComponent onSuccess={() => setIsLogin(true)} />
        }

        <View style={styles.toggleContainer}>
          <Text style={styles.toggleText}>
            {isLogin ? "Ainda não tem conta? " : "Já possui uma conta? "}
          </Text>
          <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
            <Text style={styles.toggleButtonText}>
              {isLogin ? "Cadastre-se" : "Faça Login"}
            </Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#1a1a1a' },
  scrollContainer: { flexGrow: 1, padding: 24, justifyContent: 'center' },
  headerContainer: { alignItems: 'center', marginBottom: 40, marginTop: 20 },
  title: { fontSize: 42, fontWeight: 'bold', color: '#6366f1', letterSpacing: 1 },
  subtitle: { fontSize: 16, color: '#999', marginTop: 8 },
  toggleContainer: { flexDirection: 'row', justifyContent: 'center', marginTop: 30, paddingBottom: 20 },
  toggleText: { color: '#999', fontSize: 15 },
  toggleButtonText: { color: '#6366f1', fontSize: 15, fontWeight: 'bold' }
});