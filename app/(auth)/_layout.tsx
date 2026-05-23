import { useAuth } from "@/src/contexts/AuthContext";
import { Stack, useRootNavigationState, useRouter, useSegments } from "expo-router";

export default function AuthAreaLayout() {

    const { user, isLoading } = useAuth();
    const segments = useSegments();
    const router = useRouter();
    const navigationState =  useRootNavigationState();

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