import { Text } from 'react-native';

import { router } from "expo-router";
import { TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { GroupHeaderComponentStyle } from "./styles/GroupDetailsScreenStyle";

interface GroupHeaderProps {
    groupName: string;
}

export default function GroupHeaderComponent({ groupName }: GroupHeaderProps) {
    const insets = useSafeAreaInsets();

    return (
        <View style={[GroupHeaderComponentStyle.header, { paddingTop: insets.top + 10 }]}>
            <TouchableOpacity onPress={() => router.back()} style={GroupHeaderComponentStyle.backButton}>
                <Text style={GroupHeaderComponentStyle.backButtonText}>← Voltar</Text>
            </TouchableOpacity>
            <Text style={GroupHeaderComponentStyle.headerTitle}>{groupName}</Text>
            <View style={{ width: 60 }} />
            {/* Espaçador para centralizar o título */}
        </View>
    );
}