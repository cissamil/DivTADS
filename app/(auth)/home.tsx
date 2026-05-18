import { useAuth } from '@/src/contexts/AuthContext';
import { AuthService } from '@/src/features/auth/services/authService';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList } from 'react-native';
import { GroupEntity } from '@/src/features/home/models/GroupEntity';
import GroupCardComponent from '@/src/features/home/components/GroupCardComponent';

const authService: AuthService = new AuthService()

export default function HomeScreen() {

  const {userData, logout} = useAuth();


  const groups : GroupEntity[] = [
    { id: "1", name: 'República', numberOfMembers: 4, numberOfExpenses: 12, totalBalance: 94 },
    { id: "2", name: 'Viagem SP', numberOfMembers: 3, numberOfExpenses: 6, totalBalance: 49.00 },
    { id: "3", name: 'Churrasco', numberOfMembers: 4, numberOfExpenses: 3, totalBalance: -18 },
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

          <FlatList

            data={groups}
            keyExtractor={item => String(item.id)}
            renderItem={({item}) => <GroupCardComponent {...item} /> }
          />
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
});