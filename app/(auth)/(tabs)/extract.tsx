import { useAuth } from '@/src/contexts/AuthContext';
import { useExpense } from '@/src/contexts/ExpenseContext';
import ExpensesListComponent from '@/src/features/groups/components/ExpensesListComponent';
import { GroupDetailsScreenStyle } from '@/src/features/groups/components/styles/GroupDetailsScreenStyle';
import { HomeScreenStyles } from '@/src/features/home/components/styles/homeScreenStyles';
import { useFocusEffect } from 'expo-router';
import { useCallback, useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Extract() {
  const insets = useSafeAreaInsets();
  const { isLoading, allExpenses, fetchAllExpensesByUserId: fetchAllExpenses } = useExpense();
  const {userData} = useAuth();


  useFocusEffect(
    useCallback(() => {
      if(!userData) return;

      const fetchNewExpenses = async () => { await fetchAllExpenses(userData.userId) };

      fetchNewExpenses();
    },[])
  )


  if (isLoading) {
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

        <View style={GroupDetailsScreenStyle.contentContainer}>

          <ExpensesListComponent expenses={allExpenses} screenOption='ExtractScreen' />
        </View>
      </View>
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1a1a1a' },
  text: { color: '#fff' }
});