import { useAuth } from "@/context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function TopBar({title}:{title: string}){

    const {user} = useAuth()
    const router = useRouter()

    return(
        <View className="flex-row justify-between items-center px-4 py-3">
                <Text className="font-bold text-2xl text-gray-600">{title}</Text>
                <View className="flex-row items-center gap-2">
                    {user?.first_name && <Text className="text-blue-600 font-medium text-base">{user.first_name}</Text>}
                    <Pressable onPress={() => router.navigate('/create-recipe')}>
                    <Ionicons name="add-circle" color={'#007AFF'} size={20} />
                    </Pressable>
                </View>
        </View>
    )
}