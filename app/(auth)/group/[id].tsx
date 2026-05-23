import { useLocalSearchParams } from 'expo-router';
import { group } from 'node:console';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function GroupDetailsScreen() {

  const {id, groupName} = useLocalSearchParams();

  return (
      <SafeAreaView style={{ flex: 1 }} edges={{ bottom: "off" }}>
        <View style={styles.container}>
          {/* Usando o parâmetro 'name' extraído da rota */}
          <Text style={styles.title}>Grupo: {groupName}</Text>
          
          {/* Usando o parâmetro 'id' (seu UUID) */}
          <Text style={styles.subtitle}>ID do Grupo: {id}</Text>
          
          <View style={styles.content}>
            <Text style={styles.text}>Aqui entrará a lista de despesas...</Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#1a1a1a',
    padding: 20
  },
  title: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    color: '#fff',
    marginBottom: 8
  },
  subtitle: { 
    fontSize: 12, 
    color: '#666',
    marginBottom: 24
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: { 
    color: '#999' 
  }
});