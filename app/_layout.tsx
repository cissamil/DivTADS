// app/_layout.tsx
import { Slot, useRootNavigationState, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import { AuthProvider, useAuth } from '@/src/contexts/AuthContext';
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

    const inAuthGroup = segments[0] === '(auth)';
    const onLoginScreen = segments[0] === 'login';

    if (user && !inAuthGroup) {
      // Se tem usuário e ele NÃO está nas rotas protegidas, manda pra lá!

      router.replace('/(auth)/home');
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