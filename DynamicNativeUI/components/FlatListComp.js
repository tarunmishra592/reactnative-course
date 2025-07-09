import { FlatList, StyleSheet, Text, View } from 'react-native';

import users from './../data.json'

export default function FlatListComp() {
  return (
      <View style={styles.container}>
          <FlatList 
              data={users} 
              ListHeaderComponent={<Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 20}}>Movie List</Text>}
              ListFooterComponent={<Text style={{fontSize: 16, fontWeight: 'bold', marginBottom: 20}}>Footer</Text>}
              ListEmptyComponent={<Text>No Record</Text>} 
              initialNumToRender={5} 
              windowSize={5} 
              renderItem={({item}) => {
                return(
                  <View style={styles.itemStyle} key={item.id}>
                    <Text>Name : {item.name}</Text>
                    <Text>Age : {item.age}</Text>
                  </View>
                )
          }} />
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
  itemStyle:{
    padding: 10,
    borderWidth: 1,
    borderColor: '#000',
    marginBottom:15
  }
});
