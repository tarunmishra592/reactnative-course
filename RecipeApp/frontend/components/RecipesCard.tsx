import { Image, ScrollView, Text, View } from "react-native";
import RateRecipe from "./RateRecipy";

type RecipeCardProp = {
    _id: string
    title: string,
    imageURI: string,
    ingredients: string[],
    instructions: string,
    averageRating: number
}

export default function RecipesCard({title, imageURI, ingredients, instructions, _id, averageRating}:RecipeCardProp){
    console.log(_id, averageRating)
    return(
            <View className="bg-white rounded-2xl shadow-lg overflow-hidden mb-2 p-2">
                <Image source={{ uri:imageURI  }} className="h-52 w-full object-cover rounded-xl"  />
                <View>
                    <View className="flex flex-row justify-between">
                        <Text className="text-xl font-bold text-gray-800 mb-2 mt-2">{title}</Text>
                        <RateRecipe recipeId={_id} initialRating={averageRating} />
                    </View>
                    {ingredients.map((ing: string) => (
                        <Text className="text-sm text-gray-500 ml-3" key={ing}>{ing}</Text>
                    ))}
                    <Text className="font-semibold text-gray-600 mt-4">Instructions: </Text>
                    <Text className="text-sm text-gray-600">{instructions}</Text>
                </View>
            </View>
    )
}