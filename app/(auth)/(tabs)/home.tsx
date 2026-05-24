import { useAuth } from '@/src/contexts/AuthContext';
import GroupCardComponent from '@/src/features/home/components/GroupCardComponent';
import { GroupEntity } from '@/src/features/home/models/GroupEntity';
import { GroupService } from '@/src/features/home/services/groupService';
import { NumberFormatter } from '@/src/utils/formatMoney';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { homeScreenStyles } from '../../../src/features/home/components/styles/homeScreenStyles';


const numberFormatter: NumberFormatter = new NumberFormatter();
const groupService: GroupService = new GroupService();

export default function Home() {

  const insets = useSafeAreaInsets();
  const router = useRouter();
  const {userData, logout} = useAuth();
  const [groups, setGroups] = useState<GroupEntity[]>([]);
  const generalBalance = groups.reduce((total, group) => total + group.totalBalance, 0 )
  
  useEffect(()=>{
    if(!userData?.userId) return;

    const fetchedGroups = async () =>{

      console.log("Pegando grupos do usuário");
      const response = await groupService.getGroupsGeneralInformationsByUserId(userData.userId);

      console.log("Grupos: ", response);

      if(response){
        setGroups(response);
      }
    }

    fetchedGroups();
  },[]);

  const openGroupDetails = (groupId: string, groupName: string) => {
    console.log("Redirecting...");
    router.push({
      pathname: '/group/[id]',
      params: {
        id: groupId,
        groupName: groupName
      }
    });
  }


  // const groups : GroupEntity[] = [];

  return (
    
    <SafeAreaView style={{flex: 1}} edges={{top: "off", bottom: "off" }}>

      <View style={homeScreenStyles.container}>
        {/* Header */}
        <View style={[homeScreenStyles.header, {paddingTop: insets.top}]}>
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
                <Text style={homeScreenStyles.balanceValue}>{numberFormatter.formatToMoney(generalBalance)}</Text>
                <Text style={homeScreenStyles.balanceSubtitle}>em {groups.length} grupos ativos</Text>
              </View>

              <Text style={homeScreenStyles.sectionTitle}>grupos</Text>
            </>
          }
          ListEmptyComponent={
            <View style={{ padding: 20, alignItems: 'center', marginTop: 40 }}>
              <Text style={{ color: '#fff', fontSize: 16, marginBottom: 15 }}>
                Você ainda não participa de nenhum grupo.
              </Text>
              {/* Espaço perfeito para colocar o botão amigável exigido no escopo */}
            </View>
          }
          renderItem={({ item }) => (
            <GroupCardComponent
              group={item}
              onClick={() => openGroupDetails(item.id, item.title)}
            />
          )}
        />
      </View>

    </SafeAreaView>

  );
}
