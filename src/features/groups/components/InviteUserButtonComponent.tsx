import { Alert, Share, Text } from 'react-native';
import * as Linking from 'expo-linking';
import { TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { InviteUserButtonComponentStyle } from "./styles/GroupDetailsScreenStyle";


interface InviteUserProps {
    groupId: string;
    groupName: string;
}


export default function InviteUserButtonComponent({ groupId, groupName }: InviteUserProps) {
    const insets = useSafeAreaInsets();

    const handleShare = async () => {
        try {
            const inviteUrl = Linking.createURL('/group/join', {
                queryParams: { id: groupId }
            });

            const message = `Ei! Junte-se ao meu grupo de despesas "${groupName}" no DivTADS.
                \n\nClique no link para entrar:\n\n ${inviteUrl}`;

            const result = await Share.share({
                message: message,
                title: `Convite para o grupo ${groupName}`
            });

            if (result.action === Share.sharedAction) {
                console.log("Compartilhamento com sucesso!");
            }
        } catch (error: any) {
            Alert.alert("Erro ao compartilhar: ", error.message);
        }
    }

    return (
        <View style={[InviteUserButtonComponentStyle.actionFooter, { paddingBottom: insets.bottom + 16 }]}>
            <TouchableOpacity 
                style={InviteUserButtonComponentStyle.inviteButton} 
                onPress={handleShare}
            >
                <Text style={InviteUserButtonComponentStyle.inviteButtonText}>Convidar Amigo</Text>
            </TouchableOpacity>
        </View>
    )
}