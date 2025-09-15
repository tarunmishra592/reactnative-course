import { useAuth } from "@/context/AuthContext";
import { useRouter } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, Pressable, Text, TextInput, View } from "react-native";

export default function LoginPage(){

    const [loginData, setLoginData] = useState({email: '', password: ''})
    const [errors, setErrors] = useState({})

    const { login } = useAuth()

    const router = useRouter()

    const handleInput = (fieldName: string, value: string) => {
        setLoginData((prevState) => ({
            ...prevState,
            [fieldName]: value
        }))
    }

    const handleLogin = async() => {
        const err:{email: string, password: string} = {}
        if(!loginData.email){
            err.email = 'Please enter email'
        }
        if(!loginData.password){
            err.password = 'Please enter password'
        }

        setErrors({errors: err})
        const res = await fetch('http://localhost:5001/api/auth/login', {
            method: 'post',
            headers:{
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({ email: loginData.email, password: loginData.password })
        })
        if(res){
            const userData:any = await res.json()
            login(userData.user, userData.token)

            router.push('/')
        }
    }

    return(
        <KeyboardAvoidingView className="flex-1">
            <View className="flex-1 justify-center px-6 bg-white">
                <Text className="font-bold text-3xl text-center mb-6">Login</Text>
                <TextInput 
                    value={loginData.email}
                    placeholder="Please enter email"
                    onChangeText={(text) => handleInput('email', text)}
                    keyboardType="email-address"
                    className="border border-gray-500 rounded px-4 py-4 mb-4" />
                    {errors.email && <Text className="text-red-500">{errors.email}</Text>}

                <TextInput 
                    placeholder="Please enter password"
                    value={loginData.password}
                    onChangeText={(text) => handleInput('password', text)}
                    secureTextEntry
                    className="border border-gray-500 rounded px-4 py-4 mb-4" />
                    {errors.password && <Text className="text-red-500">{errors.password}</Text>}
                

                <Pressable onPress={() => handleLogin()}>
                    <Text className="bg-blue-700 py-3 rounded mb-4 text-center text-white font-semibold">Login</Text>
                </Pressable>

                <View className="flex-row justify-center">
                    <Text className="text-gray-700">Don't have account?</Text>
                    <Pressable onPress={() => router.push('./signup')}>
                        <Text className="text-blue-600 font-semibold"> SignUp</Text>
                    </Pressable>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}