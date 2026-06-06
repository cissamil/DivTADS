import { Text } from 'react-native';
import { FlatList, View } from "react-native";
import { MembersListComponentStyle } from "./styles/GroupDetailsScreenStyle";
import { MemberComposition } from '../../home/models/MemberComposition';

interface MembersListProps {
    members: MemberComposition[]
}

export default function MembersListComponent({ members }: MembersListProps) {
    return (
        <FlatList
            data={members}
            keyExtractor={(item) => item.memberId}
            renderItem={({ item }) => (
                <View style={MembersListComponentStyle.cardItem}>
                    <Text style={MembersListComponentStyle.itemTitle}>{item.memberName}</Text>
                    <Text style={[
                        MembersListComponentStyle.memberBalance,
                        item.total_spent >= 0 ? MembersListComponentStyle.positiveBalance : MembersListComponentStyle.negativeBalance
                    ]}>
                        {item.total_spent >= 0 ? `+R$ ${item.total_spent.toFixed(2)}` : `R$ ${item.total_spent.toFixed(2)}`}
                    </Text>
                </View>
            )}
        />
    )
}