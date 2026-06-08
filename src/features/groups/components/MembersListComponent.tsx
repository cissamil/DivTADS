import { NumberFormatter } from '@/src/utils/NumberFormatter';
import { FlatList, Text, View } from 'react-native';
import { MemberComposition } from '../../home/models/MemberComposition';
import { MembersListComponentStyle } from "./styles/GroupDetailsScreenStyle";

interface MembersListProps {
    members: MemberComposition[],
    creatorId: string,
    currentMemberId:string
}

export default function MembersListComponent({ members, creatorId, currentMemberId}: MembersListProps) {

    const formatedValue = (value:number) =>{
        return NumberFormatter.formatToMoney(value);
    }


    const groupRoleLabel = (member: MemberComposition) =>{

        const label = "";

        const isCreatorId =  member.userId === creatorId;
        const isCurrentMember = member.memberId === currentMemberId;

        const creatorLabel = "Dono do grupo";
        const memberLabel = "Membro";
        const currentMemberLabel = " (Você)"; 

        if(isCreatorId && isCurrentMember){
            return creatorLabel + currentMemberLabel;
        }

        if(isCreatorId && !isCurrentMember){
            return creatorLabel;
        }

        if(!isCreatorId && isCurrentMember){
            return memberLabel + currentMemberLabel;
        }

        if(!isCreatorId && !isCurrentMember){
            return memberLabel;
        }
    }

    return (
        <FlatList
            data={members}
            keyExtractor={(item) => item.memberId}
            renderItem={({ item }) => (
                <View style={MembersListComponentStyle.cartInfo}>

                    <View style={MembersListComponentStyle.memberInfo}>
                        <Text style={MembersListComponentStyle.itemTitle}>{item.memberName}</Text>
                        <Text style={[
                            MembersListComponentStyle.memberBalance,
                            item.total_spent >= 0 ? MembersListComponentStyle.positiveBalance : MembersListComponentStyle.negativeBalance
                        ]}>
                            {item.total_spent >= 0 ? formatedValue(item.total_spent) : `R$ ${item.total_spent.toFixed(2)}`}
                        </Text>
                    </View>

                    <View style={MembersListComponentStyle.groupCreator}>
                        <Text style={{color: 'white'}}>{groupRoleLabel(item)}</Text>
                    </View>

                </View>
            )}
        />
    )
}