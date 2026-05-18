import { View, Text, StyleSheet } from 'react-native';

export default function ExtratoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Tela de Informações do Grupo em construção...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1a1a1a' },
  text: { color: '#fff' }
});