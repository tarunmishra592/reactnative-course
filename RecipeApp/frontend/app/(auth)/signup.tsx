import { useRouter } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, Pressable, Text, TextInput, View } from "react-native";
import Toast from 'react-native-toast-message';

export default function SignupPage(){

    const [signUpData, setSignUpData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [loading, setLoading] = useState(false)

    const router = useRouter()


    const InputHandler = (fieldName: string, value: string) => {
        setSignUpData((prevState) => ({
            ...prevState,
            [fieldName]: value
        }))
    }

    const handleSignup = async() => {
        const { first_name, last_name, email, password } = signUpData;
        const res = await fetch('http://localhost:5001/api/auth/signup', {
            method: 'post',
            body: JSON.stringify({
                first_name, last_name, email, password
            }),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        if(res){
            const resData = await res.json()
            Toast.show({
                type: 'success',
                text1: 'Success',
                text2: 'Please login to continue'
            });
            router.push('/')
        }
    }

    return(
        <KeyboardAvoidingView className="flex-1">
            <View className="flex-1 justify-center px-6 bg-white">
                <Text className="font-bold text-3xl text-center mb-6">SignUp</Text>

                <TextInput 
                    placeholder="Please enter first name"
                    value={signUpData.first_name}
                    onChangeText={(text) => InputHandler('first_name', text)}
                    className="border border-gray-500 rounded px-4 py-4 mb-4" />

                <TextInput 
                    placeholder="Please enter last name"
                    value={signUpData.last_name}
                    onChangeText={(text) => InputHandler('last_name', text)}
                    className="border border-gray-500 rounded px-4 py-4 mb-4" />

                <TextInput 
                    placeholder="Please enter email"
                    keyboardType="email-address"
                    value={signUpData.email}
                    onChangeText={(text) => InputHandler('email', text)}
                    className="border border-gray-500 rounded px-4 py-4 mb-4" />

                <TextInput 
                    placeholder="Please enter password"
                    secureTextEntry
                    value={signUpData.password}
                    onChangeText={(text) => InputHandler('password', text)}
                    className="border border-gray-500 rounded px-4 py-4 mb-4" />

                
                <TextInput 
                    placeholder="Confirm your password"
                    secureTextEntry
                    value={signUpData.confirmPassword}
                    onChangeText={(text) => InputHandler('confirmPassword', text)}
                    className="border border-gray-500 rounded px-4 py-4 mb-4" />        
                
                <Pressable onPress={() => handleSignup()}>
                    <Text className="bg-blue-700 py-3 rounded mb-4 text-center text-white font-semibold">
                        {loading ? 'Submitting...' : 'Submit'}
                    </Text>
                </Pressable>

                <View className="flex-row justify-center">
                    <Text className="text-gray-700">Don't have account?</Text>
                    <Pressable onPress={() => router.push('/login')}>
                        <Text className="text-blue-600 font-semibold"> Login</Text>
                    </Pressable>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}