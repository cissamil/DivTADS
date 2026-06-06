import { Text } from 'react-native';

import { View } from "react-native";
import { GroupSummaryComponentStyle } from "./styles/GroupDetailsScreenStyle";

interface GroupInformationProps{

    total_balance: number;
    currentUserTotalSpent:number;

}

export default function GroupSummaryComponent({total_balance, currentUserTotalSpent} : GroupInformationProps) {

    const isNegativeValue = currentUserTotalSpent < 0;
    const balanceColor = isNegativeValue ? GroupSummaryComponentStyle.red : GroupSummaryComponentStyle.green

    return (
        <View style={GroupSummaryComponentStyle.summaryCard}>
            <Text style={GroupSummaryComponentStyle.summaryLabel}>Total Gasto do Grupo</Text>
            <Text style={GroupSummaryComponentStyle.summaryValue}>R$ {total_balance}</Text>
            <Text style={[GroupSummaryComponentStyle.summarySubtitle, balanceColor]}> Seu saldo: R$ {currentUserTotalSpent}</Text>
        </View>
    );
}