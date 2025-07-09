import { useCounter } from "@/hooks/CounterContext";
import { Button, StyleSheet, Text, View } from "react-native";


export default function HomeComp(){

    const { count, setCount } = useCounter()

    return(
        <View style={styles.container}>
            <Text style={styles.text}>Count: {count}</Text>
            <Button title="Increment" onPress={() => setCount(count + 1)} />
            <View style={{ height: 10 }} />
            <Button title="Reset" onPress={() => setCount(0)} color="red" />
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