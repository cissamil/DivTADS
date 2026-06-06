import { NumberFormatter } from '@/src/utils/formatMoney';
import { Text, TouchableOpacity, View } from 'react-native';
import { GroupComposition } from '../models/GroupComposition';
import { GroupCardStyles } from './styles/GroupCardComponentStyles';

type GroupCardProps = {
    group: GroupComposition;
    onClick: () => void;
};

const numberFormatter: NumberFormatter = new NumberFormatter();

function isPlural(quantity:number): boolean{
    return quantity > 1;
}

export default function GroupCardComponent({group, onClick} : GroupCardProps) {

    const balance = numberFormatter.formatToMoney(group.totalBalance);
    const memberQuantityText = isPlural(group.numberOfMembers) ? "membros" : "membro"
    const expenseQuantityText = isPlural(group.numberOfExpenses) ? "despesas" : "despesa"

    return (
        <TouchableOpacity onPress={() => onClick()}>
            <View style={GroupCardStyles.groupCard}>
                <View style={GroupCardStyles.groupIcon}>
                    <Text style={GroupCardStyles.groupIconText}>🏠</Text>
                </View>
                <View style={GroupCardStyles.groupInfo}>
                    <Text style={GroupCardStyles.groupName}>{group.title}</Text>
                    <Text style={GroupCardStyles.groupDetails}>
                        {group.numberOfMembers} {memberQuantityText} · {group.numberOfExpenses} {expenseQuantityText}
                    </Text>
                </View>
                <View style={GroupCardStyles.groupBalance}>
                    <Text style={[GroupCardStyles.balanceText, GroupCardStyles.positive]}> {balance}</Text>
                    <Text style={GroupCardStyles.statusText}>Total Gasto Pelo Grupo           
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );

}


