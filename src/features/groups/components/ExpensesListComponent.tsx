import { Text } from 'react-native';

import { FlatList, View } from "react-native";
import { ExpenseEntity } from "../models/ExpenseEntity";
import { ExpensesListComponentStyle } from "./styles/GroupDetailsScreenStyle";

interface ExpanseListProps {
    expenses: ExpenseEntity[];
}

export default function ExpensesListComponent({ expenses }: ExpanseListProps) {
    return (
        <FlatList
            data={expenses}
            keyExtractor={(item) => item.expenseId}
            renderItem={({ item }) => (
                <View style={ExpensesListComponentStyle.cardItem}>
                    <View>
                        <Text style={ExpensesListComponentStyle.itemTitle}>{item.description}</Text>
                        <Text style={ExpensesListComponentStyle.itemSubtitle}>Pago por {item.memberId}</Text>
                    </View>
                    <Text style={ExpensesListComponentStyle.itemAmount}>R$ {item.totalAmount.toFixed(2)}</Text>
                </View>
            )}
            ListEmptyComponent={
                <Text style={ExpensesListComponentStyle.emptyText}>Nenhuma despesa registrada ainda.</Text>
            }
        />
    )
}