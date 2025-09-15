import { Tabs } from "expo-router";
import { Ionicons } from '@expo/vector-icons'


export default function TabsLayout(){
    return(
        <Tabs screenOptions={{headerShown: false}}>
            <Tabs.Screen 
                name="top-recipes" 
                options={{
                    title: 'Top Recipes',
                    headerShown: false,
                    tabBarIcon: ({color, size}) => (
                        <Ionicons name="star" color={color} size={size} />
                    )
                }} />

            <Tabs.Screen 
                name="my-recipes" 
                options={{
                    title: 'My Recipes',
                    headerShown: false,
                    tabBarIcon: ({color, size}) => (
                        <Ionicons name="book" color={color} size={size} />
                    )
                }} />
            
            <Tabs.Screen 
                name="user-settings" 
                options={{
                    title: 'Setting',
                    headerShown: false,
                    tabBarIcon: ({color, size}) => (
                        <Ionicons name="settings" color={color} size={size} />
                    )
                }} />
        </Tabs>
    )

}