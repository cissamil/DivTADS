import { Tabs } from "expo-router";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSafeAreaInsets } from "react-native-safe-area-context";


export default function AuthLayout() {
    
    const insets = useSafeAreaInsets();
    
    return (

        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: [styles.tabBarStyle, { height: 60 + insets.bottom, padding: 8 + insets.bottom }],
                tabBarActiveTintColor: '#6366f1',
                tabBarInactiveTintColor: '#999'
            }}
        >

            <Tabs.Screen
                name="home"
                options={{
                    title: 'grupos',
                    tabBarIcon: () => <Text style={styles.navIcon}>📊</Text>
                }}
            />

            <Tabs.Screen
                name="extract"
                options={{
                    title: 'extrato',
                    tabBarIcon: () => <Text style={styles.navIcon}>📋</Text>
                }}
            />

            <Tabs.Screen
                name="profile"
                options={{
                    title: 'perfil',
                    tabBarIcon: () => <Text style={styles.navIcon}>👤</Text>
                }}
            />

        </Tabs>
    );
}


const styles = StyleSheet.create(
    {
    navIcon: {
        fontSize: 20,
        marginBottom: 4,
    },

    tabBarStyle: {
        backgroundColor: '#1a1a1a',
        borderTopColor: '#333',
        borderTopWidth: 1,
        height: 60,
    },

});