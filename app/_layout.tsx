// app/_layout.tsx
import { Slot, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import { AuthProvider, useAuth } from '@/src/contexts/AuthContext';

// Criamos um componente auxiliar para lidar com o roteamento
const InitialLayout = () => {
  const { user } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const inAuthGroup = segments[0] === '(auth)';

    if (user && !inAuthGroup) {
      // Se tem usuário e ele NÃO está nas rotas protegidas, manda pra lá!
      router.replace('/(auth)/home');
    } else if (!user && inAuthGroup) {
      // Se NÃO tem usuário e ele tenta acessar algo protegido, manda pro login.
      router.replace('/login');
    }
  }, [user, segments]);

  return <Slot />;
};

export default function RootLayout() {
  return (
    <AuthProvider>
      <InitialLayout />
    </AuthProvider>
  );
}