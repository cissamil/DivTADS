// app/(auth)/group/join.tsx
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { useAuth } from '@/src/contexts/AuthContext';
import { supabase } from '@/src/utils/supabase';

export default function JoinGroupScreen() {
  const { id } = useLocalSearchParams();
  const groupId = id as string;
  const router = useRouter();
  const { user } = useAuth();
  
  const [groupName, setGroupName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);

  // Busca o nome do grupo para validar se o link é real e dar contexto ao usuário
  useEffect(() => {
    if (!groupId) return;

    const fetchGroupDetails = async () => {
      const { data, error } = await supabase
        .rpc('get_group_name_for_invite', {
            p_group_id: groupId
        });

      if (error || !data) {
        Alert.alert('Erro', `Link de convite inválido ou grupo inexistente. ${error?.message}`);
        router.replace('/home');
      } else if (data) {
        setGroupName(data);
      }
      setLoading(false);
    };

    fetchGroupDetails();
  }, [groupId]);

  // Função que insere o usuário logado na tabela associativa de membros
  const handleJoin = async () => {
    if (!user || !groupId) return;
    setJoining(true);

    const { error } = await supabase
      .from('members') // Sua tabela associativa group_members
      .insert({
        group_id: groupId,
        user_id: user.id // ID do usuário logado que está aceitando o convite
      });

    setJoining(false);

    if (error) {
      // Código '23505' no Postgres significa que o registro já existe (já é membro)
      if (error.code === '23505') {
        Alert.alert('Aviso', 'Você já faz parte deste grupo!');
        router.replace({ pathname: '/group/[id]', params: { id: groupId, groupName: groupName ?? '' } });
      } else {
        Alert.alert('Erro ao entrar', error.message);
      }
    } else {
      Alert.alert('Sucesso', `Bem-vindo ao grupo ${groupName}!`);
      // Navega direto para a tela de detalhes do grupo após aceitar
      router.replace({ pathname: '/group/[id]', params: { id: groupId, groupName: groupName ?? '' } });
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#6366f1" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Convite Recebido</Text>
      <Text style={styles.subtitle}>Você foi convidado para participar do grupo financeiro:</Text>
      
      <View style={styles.groupCard}>
        <Text style={styles.groupIcon}>📊</Text>
        <Text style={styles.groupName}>{groupName}</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleJoin} disabled={joining}>
        {joining ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Aceitar Convite</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity style={styles.cancelButton} onPress={() => router.replace('/home')}>
        <Text style={styles.cancelButtonText}>Recusar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1a1a', padding: 24, justifyContent: 'center' },
  center: { flex: 1, backgroundColor: '#1a1a1a', justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#fff', textAlign: 'center', marginBottom: 8 },
  subtitle: { fontSize: 15, color: '#999', textAlign: 'center', marginBottom: 32, paddingHorizontal: 10 },
  groupCard: { backgroundColor: '#262626', borderRadius: 16, padding: 24, alignItems: 'center', marginBottom: 40, borderWidth: 1, borderColor: '#333' },
  groupIcon: { fontSize: 40, marginBottom: 12 },
  groupName: { fontSize: 20, fontWeight: 'bold', color: '#fff' },
  button: { backgroundColor: '#6366f1', padding: 16, borderRadius: 12, alignItems: 'center', marginBottom: 16, height: 56, justifyContent: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  cancelButton: { padding: 16, alignItems: 'center' },
  cancelButtonText: { color: '#ef4444', fontWeight: '600', fontSize: 16 }
});