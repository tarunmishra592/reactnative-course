import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';

export default function SafeAreaViewComp() {

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <View style={styles.box}>
          <Text style={styles.text}>Open up App.js to start working on your app!</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer:{
    flex: 1,
    backgroundColor: 'pink',
    marginTop: StatusBar.currentHeight
  },
  container: {
    flex: 1,
    backgroundColor: 'pink',
  },
  box:{
    padding: 20
  },
  text:{
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});
