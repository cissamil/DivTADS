import { useState } from 'react';
import { View } from 'react-native';
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

export default function GroupDetailsScreen() {
  const { id, groupName } = useLocalSearchParams();
  const groupId: string = id as string;

  // Estado local para gerenciar o menu seletor (Toggle interno)
  const [activeTab, setActiveTab] = useState<'expenses' | 'members'>('expenses');

  // Mocks estruturais provisórios para visualização do esqueleto
  const mockExpenses: ExpenseEntity[] = [
    { expenseId: '1', groupId: groupId, description: 'Supermercado', totalAmount: 150.00, memberId: 'Você' },
    { expenseId: '2', groupId: groupId, description: 'Churrasco', totalAmount: 240.00, memberId: 'Luiz' },
  ];

  const mockMembers: MemberEntity[] = [
    { memberId: '1', memberName: 'Você', balance: 45.00 },
    { memberId: '2', memberName: 'Luiz', balance: -15.00 },
    { memberId: '3', memberName: 'Natália', balance: -30.00 },
  ];

  return (
    <View style={GroupDetailsScreenStyle.container}>
      {/* Top Header Customizado com botão de voltar */}
      <GroupHeaderComponent groupName={groupName as string} />

      {/* Card de Contexto Financeiro do Grupo */}
      <GroupSummaryComponent />

      {/* Menu Seletor Interno (Toggle Despesas vs Membros) */}
      <MenuSelectorComponent 
        activeTab={activeTab} 
        selectExpenses={() => setActiveTab('expenses')} 
        selectMembers={() => setActiveTab('members')}
      />

      {/* Área de Exibição Condicional de Listas */}
      <View style={GroupDetailsScreenStyle.contentContainer}>
        {activeTab === 'expenses'

          ? <ExpensesListComponent expenses={mockExpenses}/>
          : <MembersListComponent members={mockMembers}/>
        }
      </View>

      {activeTab === 'expenses' && <AddExpensesComponentButton />}
      {activeTab === 'members' && <InviteUserButtonComponent />}
    </View>
  );
}

