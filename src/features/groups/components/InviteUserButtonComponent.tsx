import { Text } from 'react-native';

import { TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { InviteUserButtonComponentStyle } from "./styles/GroupDetailsScreenStyle";

export default function InviteUserButtonComponent() {
    const insets = useSafeAreaInsets();

    return (
        <View style={[InviteUserButtonComponentStyle.actionFooter, { paddingBottom: insets.bottom + 16 }]}>
            <TouchableOpacity style={InviteUserButtonComponentStyle.inviteButton} onPress={() => console.log('Acionar Compartilhamento')}>
                <Text style={InviteUserButtonComponentStyle.inviteButtonText}>Convidar Amigo</Text>
            </TouchableOpacity>
        </View>
    )
}