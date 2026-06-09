import { Text } from 'react-native';

import { router } from "expo-router";
import { TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { GroupHeaderComponentStyle } from "./styles/GroupDetailsScreenStyle";

interface GroupHeaderProps {
    groupName: string;
    onLeave?: () => void;
    isGroupCreator: boolean;
}

export default function GroupHeaderComponent({ groupName, onLeave, isGroupCreator }: GroupHeaderProps) {
    const insets = useSafeAreaInsets();

    return (
        <View style={[GroupHeaderComponentStyle.header, { paddingTop: insets.top + 10 }]}>
            <TouchableOpacity onPress={() => router.back()} style={GroupHeaderComponentStyle.backButton}>
                <Text style={GroupHeaderComponentStyle.backButtonText}>← Voltar</Text>
            </TouchableOpacity>
            <Text style={GroupHeaderComponentStyle.headerTitle}>{groupName}</Text>
            <View style={{ width: 60 }} />
            {onLeave ? (
                <TouchableOpacity onPress={onLeave} style={{ width: 60, alignItems: 'flex-end' }}>
                    <Text style={{ color: '#ef4444', fontWeight: 'bold' }}>{isGroupCreator ? 'Deletar' : 'Sair'}</Text>
                </TouchableOpacity>
            ) : (
                <View style={{ width: 60 }} />
            )}
        </View>
    );
}