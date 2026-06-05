import { Text, TouchableOpacity } from 'react-native';
import { AddExpensesButtonComponentStyle } from "./styles/GroupDetailsScreenStyle";

interface Props {
  onPress: () => void;
}

export default function AddExpensesComponentButton({ onPress }: Props) {
  return (
    <TouchableOpacity style={AddExpensesButtonComponentStyle.fab} onPress={onPress}>
      <Text style={AddExpensesButtonComponentStyle.fabText}>+</Text>
    </TouchableOpacity>
  );
}

