import { GetRecipeRating, PostRecipeRating } from "@/services/recipe.service"
import { useEffect, useState } from "react"
import { Text, View } from "react-native"
import StarRating from 'react-native-star-rating-widget'


export default function RateRecipe({ recipeId, initialRating = 0 }:{
    recipeId: string,
    initialRating: number
}){

    const [rating, setRating] = useState(initialRating)
    const [count, setCount] = useState(0)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        loadRating()
    }, [recipeId])

    
    const loadRating = async() => {
        const {data} = await GetRecipeRating(recipeId)
        setRating(data.averageRating || 0)
        setCount(data.ratingCount || 0)
    }

    const ratingHandler = async(newRating: number) => {
        setLoading(true)
        try{
            await PostRecipeRating(recipeId, {rating: newRating})

            const { data } = await GetRecipeRating(recipeId) 

            setRating(data.averageRating || newRating)

            setCount(data.ratingCount || 1)

        }catch(err){
            console.log(err)
        }finally{
            setLoading(false)
        }
    }

    return(
        <View className="flex flex-row justify-between gap-2 mt-2">
            {loading && <Text>Loading...</Text>}
            <StarRating 
                starSize={20} 
                maxStars={5} 
                color="#fdd835"
                rating={rating} 
                onChange={ratingHandler} />
                <Text>
                { count > 0 && `${rating.toFixed(1)}/5` }
                </Text>
        </View>
    )
}