import { StyleSheet, Text, View } from 'react-native';
import Welcome from './components/welcome';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.mainText}>React Native</Text>
      <View style={styles.mainBox}>
        <Text style={[styles.mainText, styles.textWhite]}>Multiple</Text>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  mainText:{
    color: 'red'
  },
  textWhite:{
    color:'#fff'
  },
  mainBox:{
    width: 100,
    height: 100,
    backgroundColor: 'red',
    shadowColor: '#ccc',
    shadowOffset: {
      width: 7,
      height: 7
    },
    shadowOpacity: 0.8,
    shadowRadius: 5
  }
})