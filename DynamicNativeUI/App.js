import { StyleSheet, Text, View } from 'react-native';


export default function App() {
  return (
      <View style={styles.container}>
          <Text>React Native</Text>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  },
});