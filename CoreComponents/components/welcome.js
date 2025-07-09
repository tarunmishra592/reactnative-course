import { View, Text } from 'react-native'

export default function Welcome({name, age}){
    return(
        <View>
            <Text>Name: {name}</Text>
            <Text>Age: {age}</Text>
        </View>
    )
}