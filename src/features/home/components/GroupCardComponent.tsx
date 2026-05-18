import { StyleSheet, Text, View } from 'react-native';
import { GroupEntity } from '../models/GroupEntity';

export default function GroupCardComponent(group: GroupEntity) {

    return (
        <View key={group.id} style={styles.groupCard}>
            <View style={styles.groupIcon}>
                <Text style={styles.groupIconText}>🏠</Text>
            </View>
            <View style={styles.groupInfo}>
                <Text style={styles.groupName}>{group.name}</Text>
                <Text style={styles.groupDetails}>
                    {group.numberOfMembers} membros · {group.numberOfExpenses} despesas
                </Text>
            </View>
            <View style={styles.groupBalance}>
                <Text style={[styles.balanceText, group.totalBalance >= 0 ? styles.positive : styles.negative]}>
                    R$ {group.totalBalance}
                </Text>
                <Text style={styles.statusText}>{
                        group.totalBalance >= 0 ? "a receber" : "a pagar"
                    }           
                </Text>
            </View>
        </View>
    );

}



const styles = StyleSheet.create({
  groupCard: {
    flexDirection: 'row',
    backgroundColor: '#262626',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  groupIcon: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  groupIconText: {
    fontSize: 24,
  },
  groupInfo: {
    flex: 1,
  },
  groupName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  groupDetails: {
    fontSize: 12,
    color: '#999',
  },
  groupBalance: {
    alignItems: 'flex-end',
  },
  balanceText: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 2,
  },
  positive: {
    color: '#10b981',
  },
  negative: {
    color: '#ef4444',
  },
  statusText: {
    fontSize: 11,
    color: '#666',
  },
});