import { useState } from "react";
import { StyleSheet, Switch, Text, TextInput, View } from "react-native";

export default function MyInput(){

    const [text, setText] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)

    return(
        <View style={{width: '100%'}}>
            <Text>My Input test</Text>
            <TextInput 
                value={text} 
                autoCorrect={false}
                placeholder="Please enter Text"
                autoCapitalize="none"
                keyboardType="numeric"
                // secureTextEntry
                onChangeText={(text) => setText(text)} 
                style={styles.myInput}/>
            <Text>User Input: {text}</Text>

            <Text>Comment</Text>
            <TextInput 
                multiline
                style={styles.multiLineInput} 
                placeholder="Please enter your comment" />

            <Text>Is Admin</Text>
            <Switch 
                value={isAdmin} 
                trackColor={{false: '#ccc', true: '#000'}}
                thumbColor={'#f5f5f5'}
                onValueChange={() => setIsAdmin((prevState) => !prevState)} />
        </View>
    )
}

const styles = StyleSheet.create({
    myInput:{
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        height: 40,
        padding: 10,
        margin: 10,
        backgroundColor: '#fff'
    },
    multiLineInput:{
        width: '100%',
        height: 100,
        borderWidth: 1,
        borderColor: '#ccc',
        textAlignVertical: 'top'
    }
})