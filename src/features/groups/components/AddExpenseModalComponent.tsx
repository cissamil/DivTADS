import { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useExpense } from '@/src/contexts/ExpenseContext';

interface Props {
  visible: boolean;
  groupId: string;
  memberId: string;
  onClose: () => void;
}

export default function AddExpenseModalComponent({ visible, groupId, memberId, onClose }: Props) {
  const { createExpense } = useExpense();
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  const handleSave = async () => {
    const total = parseFloat(amount.replace(',', '.'));
    if (!description || isNaN(total)) {
      Alert.alert('Preencha todos os campos');
      return;
    }
    await createExpense(groupId, total, memberId, description);
    setDescription('');
    setAmount('');
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <View style={{ backgroundColor: '#1e1e1e', padding: 24, borderTopLeftRadius: 16, borderTopRightRadius: 16 }}>
          <Text style={{ color: '#fff', fontSize: 18, marginBottom: 16 }}>Nova Despesa</Text>
          <TextInput
            placeholder="Descrição"
            placeholderTextColor="#888"
            value={description}
            onChangeText={setDescription}
            style={{ backgroundColor: '#2a2a2a', color: '#fff', padding: 12, borderRadius: 8, marginBottom: 12 }}
          />
          <TextInput
            placeholder="Valor (ex: 150,00)"
            placeholderTextColor="#888"
            value={amount}
            onChangeText={setAmount}
            keyboardType="decimal-pad"
            style={{ backgroundColor: '#2a2a2a', color: '#fff', padding: 12, borderRadius: 8, marginBottom: 24 }}
          />
          <TouchableOpacity onPress={handleSave} style={{ backgroundColor: '#6c63ff', padding: 14, borderRadius: 8, alignItems: 'center' }}>
            <Text style={{ color: '#fff' }}>Salvar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onClose} style={{ padding: 14, alignItems: 'center' }}>
            <Text style={{ color: '#888' }}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}