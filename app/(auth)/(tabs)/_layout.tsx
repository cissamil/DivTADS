import { Text } from "@react-navigation/elements";
import { Tabs } from "expo-router";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AuthLayout() {
    return (

        <SafeAreaView style={{ flex: 1 }}>
            <Tabs
                screenOptions={{
                    headerShown: false,
                    tabBarStyle: styles.tabBarStyle,
                    tabBarActiveTintColor: '#6366f1',
                    tabBarInactiveTintColor: '#999'
                }}
            >

                <Tabs.Screen
                    name="HomeScreen"
                    options={{
                        title: 'grupos',
                        tabBarIcon: () => <Text style={styles.navIcon}>📊</Text>
                    }}
                />

                <Tabs.Screen
                    name="ExtractScreen"
                    options={{
                        title: 'extrato',
                        tabBarIcon: () => <Text style={styles.navIcon}>📋</Text>
                    }}
                />

                <Tabs.Screen
                    name="ProfileScreen"
                    options={{
                        title: 'perfil',
                        tabBarIcon: () => <Text style={styles.navIcon}>👤</Text>
                    }}
                />

            </Tabs>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    navIcon: {
        fontSize: 20,
        marginBottom: 4,
    },

    tabBarStyle: {
        backgroundColor: '#1a1a1a',
        borderTopColor: '#333',
        borderTopWidth: 1,
        height: 60,
        paddingBottom: 8,
    },

});