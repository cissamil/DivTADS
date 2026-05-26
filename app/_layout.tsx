// app/_layout.tsx
import { AuthProvider, useAuth } from '@/src/contexts/AuthContext';
import { Slot, useRootNavigationState, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { GroupProvider } from '@/src/contexts/GroupContext';

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
    const inAuthGroup = segments[0] === '(auth)';
    const onLoginScreen = current === 'login';

    if (user && !inAuthGroup) {
      router.replace('/(auth)/(tabs)/home');
    } else if (!user && !onLoginScreen) {
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
      <GroupProvider> 
        <InitialLayout />
      </GroupProvider>
    </AuthProvider>
  );
}