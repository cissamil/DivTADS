import { useAuth } from '@/src/contexts/AuthContext';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Profile() {
  const { userData, logout } = useAuth();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>

      {/* avatar */}
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>
          {userData?.name?.charAt(0).toUpperCase() ?? '?'}
        </Text>
      </View>

      {/* infos */}
      <Text style={styles.name}>{userData?.name ?? 'Usuário'}</Text>
      <Text style={styles.email}>{userData?.email ?? ''}</Text>

      {/* sair */}
      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Text style={styles.logoutText}>Sair da conta</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#6366f1',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  avatarText: {
    color: '#fff',
    fontSize: 32,
    fontWeight: '600',
  },
  name: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4,
  },
  email: {
    color: '#999',
    fontSize: 14,
    marginBottom: 40,
  },
  logoutButton: {
    borderWidth: 1,
    borderColor: '#e74c3c',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 32,
  },
  logoutText: {
    color: '#e74c3c',
    fontSize: 15,
    fontWeight: '500',
  },
});