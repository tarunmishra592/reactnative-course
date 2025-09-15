import RecipesCard from "@/components/RecipesCard";
import TopBar from "@/components/TopBar";
import { GetMyRecipeCall } from "@/services/recipe.service";
import { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StatusBar, Text, View } from "react-native";

type RecipeCardProp = {
    _id: string,
    title: string,
    image: string,
    ingredients: string[],
    instructions: string
}

export default function MyRecipes(){

    const [recipes, setRecipes] = useState([])

    useEffect(() => {
        getMyRecipes()
    }, [])


    const getMyRecipes = async() => {
        const res: any = await GetMyRecipeCall()
        setRecipes(res.data)
    }

    return(
        <SafeAreaView style={{flex: 1}}>
        <View style={{ marginTop: StatusBar.currentHeight }}>
                <TopBar title="My Recipe" />
                <ScrollView>
                {
                    recipes?.map((recipe: RecipeCardProp) => <View className="m-2" key={recipe._id}>
                        <RecipesCard 
                        title={recipe.title} 
                        imageURI={recipe.image} 
                        ingredients={recipe.ingredients} instructions={recipe.instructions} />
                    </View>)
                }
                </ScrollView>
        </View>
        </SafeAreaView>
    )
}