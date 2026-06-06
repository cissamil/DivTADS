import { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { MemberEntity } from '@/src/features/groups/models/MemberEntity';
import { ExpenseEntity } from '@/src/features/groups/models/ExpenseEntity';
import GroupHeaderComponent from '@/src/features/groups/components/GroupHeaderComponent';
import MembersListComponent from '@/src/features/groups/components/MembersListComponent';
import MenuSelectorComponent from '@/src/features/groups/components/MenuSelectorComponent';
import ExpensesListComponent from '@/src/features/groups/components/ExpensesListComponent';
import GroupSummaryComponent from '@/src/features/groups/components/GroupSummaryComponent';
import InviteUserButtonComponent from '@/src/features/groups/components/InviteUserButtonComponent';
import AddExpensesComponentButton from '@/src/features/groups/components/AddExpensesButtonComponent';
import { GroupDetailsScreenStyle } from '@/src/features/groups/components/styles/GroupDetailsScreenStyle';
import { useExpense } from '@/src/contexts/ExpenseContext';
import AddExpenseModalComponent from '@/src/features/groups/components/AddExpenseModalComponent';
import { useGroup } from '@/src/contexts/GroupContext';
import { MemberComposition } from '@/src/features/home/models/MemberComposition';
import { MembersService } from '@/src/features/home/services/MembersService';
import { useAuth } from '@/src/contexts/AuthContext';

const membersService: MembersService = new MembersService();

export default function GroupDetailsScreen() {

  const { id, groupName } = useLocalSearchParams();
  const groupId: string = id as string;
  console.log(groupId);

  // Estado local para gerenciar o menu seletor (Toggle interno)
  const [activeTab, setActiveTab] = useState<'expenses' | 'members'>('expenses');

  const  {userData} = useAuth();

  //despesas
  const {expenses, fetchExpenses } = useExpense();
  const [modalVisible, setModalVisible] = useState(false);

  const {selectedGroup} = useGroup();

  const [members, setMembers] = useState<MemberComposition[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchExpenses(groupId);

    const fetchMembersInformation = async (groupId: string) =>{
      setIsLoading(true);

      const members = await membersService.getGroupsGeneralInformationsByUserId(groupId);

      if(members){
        
        setMembers(members);
      }

      setIsLoading(false)
    }

    fetchMembersInformation(groupId);
  }, [groupId]);

  const currentMember = members.find((member) => member.userId == userData?.userId);

  // 3. Tratamento de Loading visualmente agradável antes do tratamento de Erro
  if (isLoading) {
    return (
      <View style={[GroupDetailsScreenStyle.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#6366f1" />
      </View>
    );
  }

  // Se terminou de carregar e mesmo assim faltou dado, aí sim mostramos erro
  if (!selectedGroup || !currentMember) {
    return (
      <View style={[GroupDetailsScreenStyle.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ color: 'red' }}>Erro ao pegar informações do Grupo</Text>
      </View>
    );
  }


  return (
    <View style={GroupDetailsScreenStyle.container}>
      {/* Top Header Customizado com botão de voltar */}
      <GroupHeaderComponent groupName={groupName as string} />

      {/* Card de Contexto Financeiro do Grupo */}
      <GroupSummaryComponent total_balance={selectedGroup.totalBalance} currentUserTotalSpent={currentMember.total_spent} />

      {/* Menu Seletor Interno (Toggle Despesas vs Membros) */}
      <MenuSelectorComponent 
        activeTab={activeTab} 
        selectExpenses={() => setActiveTab('expenses')} 
        selectMembers={() => setActiveTab('members')}
      />

      {/* Área de Exibição Condicional de Listas */}
      <View style={GroupDetailsScreenStyle.contentContainer}>
        {activeTab === 'expenses'

          ? <ExpensesListComponent expenses={expenses} />
          : <MembersListComponent members={members}/>
        }
      </View>

      {activeTab === 'expenses' && <AddExpensesComponentButton onPress={() => setModalVisible(true)} />}
      {activeTab === 'members' && <InviteUserButtonComponent groupId={groupId} groupName={groupName as string}/>}

      <AddExpenseModalComponent
          visible={modalVisible}
          groupId={groupId}
          onClose={() => setModalVisible(false)}
        />
      </View>

  );
}

