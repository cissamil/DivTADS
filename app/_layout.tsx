import { useEffect } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import { AuthProvider, useAuth } from '../src/contexts/AuthContext';

function RootLayoutNav() {
  const { session, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    // Verifica se o usuário está tentando acessar a pasta protegida (auth)
    const inAuthGroup = segments[0] === '(auth)';

    if (!session && inAuthGroup) {
      // Não logado, manda pro login
      router.replace('/login');
    } else if (session && !inAuthGroup) {
      // Logado, manda direto pro Cofre
      router.replace('/(auth)/vault');
    }
  }, [session, isLoading, segments]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="(auth)" />
    </Stack>
  );
}

// O provedor precisa envolver o componente que usa os hooks de roteamento
export default function Layout() {
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}