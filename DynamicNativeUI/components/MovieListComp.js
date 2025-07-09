import { FlatList, Image, StyleSheet, Text, View } from "react-native";


export default function MovieListComp(){

    const movies = [
        {
            id: '1',
            title: '3 Idiots',
            image: 'https://upload.wikimedia.org/wikipedia/en/d/df/3_idiots_poster.jpg',
            actors: ['Aamir Khan', 'R. Madhavan', 'Sharman Joshi'],
            category: 'Drama / Comedy',
            type: 'comedy',
            year: 2009,
          },
          {
            id: '2',
            title: 'Dangal',
            image: 'https://upload.wikimedia.org/wikipedia/en/9/99/Dangal_Poster.jpg',
            actors: ['Aamir Khan', 'Fatima Sana Shaikh'],
            category: 'Biography / Sports',
            type: 'drama',
            year: 2016,
          },
          {
            id: '3',
            title: 'Gully Boy',
            image: 'https://upload.wikimedia.org/wikipedia/en/4/45/Gully_Boy_poster.jpg',
            actors: ['Ranveer Singh', 'Alia Bhatt'],
            category: 'Musical / Drama',
            type: 'drama',
            year: 2019,
          },
          {
            id: '4',
            title: 'Pathaan',
            image: 'https://upload.wikimedia.org/wikipedia/en/c/c3/Pathaan_film_poster.jpg',
            actors: ['Shah Rukh Khan', 'Deepika Padukone'],
            category: 'Action / Thriller',
            type: 'action',
            year: 2023,
          },
    ]

    const MovieItems = ({ movie }) => {
        return(
        <View style={styles.movieCard}>
            <Image style={styles.movieImage} source={{uri: movie.image}} />
            <Text style={styles.movieTitle}>{movie.title}</Text>
            <Text style={styles.movieLabel}>
                Category: 
                <Text style={styles.movieVal}>{movie.category}</Text>
            </Text>
            <Text style={styles.movieLabel}>
                Release Year: 
                <Text style={styles.movieVal}>{movie.year}</Text>
            </Text>
            <Text style={styles.movieLabel}>Actor: </Text>
            {
                movie.actors.map((actor, index) => (
                    <Text style={styles.movieVal} key={index}>{actor}</Text>
                ))
            }
        </View>
    )
}

    return(
        <View style={styles.movieContainer}>
            <FlatList 
                contentContainerStyle={styles.listItems} 
                data={movies} keyExtractor={(item) => item.id} 
                renderItem={({item}) => <MovieItems movie={item} />} />
        </View>
    )
}

const styles = StyleSheet.create({
    movieContainer:{
        width: '100%',
        backgroundColor: '#ccc'
    },
    listItems:{
        padding: 10
    },
    movieCard:{
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 15,
        marginBottom: 15,
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