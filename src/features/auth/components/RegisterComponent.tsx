import { useAuth } from '@/src/contexts/AuthContext';
import { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import {MaskedTextInput} from 'react-native-mask-text';
import { RegisterComponentStyles } from './styles/RegisterComponentStyle';

export default function RegisterComponent({ onSuccess }: { onSuccess: () => void }) {
  const { register, isLoading } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [formattedValue, setFormattedValue] = useState('');

  const handleRegister = async () => {
    await register({ name, email, phoneNumber, password });
    onSuccess();
  }

  return (
    <View style={RegisterComponentStyles.container}>
      <TextInput
        style={RegisterComponentStyles.input}
        placeholder="Nome"
        placeholderTextColor="#666"
        value={name}
        onChangeText={setName}
        autoCapitalize="words"
      />
      <TextInput
        style={RegisterComponentStyles.input}
        placeholder="E-mail"
        placeholderTextColor="#666"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <MaskedTextInput
        mask="(99) 99999-9999"
        onChangeText={(text) => {
          setPhoneNumber(text);
        }}
        placeholder='Telefone'
        style={RegisterComponentStyles.input}
        keyboardType="numeric"
        placeholderTextColor="#666"

      />
      <TextInput
        style={RegisterComponentStyles.input}
        placeholder="Senha"
        placeholderTextColor="#666"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      
      <TouchableOpacity 
        style={[RegisterComponentStyles.button, isLoading && RegisterComponentStyles.buttonDisabled]} 
        onPress={handleRegister} 
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={RegisterComponentStyles.buttonText}>Cadastrar</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
