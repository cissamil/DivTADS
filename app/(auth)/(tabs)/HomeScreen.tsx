import { useAuth } from '@/src/contexts/AuthContext';
import { AuthService } from '@/src/features/auth/services/authService';
import GroupCardComponent from '@/src/features/home/components/GroupCardComponent';
import { GroupEntity } from '@/src/features/home/models/GroupEntity';
import { useRouter } from 'expo-router';
import { FlatList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { homeScreenStyles } from '../../../src/features/home/components/styles/homeScreenStyles';

const authService: AuthService = new AuthService()

export default function HomeScreen() {

  const router = useRouter();
  const {userData, logout} = useAuth();

  const openGroupDetails = (groupId: string, groupName: string) => {
    router.push({
      pathname: '/group/[id]',
      params: {
        id: groupId,
        name: groupName
      }
    });
  }


  const groups : GroupEntity[] = [
    { id: "1", name: 'República', numberOfMembers: 4, numberOfExpenses: 12, totalBalance: 94 },
    { id: "2", name: 'Viagem SP', numberOfMembers: 3, numberOfExpenses: 6, totalBalance: 49.00 },
    { id: "3", name: 'Churrasco', numberOfMembers: 4, numberOfExpenses: 3, totalBalance: -18 },
  ];

  return (
    
    <SafeAreaView style={{flex: 1}} edges={{top: "off", bottom: "off" }}>

      <View style={homeScreenStyles.container}>
        {/* Header */}
        <View style={homeScreenStyles.header}>
          <Text style={homeScreenStyles.headerTitle}>{userData?.name ?? "Usuario"} - MEUS GRUPOS</Text>
          <Text style={[homeScreenStyles.headerTitle, homeScreenStyles.signOut]} onPress={logout}>Sair da sua conta</Text>          
        </View>

        <FlatList
          style={homeScreenStyles.content}
          data={groups}
          keyExtractor={item => String(item.id)}
          ListHeaderComponent={
            <>
              <View style={homeScreenStyles.balanceCard}>
                <Text style={homeScreenStyles.balanceLabel}>saldo consolidado</Text>
                <Text style={homeScreenStyles.balanceValue}>+R$ 127,50</Text>
                <Text style={homeScreenStyles.balanceSubtitle}>em 3 grupos ativos</Text>
              </View>

              <Text style={homeScreenStyles.sectionTitle}>grupos</Text>
            </>
          }
          renderItem={({ item }) => (
            <GroupCardComponent
              group={item}
              onClick={() => openGroupDetails(item.id, item.name)}
            />
          )}
        />
      </View>

    </SafeAreaView>

  );
}
