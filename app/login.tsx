import LoginComponent from '@/src/features/auth/components/LoginComponent';
import RegisterComponent from '@/src/features/auth/components/RegisterComponent';
import { useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen() {
  const [isLogin, setIsLogin] = useState(true);

  return (

    <ScrollView style={{flex: 1}}>

      <SafeAreaView style={styles.container}>

        <View style={styles.container}>

          <Text style={styles.title}>DivTADS</Text>

          {isLogin 
            ? <LoginComponent></LoginComponent>
            : <RegisterComponent onSuccess={() => setIsLogin(true)} ></RegisterComponent>
          }

            <View style={styles.buttonContainer}>
              <Button title={isLogin ? "Crie sua conta" : "Já possui uma conta?"} onPress={() => setIsLogin(!isLogin)} color="#666" />
            </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#f5f5f5' },
  title: { fontSize: 32, fontWeight: 'bold', textAlign: 'center', marginTop: 100 },
  input: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#ddd', padding: 15, borderRadius: 8, marginBottom: 15 },
  buttonContainer: { marginBottom: 10 }
});