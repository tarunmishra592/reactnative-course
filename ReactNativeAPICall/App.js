import { useEffect, useState } from 'react';
import { ActivityIndicator, Button, FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {

  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [refresh, setRefresh] = useState(false)

  const [postData, setPostData] = useState({title: '', body: ''})
  const [createPost, setCreatingPost] = useState(false)

  const [error, setError] = useState(null)

  useEffect(() => {
    getAllPosts()
  }, [])

  const getAllPosts = async(limit=10) => {
    try{
      const res = await fetch(`https://teststjsonplaceholder.typicode.com/posts?_limit=${limit}`)
      const allPosts = await res.json()
      setPosts(allPosts)
      setLoading(false)
    }catch(err){
      setLoading(false)
      console.log('Error', err)
      setError('Post not available')
    }
  }

  const refreshHandler = () => {
    setRefresh(true)
    getAllPosts(30)
    setRefresh(false)
  }

  const inputHandler = (fieldName, val) => {
    setPostData((prevState) => ({
      ...prevState,
      [fieldName]: val
    }))
  }

  const createPostHandler = async() => {
    setCreatingPost(true)
    const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'post',
      headers:{
        "Content-Type": 'application/json'
      },
      body:JSON.stringify({
        title: postData.title,
        body: postData.body
      })
    })
    const newPost = await res.json()

    setPosts([newPost, ...posts])
    setPostData({title: '', body: ''})
    setCreatingPost(false)
  }

  if(loading){
    return(
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size={"large"} color={'blue'} />
        <Text>Loading...</Text>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.createPostContainer}>
        <Text style={styles.postHeading}>Create Post</Text>

        <Text style={styles.postLabel}>Title</Text>
        <TextInput 
          value={postData.title}
          onChangeText={(value) => inputHandler('title', value)} 
          style={styles.postInput}/>

        <Text style={styles.postLabel}>Body</Text>
        <TextInput 
          value={postData.body}
          onChangeText={(value) => inputHandler('body', value)} 
          style={styles.postInput}/>

        <Button title={`${createPost ? 'Creating...' : 'Create'}`} onPress={createPostHandler} />
      </View>

      {
        error ? <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
       :
      <>
      <FlatList 
        data={posts} 
        ListEmptyComponent={<Text>No Record</Text>} 
        ItemSeparatorComponent={<View style={{height: 15}}></View>}
        refreshing={refresh}
        onRefresh={refreshHandler}
        renderItem={({item}) => (
        <View style={styles.userCard}>
          <Text>{item.title}</Text>
          <Text>{item.body}</Text>
        </View>
      )} />
      </>
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: StatusBar.currentHeight,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  createPostContainer:{
    width: '100%',
    padding: 10,
    marginBottom: 20,
    shadowColor: '#000',
    backgroundColor: '#fff',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 9
  },
  postHeading:{
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  postLabel:{
    fontSize: 14,
    fontWeight: 600
  },
  postInput:{
    borderWidth: 1,
    borderColor: '#000',
    padding: 8,
    marginBottom: 14
  },
  loadingContainer:{
    padding: 10,
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userCard:{
    borderRadius: 10,
    width: '100%',
    padding: 10,
    // marginBottom: 10,
    shadowColor: '#000',
    backgroundColor: '#fff',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8
  },
  errorContainer:{
    width: '100%',
    backgroundColor: 'red',
    padding: 8,
    alignItems: 'left',
    
  },
  errorText:{
    fontSize: 14,
    color: '#fff'
  }
});
