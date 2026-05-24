import { Text } from 'react-native';

import { TouchableOpacity, View } from "react-native";
import { MenuSelectorComponentStyle } from "./styles/GroupDetailsScreenStyle";

export interface MenuSelectorProps {
    activeTab: string;
    selectExpenses: () => void;
    selectMembers: () => void;
}

export default function MenuSelectorComponent({ activeTab, selectExpenses, selectMembers }: MenuSelectorProps) {
    return (
        <View style={MenuSelectorComponentStyle.toggleContainer}>
            <TouchableOpacity
                style={[MenuSelectorComponentStyle.toggleButton, activeTab === 'expenses' && MenuSelectorComponentStyle.toggleButtonActive]}
                onPress={() => selectExpenses()}
            >
                <Text style={[MenuSelectorComponentStyle.toggleText, activeTab === 'expenses' && MenuSelectorComponentStyle.toggleTextActive]}>
                    Despesas
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[MenuSelectorComponentStyle.toggleButton, activeTab === 'members' && MenuSelectorComponentStyle.toggleButtonActive]}
                onPress={() => selectMembers()}
            >
                <Text style={[MenuSelectorComponentStyle.toggleText, activeTab === 'members' && MenuSelectorComponentStyle.toggleTextActive]}>
                    Membros
                </Text>
            </TouchableOpacity>
        </View>
    );
}