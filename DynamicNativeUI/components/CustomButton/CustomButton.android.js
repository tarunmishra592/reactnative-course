import { Pressable, Text } from "react-native";

const CustomButton = ({btnText, pressHandler}) => {
    return(
        <Pressable onPress={pressHandler} style={{
            backgroundColor: 'green',
            color: '#fff',
            alignItems: 'center',
            padding: 10,
            borderRadius: 5,
        }} >
            <Text>{btnText}</Text>
        </Pressable>
    )
}

export default CustomButton