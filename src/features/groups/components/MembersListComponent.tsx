import { Text } from 'react-native';

import { FlatList, View } from "react-native";
import { MemberEntity } from "../models/MemberEntity";
import { MembersListComponentStyle } from "./styles/GroupDetailsScreenStyle";


interface MembersListProps {
    members: MemberEntity[]
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
                        item.balance >= 0 ? MembersListComponentStyle.positiveBalance : MembersListComponentStyle.negativeBalance
                    ]}>
                        {item.balance >= 0 ? `+R$ ${item.balance.toFixed(2)}` : `R$ ${item.balance.toFixed(2)}`}
                    </Text>
                </View>
            )}
        />
    )
}