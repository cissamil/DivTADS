import { Text } from 'react-native';

import { View } from "react-native";
import { GroupSummaryComponentStyle } from "./styles/GroupDetailsScreenStyle";

export default function GroupSummaryComponent() {
    return (
        <View style={GroupSummaryComponentStyle.summaryCard}>
            <Text style={GroupSummaryComponentStyle.summaryLabel}>saldo total do grupo</Text>
            <Text style={GroupSummaryComponentStyle.summaryValue}>R$ 390,00</Text>
            <Text style={GroupSummaryComponentStyle.summarySubtitle}>Seu saldo: +R$ 45,00</Text>
        </View>
    );
}