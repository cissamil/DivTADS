import { useAuth } from '@/src/contexts/AuthContext';
import { useGroup } from '@/src/contexts/GroupContext';
import CreateGroupModalComponent from '@/src/features/groups/components/CreateGroupModalComponent';
import GroupCardComponent from '@/src/features/home/components/GroupCardComponent';
import { GroupComposition } from '@/src/features/home/models/GroupComposition';
import { NumberFormatter } from '@/src/utils/NumberFormatter';
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View, RefreshControl } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { HomeScreenFabStyles, HomeScreenStyles } from '../../../src/features/home/components/styles/homeScreenStyles';


export default function Home() {

  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { userData } = useAuth();
  const [modalVisible, setModalVisible] = useState(false);
  const { fetchGroups, selectGroup, groupsList: groups, createGroup } = useGroup();
  const generalBalance = groups.reduce((total, group) => total + group.totalBalance, 0);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchGroups(userData!.userId);
    setRefreshing(false);
  };


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
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
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
          style={[HomeScreenFabStyles.fab, { bottom: 72 + insets.bottom }]}
          onPress={() => setModalVisible(true)}
          activeOpacity={0.8}
        >
          <Text style={HomeScreenFabStyles.fabIcon}>+</Text>
        </TouchableOpacity>

        {
          groups.length > 0 ? (

            <Text style={[HomeScreenFabStyles.fabLabel, { bottom: 52 + insets.bottom }]}>Novo Grupo</Text>
          )
          : (
            
            <Text style={[HomeScreenFabStyles.fabLabel, { bottom: 52 + insets.bottom }]}>Crie seu primeiro grupo</Text>
            
          )
        }

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


