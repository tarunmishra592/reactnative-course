import { StyleSheet, Text, View, Dimensions, useWindowDimensions } from 'react-native';

export default function windowDimension() {

  const boxHeight = useWindowDimensions().height
  const boxWidth = useWindowDimensions().width

  // const [windowDimension, setWindowDimensions] = useState({
  //   window: Dimensions.get('window')
  // })

  // useEffect(() => {
  //   const subscription = Dimensions.addEventListener('change', ({window}) => {
  //     setWindowDimensions({window})
  //   })

  //   return () => subscription?.remove()
  // })

  // const { window } = windowDimension;

  // const boxHeight = window.height;
  // const boxWidth = window.width;

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <View style={[styles.mainBox, {
        height: boxHeight > 600 ? '70%' : '90%',
        width: boxWidth > 600 ? '60%' : '90%'
      }]}>
        <Text style={{fontSize: boxWidth > 500 ? 50 : 20}}>Text View</Text>
      </View>
    </View>
  );
}


// const boxHeight = Dimensions.get('window').height
// const boxWidth = Dimensions.get('window').width

// console.log({boxHeight, boxWidth})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainBox:{
    // width: boxWidth > 500 ? '70%' : '90%',
    // height: boxHeight > 600 ? "60%" : '90%',
    backgroundColor: 'pink'
  },
  textSize:{
    // fontSize: boxWidth > 500 ? 50 : 18,
    textAlign: 'center'
  }
});
