import { useAuth } from '@/src/contexts/AuthContext';
import { useGroup } from '@/src/contexts/GroupContext';
import CreateGroupModalComponent from '@/src/features/groups/components/CreateGroupModalComponent';
import GroupCardComponent from '@/src/features/home/components/GroupCardComponent';
import { GroupComposition } from '@/src/features/home/models/GroupComposition';
import { NumberFormatter } from '@/src/utils/formatMoney';
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { HomeScreenStyles } from '../../../src/features/home/components/styles/homeScreenStyles';


export default function Home() {

  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { userData } = useAuth();
  const [modalVisible, setModalVisible] = useState(false);
  const { fetchGroups, selectGroup, groupsList: groups, createGroup } = useGroup();
  const generalBalance = groups.reduce((total, group) => total + group.totalBalance, 0)

  
  useFocusEffect(
    useCallback(() => {
      
      if (!userData?.userId) return;
      
      fetchGroups(userData.userId);
    }, [userData?.userId])
  )

  const handleGroupCreation = async (title: string, description: string, userId: string) => {
    await createGroup(title, description, userId);
    setModalVisible(false);
  }

  const openGroupDetails = (group: GroupComposition) => {
    console.log("Redirecting...");

    selectGroup(group);

    router.push({
      pathname: '/group/[id]',
      params: {
        id: group.id,
        groupName: group.title
      }
    });
  }

  return (
    <SafeAreaView style={{ flex: 1 }} edges={{ top: "off", bottom: "off" }}>
      <View style={HomeScreenStyles.container}>

        {/* Header */}
        <View style={[HomeScreenStyles.header, { paddingTop: insets.top }]}>
          <Text style={HomeScreenStyles.headerTitle}>{userData?.name ?? "Usuario"} - MEUS GRUPOS</Text>
        </View>

        <FlatList
          style={HomeScreenStyles.content}
          data={groups}
          keyExtractor={item => String(item.id)}
          ListHeaderComponent={
            <>
              <View style={HomeScreenStyles.balanceCard}>
                <Text style={HomeScreenStyles.balanceLabel}>saldo consolidado</Text>
                <Text style={HomeScreenStyles.balanceValue}>{NumberFormatter.formatToMoney(generalBalance)}</Text>
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
              onClick={() => openGroupDetails(item)}
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
          onCreate={handleGroupCreation}
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