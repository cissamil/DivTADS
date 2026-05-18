import { Text, TouchableOpacity, View } from 'react-native';
import { GroupEntity } from '../models/GroupEntity';
import { groupCardStyles } from './styles/GroupCardComponentStyles';

type GroupCardProps = {
    group: GroupEntity;
    onClick: () => void;
};

export default function GroupCardComponent({group, onClick} : GroupCardProps) {

    const isTotalBalanceNegative = group.totalBalance < 0;
    const balanceSign = isTotalBalanceNegative ? "- R$" : "R$";
    const balanceNumber = isTotalBalanceNegative ? group.totalBalance * -1 : group.totalBalance;
    const balanceStatus = isTotalBalanceNegative ? "a receber" : "a pagar"
    const balanceStyle = isTotalBalanceNegative ? groupCardStyles.negative : groupCardStyles.positive;

    return (
        <TouchableOpacity onPress={() => onClick()}>
            <View style={groupCardStyles.groupCard}>
                <View style={groupCardStyles.groupIcon}>
                    <Text style={groupCardStyles.groupIconText}>🏠</Text>
                </View>
                <View style={groupCardStyles.groupInfo}>
                    <Text style={groupCardStyles.groupName}>{group.name}</Text>
                    <Text style={groupCardStyles.groupDetails}>
                        {group.numberOfMembers} membros · {group.numberOfExpenses} despesas
                    </Text>
                </View>
                <View style={groupCardStyles.groupBalance}>
                    <Text style={[groupCardStyles.balanceText, balanceStyle]}>
                    {balanceSign} {balanceNumber}
                    </Text>
                    <Text style={groupCardStyles.statusText}>{balanceStatus}           
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );

}


