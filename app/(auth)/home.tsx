import { useAuth } from '@/src/contexts/AuthContext';
import { AuthService } from '@/src/features/auth/services/authService';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


const authService: AuthService = new AuthService()

export default function HomeScreen() {

  const {userData, logout} = useAuth();


  const groups = [
    { id: 1, name: 'República', members: 4, expenses: 12, balance: '+R$94', status: 'a receber' },
    { id: 2, name: 'Viagem SP', members: 3, expenses: 6, balance: '+R$49.00', status: 'a receber' },
    { id: 3, name: 'Churrasco', members: 4, expenses: 3, balance: '-R$18', status: 'a pagar' },
  ];

  return (
    
    <SafeAreaView style={{flex: 1}} edges={{top: "off", bottom: "off" }}>

      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{userData?.name ?? "Usuario"} - MEUS GRUPOS</Text>
          <Text style={[styles.headerTitle, styles.signOut]} onPress={logout}>Sair da sua conta</Text>          
        </View>

        <ScrollView style={styles.content}>
          {/* Saldo Card */}
          <View style={styles.balanceCard}>
            <Text style={styles.balanceLabel}>saldo consolidado</Text>
            <Text style={styles.balanceValue}>+R$ 127,50</Text>
            <Text style={styles.balanceSubtitle}>em 3 grupos ativos</Text>
          </View>

          {/* Grupos Section */}
          <Text style={styles.sectionTitle}>grupos</Text>

          {groups.map((group) => (
            <View key={group.id} style={styles.groupCard}>
              <View style={styles.groupIcon}>
                <Text style={styles.groupIconText}>🏠</Text>
              </View>
              <View style={styles.groupInfo}>
                <Text style={styles.groupName}>{group.name}</Text>
                <Text style={styles.groupDetails}>
                  {group.members} membros · {group.expenses} despesas
                </Text>
              </View>
              <View style={styles.groupBalance}>
                <Text style={[styles.balanceText, group.balance.includes('-') ? styles.negative : styles.positive]}>
                  {group.balance}
                </Text>
                <Text style={styles.statusText}>{group.status}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  header: {
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  headerTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#999',
    letterSpacing: 1,
  },
  signOut: {
    color: 'red'
  },
  content: {
    flex: 1,
    padding: 16,
  },
  balanceCard: {
    backgroundColor: '#6366f1',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    alignItems: 'center',
  },
  balanceLabel: {
    fontSize: 12,
    color: '#e0e7ff',
    marginBottom: 4,
    opacity: 0.9,
  },
  balanceValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  balanceSubtitle: {
    fontSize: 12,
    color: '#e0e7ff',
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  groupCard: {
    flexDirection: 'row',
    backgroundColor: '#262626',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  groupIcon: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  groupIconText: {
    fontSize: 24,
  },
  groupInfo: {
    flex: 1,
  },
  groupName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  groupDetails: {
    fontSize: 12,
    color: '#999',
  },
  groupBalance: {
    alignItems: 'flex-end',
  },
  balanceText: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 2,
  },
  positive: {
    color: '#10b981',
  },
  negative: {
    color: '#ef4444',
  },
  statusText: {
    fontSize: 11,
    color: '#666',
  },
});