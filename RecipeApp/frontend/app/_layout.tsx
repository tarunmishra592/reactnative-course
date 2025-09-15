import { Stack } from "expo-router";
import "../global.css"
import { AuthProvider, useAuth } from "@/context/AuthContext";

export default function RootLayout() {

  const { token } = useAuth() 

  return <AuthProvider>
      <Stack screenOptions={{headerShown: false}}>

        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)"/>


        <Stack.Protected guard={!!token}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="create-recipe" options={{ presentation: 'modal' }} />
        </Stack.Protected>
        
      </Stack>
  </AuthProvider>
}
