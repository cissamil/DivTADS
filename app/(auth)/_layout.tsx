import { Stack } from "expo-router";

export default function AuthAreaLayout() {

    return (
        <Stack
            screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: "#1a1a1a" }
            }}
        >

            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
                name="group/[id]"
                options={{
                    headerShown: true,
                    title: 'Detalhes do Grupo',
                    headerStyle: { backgroundColor: '#262626' },
                    headerTintColor: '#fff',
                    headerShadowVisible: false
                }}

            />


        </Stack>
    )
}