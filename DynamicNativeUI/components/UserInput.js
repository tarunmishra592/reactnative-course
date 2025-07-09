import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

export default function UserInput() {

  const [text, setText] = useState('')

  return (
      <View>
          <TextInput style={styles.inputStyle} onChangeText={(text) => setText(text)} placeholder='Please enter name' />
          <Text>User Input: {text}</Text>
      </View>
  );
}

const styles = StyleSheet.create({
  inputStyle:{
    padding: 8,
    width: '90%',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor:'#ccc',
    color: '#ccc'
  }
});
