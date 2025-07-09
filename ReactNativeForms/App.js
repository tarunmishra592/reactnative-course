import { SafeAreaView, StyleSheet } from 'react-native';
import LoginForm from './components/Login';

export default function App() {
  return (
    <SafeAreaView className="flex-1 bg-white items-center justify-center" style={styles.container}>
      <LoginForm/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
