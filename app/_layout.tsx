// app/_layout.tsx
import { AuthProvider, useAuth } from '@/src/contexts/AuthContext';
import { Slot, useRootNavigationState, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';

// Criamos um componente auxiliar para lidar com o roteamento
const InitialLayout = () => {
  const { user, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const navigationState =  useRootNavigationState();

  useEffect(() => {

    if(!navigationState?.key) return;

    if(isLoading) return;

    const current = segments[0];
    const inAuthGroup = current === 'HomeScreen' || current === 'ExtractScreen' || current === 'ProfileScreen' || current === 'group';
    const onLoginScreen = current === 'login';

    if (user && !inAuthGroup) {
      // Se tem usuário e ele NÃO está nas rotas protegidas, manda pra HomeScreen
      router.replace('/HomeScreen');
    } else if (!user && !onLoginScreen) {
      // Se NÃO tem usuário e ele tenta acessar algo protegido, manda pro login.
      router.replace('/login');
    }
  }, [user, segments, isLoading, navigationState?.key]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return <Slot />;
};

export default function RootLayout() {
  return (
    <AuthProvider>
      <InitialLayout />
    </AuthProvider>
  );
}