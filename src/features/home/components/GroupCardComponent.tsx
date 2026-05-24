import { NumberFormatter } from '@/src/utils/formatMoney';
import { Text, TouchableOpacity, View } from 'react-native';
import { GroupEntity } from '../models/GroupEntity';
import { GroupCardStyles } from './styles/GroupCardComponentStyles';

type GroupCardProps = {
    group: GroupEntity;
    onClick: () => void;
};

const numberFormatter: NumberFormatter = new NumberFormatter();

function isPlural(quantity:number): boolean{
    return quantity > 1;
}

export default function GroupCardComponent({group, onClick} : GroupCardProps) {

    const balance = numberFormatter.formatToMoney(group.totalBalance);
    
    const isTotalBalanceNegative = group.totalBalance < 0;
    const balanceStatus = isTotalBalanceNegative ? "a pagar" : "a receber"
    const balanceStyle = isTotalBalanceNegative ? GroupCardStyles.negative : GroupCardStyles.positive;

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
                    <Text style={[GroupCardStyles.balanceText, balanceStyle]}> {balance}</Text>
                    <Text style={GroupCardStyles.statusText}>{balanceStatus}           
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );

}


