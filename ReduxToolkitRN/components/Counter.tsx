import { decrement, increment } from "@/store/counterSlice";
import { RootState, AppDispatch } from "@/store/store";
import { Button, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";


export default function Counter(){

    const count = useSelector((state:RootState) => state.counter.value)
    const dispatch = useDispatch<AppDispatch>();

    return(
        <View style={styles.container}>
            <Text style={styles.text}>Count: {count}</Text>
            <Button title="Increment" onPress={() => dispatch(increment())} color={'red'} />
            <Button title="Decrement" onPress={() => dispatch(decrement())}  color={'green'} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
    },
    text: {
      fontSize: 24,
      marginBottom: 20,
    },
  });