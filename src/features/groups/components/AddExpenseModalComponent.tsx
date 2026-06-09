import { useExpense } from '@/src/contexts/ExpenseContext';
import { useState } from 'react';
import { Alert, Image, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { StorageService } from '../../services/StorageService';

interface Props {
  visible: boolean;
  groupId: string;
  memberId: string;
  onClose: () => void;
}

const storageService: StorageService = new StorageService();

export default function AddExpenseModalComponent({ visible, groupId, memberId, onClose }: Props) {
  const { createExpense, fetchExpensesByGroup: fetchExpenses } = useExpense();
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [amountValue, setAmountValue] = useState(0);

  const [imageUri, setImageUri] = useState<string | null>(null);

  const generateImageUri = async () => {
    const uri = await storageService.openCamera(groupId)

    setImageUri(uri)

  }
  
  const cleanForm = () =>{
    setDescription('');
    setAmount('');
    setImageUri(null);
  }

  const handleAmountChange = (text: string) => {
    const numericText = text.replace(/\D/g, '');

    if (!numericText) {
      setAmount('');
      return;
    }

    const floatValue = parseInt(numericText, 10) / 100;

    const formattedText = floatValue
      .toFixed(2)          
      .replace('.', ',')    
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'); 

    setAmount(formattedText);
  };
  
  const handleSave = async () => {

    const cleanNumericString = amount.replace(/\./g, '').replace(',', '.');
    const total = parseFloat(cleanNumericString);

    if (!description || isNaN(total)) {
      Alert.alert('Preencha todos os campos');
      return;
    }
    await createExpense(groupId, total, memberId, description, "", imageUri ?? "");
    cleanForm();
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
            onChangeText={handleAmountChange}
            keyboardType="number-pad"
            style={{ backgroundColor: '#2a2a2a', color: '#fff', padding: 12, borderRadius: 8, marginBottom: 24 }}
          />

          
          <TouchableOpacity style={styles.cameraButton} onPress={generateImageUri}>
            <Text style={styles.cameraButtonText}>📸 Anexar Foto do Recibo</Text>
          </TouchableOpacity>

          {imageUri && (
            <Image source={{ uri: imageUri }} style={styles.previewImage} />
          )}
          <TouchableOpacity onPress={handleSave} style={{ backgroundColor: '#6c63ff', padding: 14, borderRadius: 8, alignItems: 'center' }}>
            <Text style={{ color: '#fff' }}>Salvar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {onClose(), cleanForm()} } style={{ padding: 14, alignItems: 'center' }}>
            <Text style={{ color: '#888' }}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'flex-end' },
    content: { backgroundColor: '#1a1a1a', padding: 24, borderTopLeftRadius: 20, borderTopRightRadius: 20 },
    title: { color: '#fff', fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
    input: { backgroundColor: '#262626', color: '#fff', padding: 15, borderRadius: 10, marginBottom: 15, borderWidth: 1, borderColor: '#333' },
    cameraButton: { backgroundColor: '#333', padding: 15, borderRadius: 10, alignItems: 'center', marginBottom: 15, borderStyle: 'dashed', borderWidth: 1, borderColor: '#666' },
    cameraButtonText: { color: '#fff', fontWeight: '600' },
    previewImage: { width: 100, height: 100, borderRadius: 10, marginBottom: 15, alignSelf: 'center' },
    saveButton: { backgroundColor: '#6366f1', padding: 15, borderRadius: 10, alignItems: 'center', marginBottom: 10 },
    disabledButton: { opacity: 0.5 },
    saveButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
    cancelButton: { padding: 15, alignItems: 'center' },
    cancelButtonText: { color: '#ef4444', fontWeight: '600' }
});