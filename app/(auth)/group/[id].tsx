import { useAuth } from '@/src/contexts/AuthContext';
import { useExpense } from '@/src/contexts/ExpenseContext';
import { useGroup } from '@/src/contexts/GroupContext';
import AddExpenseModalComponent from '@/src/features/groups/components/AddExpenseModalComponent';
import AddExpensesComponentButton from '@/src/features/groups/components/AddExpensesButtonComponent';
import ExpensesListComponent from '@/src/features/groups/components/ExpensesListComponent';
import GroupHeaderComponent from '@/src/features/groups/components/GroupHeaderComponent';
import GroupSummaryComponent from '@/src/features/groups/components/GroupSummaryComponent';
import InviteUserButtonComponent from '@/src/features/groups/components/InviteUserButtonComponent';
import MembersListComponent from '@/src/features/groups/components/MembersListComponent';
import MenuSelectorComponent from '@/src/features/groups/components/MenuSelectorComponent';
import { GroupDetailsScreenStyle } from '@/src/features/groups/components/styles/GroupDetailsScreenStyle';
import { MemberComposition } from '@/src/features/home/models/MemberComposition';
import { MembersService } from '@/src/features/services/MembersService';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const membersService: MembersService = new MembersService();

export default function GroupDetailsScreen() {
  
  const { userData } = useAuth();
  const insets = useSafeAreaInsets();
  const { id, groupName } = useLocalSearchParams();
  const { selectedGroup, leaveGroup, deleteGroup, error } = useGroup();
  const { expensesByGroup, fetchExpensesByGroup } = useExpense();
  
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [members, setMembers] = useState<MemberComposition[]>([]);
  const [activeTab, setActiveTab] = useState<'expenses' | 'members'>('expenses');
  
  const groupId: string = id as string;

  const onExpensesRefresh = async () => {
    setRefreshing(true);
    await fetchExpensesByGroup(groupId);
    setRefreshing(false);
  };

  const onMembersRefresh = async () => {
    setRefreshing(true);

    const newMembers = await membersService.getGroupsGeneralInformationsByUserId(groupId);

    if (newMembers) {
      setMembers(newMembers);
    }

    setRefreshing(false);
  };

  useEffect(() => {
    const fetchNewExpenses = async () => { await fetchExpensesByGroup(groupId) };

    const fetchMembersInformation = async (groupId: string) => {
      setIsLoading(true);

      const members = await membersService.getGroupsGeneralInformationsByUserId(groupId);

      if (members) {

        setMembers(members);
      }

      setIsLoading(false)
    }

    fetchNewExpenses();
    fetchMembersInformation(groupId);
  }, [groupId]);

  const currentMember = members.find((member) => member.userId == userData?.userId);
  const groupCreator = members.find((members) => members.userId == selectedGroup?.creatorId)
  const isGroupCreator = currentMember?.memberId === groupCreator?.memberId;

  const handleLeaveOrDeleteGroup = () => {

    const title = isGroupCreator ? "Deletar Grupo" : "Saido do Grupo";
    const description = isGroupCreator 
      ? `Tem certeza que deseja deletar o grupo '${groupName}'? Essa ação não pode desfeita e você perderá todo o histórico do grupo`
      : `Tem certeza que deseja sair do grupo '${groupName}'?`;
      
    const option = isGroupCreator ? 'Deletar' : 'Sair';
    const optionError = isGroupCreator ? 'deletar' : 'sair do';
    const optionSuccess = isGroupCreator ? 'deletou' : 'saiu do';

    Alert.alert(title, description, [
      {text: 'Cancelar', style:'cancel'},
      {
        text: option,
        style: 'destructive',

        onPress: async () =>{
          if(!currentMember?.memberId) return;
          if(!groupCreator?.memberId) return;
          
          isGroupCreator ? await deleteGroup(groupId) : await leaveGroup(currentMember.memberId);

          if(error) {
            Alert.alert(`Erro ao ${optionError} grupo`, error);
            return;
          }

          Alert.alert("Sucesso", `Você ${optionSuccess} grupo.`)

          router.replace('/home');
        }
      }
    ])

  }


  if (isLoading) {
    return (
      <View style={[GroupDetailsScreenStyle.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#6366f1" />
      </View>
    );
  }

  if (!selectedGroup || !currentMember || !groupCreator) {
    return (
      <View style={[GroupDetailsScreenStyle.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ color: 'red' }}>Erro ao pegar informações do Grupo</Text>
      </View>
    );
  }


  return (
    <View style={[GroupDetailsScreenStyle.container, { paddingBottom: insets.bottom + 10, paddingTop: 10 }]}>

      <GroupHeaderComponent groupName={groupName as string} onLeave={handleLeaveOrDeleteGroup} isGroupCreator={isGroupCreator} />

      <GroupSummaryComponent total_balance={selectedGroup.totalBalance} currentUserTotalSpent={currentMember.total_spent} />

      <MenuSelectorComponent
        activeTab={activeTab}
        selectExpenses={() => setActiveTab('expenses')}
        selectMembers={() => setActiveTab('members')}
      />

      <View style={GroupDetailsScreenStyle.contentContainer}>
        {activeTab === 'expenses'

          ? <ExpensesListComponent 
              expenses={expensesByGroup} 
              refreshing={refreshing} 
              onRefresh={onExpensesRefresh} 
              screenOption='GroupDetailsScreen' 
            />

          : <MembersListComponent 
              members={members} 
              currentMemberId={currentMember.memberId} 
              creatorId={groupCreator?.userId} 
              refreshing={refreshing} 
              onRefresh={onMembersRefresh} 
            />
        }
      </View>

      {activeTab === 'expenses' && <AddExpensesComponentButton onPress={() => setModalVisible(true)} />}
      {activeTab === 'members' && <InviteUserButtonComponent groupId={groupId} groupName={groupName as string} />}

      <AddExpenseModalComponent
        visible={modalVisible}
        groupId={groupId}
        memberId={currentMember.memberId}
        onClose={() => setModalVisible(false)}
      />
    </View>

  );
}

