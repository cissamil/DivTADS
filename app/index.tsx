import { useAuth } from '@/src/contexts/AuthContext';
import { GroupDetailsScreenStyle } from '@/src/features/groups/components/styles/GroupDetailsScreenStyle';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';

export default function IndexRedirect() {
  const router = useRouter();
  const { isLoading } = useAuth();

  useEffect(() => {
    router.replace('/login');
  }, []);

  if (isLoading) {
    return (
      <View style={[GroupDetailsScreenStyle.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#6366f1" />
      </View>
    );
  }
}
