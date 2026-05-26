import { useAuth } from '@/src/contexts/AuthContext';
import GroupCardComponent from '@/src/features/home/components/GroupCardComponent';
import { GroupEntity } from '@/src/features/home/models/GroupEntity';
import { GroupService } from '@/src/features/home/services/groupService';
import { NumberFormatter } from '@/src/utils/formatMoney';
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { FlatList, Text, View, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { HomeScreenStyles } from '../../../src/features/home/components/styles/homeScreenStyles';
import CreateGroupModalComponent from '@/src/features/groups/components/CreateGroupModalComponent';


const numberFormatter: NumberFormatter = new NumberFormatter();
const groupService: GroupService = new GroupService();

export default function Home() {

  const insets = useSafeAreaInsets();
  const router = useRouter();
  const {userData, logout} = useAuth();
  const [groups, setGroups] = useState<GroupEntity[]>([]);
  const generalBalance = groups.reduce((total, group) => total + group.totalBalance, 0 )
  const [modalVisible, setModalVisible] = useState(false);
  
  useFocusEffect(
    useCallback(() =>{

      if(!userData?.userId) return;

      const fetchedGroups = async () => {
        console.log("Buscando grupos atualizados (Tela em Foco)...");
        const response = await groupService.getGroupsGeneralInformationsByUserId(userData.userId);

        if (response) {
          setGroups(response);
        }
      };

      fetchedGroups();
    }, [userData?.userId])
  )

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
    <SafeAreaView style={{ flex: 1 }} edges={{ top: "off", bottom: "off" }}>
      <View style={HomeScreenStyles.container}>

        {/* Header */}
        <View style={[HomeScreenStyles.header, { paddingTop: insets.top }]}>
          <Text style={HomeScreenStyles.headerTitle}>{userData?.name ?? "Usuario"} - MEUS GRUPOS</Text>
          <Text style={[HomeScreenStyles.headerTitle, HomeScreenStyles.signOut]} onPress={logout}>Sair da sua conta</Text>
        </View>

        <FlatList
          style={HomeScreenStyles.content}
          data={groups}
          keyExtractor={item => String(item.id)}
          ListHeaderComponent={
            <>
              <View style={HomeScreenStyles.balanceCard}>
                <Text style={HomeScreenStyles.balanceLabel}>saldo consolidado</Text>
                <Text style={HomeScreenStyles.balanceValue}>{numberFormatter.formatToMoney(generalBalance)}</Text>
                <Text style={HomeScreenStyles.balanceSubtitle}>em {groups.length} grupos ativos</Text>
              </View>
              <Text style={HomeScreenStyles.sectionTitle}>grupos</Text>
            </>
          }
          ListEmptyComponent={
            <View style={{ padding: 20, alignItems: 'center', marginTop: 40 }}>
              <Text style={{ color: '#fff', fontSize: 16, marginBottom: 15 }}>
                Você ainda não participa de nenhum grupo.
              </Text>
            </View>
          }
          renderItem={({ item }) => (
            <GroupCardComponent
              group={item}
              onClick={() => openGroupDetails(item.id, item.title)}
            />
          )}
        />

        {/* FAB */}
        <TouchableOpacity
          style={[fabStyles.fab, { bottom: 72 + insets.bottom }]}
          onPress={() => setModalVisible(true)}
          activeOpacity={0.8}
        >
          <Text style={fabStyles.fabIcon}>+</Text>
        </TouchableOpacity>
        <Text style={[fabStyles.fabLabel, { bottom: 52 + insets.bottom }]}>Criar Grupo</Text>

        {/* Modal Criar Grupo */}
        <CreateGroupModalComponent
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
           />

      </View>
    </SafeAreaView>
  );
}


const fabStyles = StyleSheet.create({
  fab: {
    position: 'absolute',
    alignSelf: 'center',
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#6366f1',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
  },
  fabIcon: {
    color: '#fff',
    fontSize: 32,
    fontWeight: '300',
    lineHeight: 36,
  },
  fabLabel: {
    position: 'absolute',
    alignSelf: 'center',
    color: '#fff',
    fontSize: 13,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#1a1a1a',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    minHeight: 300,
  },
  modalTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
  },
  closeButton: {
    color: '#6366f1',
    fontSize: 16,
    marginTop: 16,
  },
});