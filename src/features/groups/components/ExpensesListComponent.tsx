import { Text } from 'react-native';

import { NumberFormatter } from '@/src/utils/NumberFormatter';
import { FlatList, View } from "react-native";
import { ExpenseComposition } from "../models/ExpenseComposition";
import { ExpensesListComponentStyle } from "./styles/GroupDetailsScreenStyle";

interface ExpanseListProps {
    expenses: ExpenseComposition[];
}

export default function ExpensesListComponent({ expenses }: ExpanseListProps) {

    const formatedValue = (value:number) =>{
        return NumberFormatter.formatToMoney(value);
    }

    return (
        <FlatList
            data={expenses}
            keyExtractor={(item) => item.expenseId}
            renderItem={({ item }) => (
                <View style={ExpensesListComponentStyle.cardItem}>
                    <View>
                        <Text style={ExpensesListComponentStyle.itemTitle}>{item.description}</Text>
                        <Text style={ExpensesListComponentStyle.itemSubtitle}>Pago por {item.memberName}</Text>
                    </View>
                    <Text style={ExpensesListComponentStyle.itemAmount}>{formatedValue(item.totalAmount)}</Text>
                </View>
            )}
            ListEmptyComponent={
                <Text style={ExpensesListComponentStyle.emptyText}>Nenhuma despesa registrada ainda.</Text>
            }
        />
    )
}