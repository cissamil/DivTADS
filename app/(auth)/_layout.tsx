import { Text } from "@react-navigation/elements";
import { Tabs } from "expo-router";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AuthLayout() {
    return (

        <SafeAreaView style={{flex: 1}}>
            <Tabs
                screenOptions={{
                    headerShown: false,
                    tabBarStyle: {
                        backgroundColor: '#1a1a1a',
                        borderTopColor: '#333',
                        borderTopWidth: 1,
                        height: 60,
                        paddingBottom: 8,
                    },
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
                    name="extrato"
                    options={{
                        title: 'extrato',
                        tabBarIcon: () => <Text style={styles.navIcon}>📋</Text>
                    }}
                />

                <Tabs.Screen
                    name="perfil"
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

});