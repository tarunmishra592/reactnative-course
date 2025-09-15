import RecipesCard from "@/components/RecipesCard";
import TopBar from "@/components/TopBar";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StatusBar, Text, View } from "react-native";

type RecipeCardProp = {
    _id: string,
    title: string,
    image: string,
    ingredients: string[],
    instructions: string,
    averageRating: number
  }
  

export default function TopRecipes(){

    const [recipes, setRecipes] = useState([])
    const { user } = useAuth()
    const router = useRouter()

    useEffect(() => {
        getAllRecipes()
      }, [])
    
    const getAllRecipes = async() => {
        const res = await fetch('http://localhost:5001/api/recipes')
        const resData = await res.json()
        setRecipes(resData)
    }

    return(
        <SafeAreaView style={{flex: 1}}>
        <View style={{ marginTop: StatusBar.currentHeight }}>
                <TopBar title="Top Recipe" />
                <ScrollView>
                {
                    recipes.map((recipe: RecipeCardProp) => <View className="m-2" key={recipe._id}>
                        <RecipesCard 
                        _id={recipe._id}
                        title={recipe.title} 
                        averageRating={recipe.averageRating}
                        imageURI={recipe.image} 
                        ingredients={recipe.ingredients} instructions={recipe.instructions} />
                    </View>)
                }
                </ScrollView>
        </View>
        </SafeAreaView>
    )
}