import { Text } from 'react-native';
import { View } from "react-native";
import { GroupSummaryComponentStyle } from "./styles/GroupDetailsScreenStyle";
import { NumberFormatter } from '@/src/utils/formatMoney';

interface GroupInformationProps{

    total_balance: number;
    currentUserTotalSpent:number;

}

export default function GroupSummaryComponent({total_balance, currentUserTotalSpent} : GroupInformationProps) {

    const formatedBalance = NumberFormatter.formatToMoney(total_balance);
    const formatedCurrentUserTotalSpent = NumberFormatter.formatToMoney(currentUserTotalSpent);
    const isNegativeValue = currentUserTotalSpent < 0;
    const balanceColor = isNegativeValue ? GroupSummaryComponentStyle.red : GroupSummaryComponentStyle.green

    return (
        <View style={GroupSummaryComponentStyle.summaryCard}>
            <Text style={GroupSummaryComponentStyle.summaryLabel}>Total Gasto do Grupo</Text>
            <Text style={GroupSummaryComponentStyle.summaryValue}>{formatedBalance}</Text>
            <Text style={[GroupSummaryComponentStyle.summarySubtitle, balanceColor]}> Seu saldo: {formatedCurrentUserTotalSpent}</Text>
        </View>
    );
}