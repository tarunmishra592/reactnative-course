import { useState } from "react";
import { View, Text, TextInput, StyleSheet, Button, Image, KeyboardAvoidingView } from "react-native";


export default function LoginForm(){

    const [userEmail, setUserEmail] = useState('')
    const [password, setPassword] = useState('')

    const [error, setError] = useState({})


    const validateForm = () => {
        let errors = {};

        if(!userEmail) errors.userEmail = 'Please enter email'
        if(!password) errors.password = 'Please enter password';

        setError(errors)

        return Object.keys(errors).length == 0
    }

    const onSubmitPress = () => {
        if(validateForm()){
            setUserEmail('')
            setPassword('')
            setError({})
        }
    }


    return(
        <KeyboardAvoidingView behavior="padding" style={styles.loginContainer}>
            <View style={styles.loginForm}>
                <Image source={require('./../assets/login-user.png')} style={styles.loginImage} />
                <Text style={styles.heading}>Login</Text>
                
                <Text style={styles.label}>Email</Text>
                <TextInput value={userEmail} onChangeText={(text) => setUserEmail(text)} style={styles.input}/>
                {error.userEmail && <Text style={styles.error}>{error.userEmail}</Text>}


                <Text style={styles.label}>Password</Text>
                <TextInput value={password} onChangeText={(text) => setPassword(text)} style={styles.input}/>
                {error.password && <Text style={styles.error}>{error.password}</Text>}


                <Button style={styles.submitBtn} onPress={onSubmitPress} title="Submit" />
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    loginContainer:{
        width: '100%',
    },
    loginForm:{
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOpacity: 0.24,
        shadowOffset:{
            width: 0,
            height: 2
        },
        shadowRadius: 4,
        elevation: 6
    },
    loginImage:{
        width: '100%',
        height: 200
    },
    heading:{
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15
    },
    label:{
        fontSize: 16,
        fontWeight: 'bold'
    },
    input:{
        borderWidth: 1,
        padding: 8,
        borderColor: '#ccc',
        height: 40,
        marginBottom: 6
    },
    submitBtn:{
        width: '100%',
        height: 40,
    },
    loginImage:{
        width: '100%',
        height: 400
    },
    error:{
        color: 'red',
        fontSize: 14
    }
})