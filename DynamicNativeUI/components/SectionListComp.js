import { FlatList, Image, SectionList, StyleSheet, Text, View } from "react-native";


export default function SectionListComp(){

    const fruitsGroup = [
        {
            title: "Pome",
            data: [
              {
                id: 1,
                name: "Apple",
                type: "pome",
                color: "red"
              },
              {
                id: 9,
                name: "Pear",
                type: "pome",
                color: "green"
              }
            ]
          },
          {
            title: "Berry",
            data: [
              {
                id: 2,
                name: "Banana",
                type: "berry",
                color: "yellow"
              },
              {
                id: 4,
                name: "Grapes",
                type: "berry",
                color: "purple"
              },
              {
                id: 5,
                name: "Strawberry",
                type: "berry",
                color: "red"
              },
              {
                id: 8,
                name: "Kiwi",
                type: "berry",
                color: "green"
              }
            ]
          },
          {
            title: "Citrus",
            data: [
              {
                id: 3,
                name: "Orange",
                type: "citrus",
                color: "orange"
              }
            ]
          },
          {
            title: "Tropical",
            data: [
              {
                id: 6,
                name: "Pineapple",
                type: "tropical",
                color: "yellow"
              },
              {
                id: 7,
                name: "Mango",
                type: "tropical",
                color: "orange"
              }
            ]
        }
    ]

    const FruitItems = ({ item }) => {
        return(
        <View style={styles.movieCard}>
            <Text style={styles.movieLabel}>
                Name: 
                <Text style={styles.movieVal}>{item.name}</Text>
            </Text>
            <Text style={styles.movieLabel}>
                Type: 
                <Text style={styles.movieVal}>{item.type}</Text>
            </Text>
        </View>
    )
}

    return(
        <View style={styles.movieContainer}>
            <SectionList 
                sections={fruitsGroup} 
                renderItem={FruitItems} 
                ItemSeparatorComponent={() => <View style={{height: 15}}></View>}
                SectionSeparatorComponent={() => <View style={{height: 15}}></View>}
                renderSectionHeader={({section}) => (
                    <Text style={styles.movieTitle}>Title: {section.title}</Text>
                )} />
        </View>
    )
}

const styles = StyleSheet.create({
    movieContainer:{
        width: '100%',
        backgroundColor: '#fff'
    },
    listItems:{
        padding: 10
    },
    movieCard:{
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 15,
        // marginBottom: 15,
        shadowOffset:{ width: 0, height: 4 },
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 6
    },
    movieImage:{
        width: '100%',
        height: 200,
        borderRadius: 8,
        marginBottom: 10
    },
    movieTitle:{
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 6
    },
    movieLabel:{
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 6
    },
    movieVal:{
        fontSize: 14,
        color: '#333',
        marginBottom: 10
    }
})