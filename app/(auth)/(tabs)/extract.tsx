import { useFocusEffect } from 'expo-router';
import { useAuth } from '@/src/contexts/AuthContext';
import { useCallback, useEffect, useState } from 'react';
import { useExpense } from '@/src/contexts/ExpenseContext';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { HomeScreenStyles } from '@/src/features/home/components/styles/homeScreenStyles';
import ExpensesListComponent from '@/src/features/groups/components/ExpensesListComponent';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { GroupDetailsScreenStyle } from '@/src/features/groups/components/styles/GroupDetailsScreenStyle';

export default function Extract() {
  const insets = useSafeAreaInsets();
  const { isLoading, allExpenses, fetchAllExpensesByUserId: fetchAllExpenses } = useExpense();
  const { userData } = useAuth();

  //pull to refresh
  const [refreshing, setRefreshing] = useState(false);

  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
  const [onlyWithReceipt, setOnlyWithReceipt] = useState(false);

  const onRefresh = async () => {

    if (!userData) return;

    setRefreshing(true);
    await fetchAllExpenses(userData.userId);
    setRefreshing(false);
  };

  useFocusEffect(
    useCallback(() => {
      if (!userData) return;

      const fetchNewExpenses = async () => { await fetchAllExpenses(userData.userId) };

      fetchNewExpenses();
    }, [])
  )

  const uniqueGroups = Array.from(new Set(allExpenses.map(e => e.groupId))).map(id => {
    const expense = allExpenses.find(e => e.groupId === id);
    return { id: id, name: expense?.groupName }
  })

  const filteredExpenses = allExpenses.filter(expense => {
    const matchesGroup = selectedGroupId ? expense.groupId === selectedGroupId : true;
    const matchesReceipt = onlyWithReceipt ? !!expense.receiptUrl : true;
    return matchesGroup && matchesReceipt
  })


  if (isLoading && allExpenses.length === 0) {
    return (
      <View style={[GroupDetailsScreenStyle.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#6366f1" />
      </View>
    );
  }


  return (

    <SafeAreaView style={{ flex: 1 }} edges={{ top: "off", bottom: "off" }}>
      <View style={GroupDetailsScreenStyle.container}>

        <View style={[HomeScreenStyles.header, { paddingTop: insets.top }]}>
          <Text style={HomeScreenStyles.headerTitle}>EXTRATO GERAL</Text>
        </View>

        <View style={styles.filterSection}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.groupFilters}>
            <TouchableOpacity
              style={[styles.filterChip, selectedGroupId === null && styles.filterChipActive]}
              onPress={() => setSelectedGroupId(null)}
            >
              <Text style={[styles.filterText, selectedGroupId === null && styles.filterTextActive]}>
                Todos
              </Text>
            </TouchableOpacity>

            {uniqueGroups.map((group) => (
              <TouchableOpacity
                key={group.id}
                style={[styles.filterChip, selectedGroupId === group.id && styles.filterChipActive]}
                onPress={() => setSelectedGroupId(group.id)}
              >
                <Text style={[styles.filterText, selectedGroupId === group.id && styles.filterTextActive]}>
                  {group.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={styles.toggleContainer}>
            <TouchableOpacity
              style={[styles.receiptToggle, onlyWithReceipt && styles.receiptToggleActive]}
              onPress={() => setOnlyWithReceipt(!onlyWithReceipt)}
            >
              <Text style={[styles.filterText, onlyWithReceipt && styles.filterTextActive]}>
                {onlyWithReceipt ? '✓ Com comprovante' : '📎 Só com comprovante'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={GroupDetailsScreenStyle.contentContainer}>

          <ExpensesListComponent 
            expenses={filteredExpenses} 
            refreshing={refreshing} 
            onRefresh={onRefresh} 
            screenOption='ExtractScreen' 
          />
        </View>
      </View>
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1a1a1a' },
  text: { color: '#fff' },
  filterSection: {
    paddingVertical: 10,
    backgroundColor: '#1a1a1a',
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a2a',
  },
  groupFilters: {
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  filterChip: {
    backgroundColor: '#2a2a2a',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#333',
  },
  filterChipActive: {
    backgroundColor: '#6366f1',
    borderColor: '#6366f1',
  },
  filterText: {
    color: '#999',
    fontSize: 14,
    fontWeight: '500',
  },
  filterTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
  toggleContainer: {
    paddingHorizontal: 16,
  },
  receiptToggle: {
    alignSelf: 'flex-start',
    backgroundColor: '#2a2a2a',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#333',
  },
  receiptToggleActive: {
    backgroundColor: 'rgba(99, 102, 241, 0.2)', 
    borderColor: '#6366f1',
  }
});