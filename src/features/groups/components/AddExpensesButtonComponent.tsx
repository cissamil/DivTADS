import { Text } from 'react-native';

import { TouchableOpacity } from "react-native";
import { AddExpensesButtonComponentStyle } from "./styles/GroupDetailsScreenStyle";

export default function AddExpensesComponentButton() {
    return (
        <TouchableOpacity style={AddExpensesButtonComponentStyle.fab} onPress={() => console.log('Abrir Modal de Despesa')}>
            <Text style={AddExpensesButtonComponentStyle.fabText}>+</Text>
        </TouchableOpacity>
    )
}