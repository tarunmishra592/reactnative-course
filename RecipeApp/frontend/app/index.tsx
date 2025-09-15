import RecipesCard from "@/components/RecipesCard";
import { useAuth } from "@/context/AuthContext";
import { Redirect, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, SafeAreaView, ScrollView, Text, View } from "react-native";
import Toast from 'react-native-toast-message';

type RecipeCardProp = {
  _id: string,
  title: string,
  image: string,
  ingredients: string[],
  instructions: string
}

export default function Index() {

  const [recipes, setRecipes] = useState([])
  const router = useRouter()

  const { user } = useAuth()


  useEffect(() => {
    getAllRecipes()
  }, [])

  const getAllRecipes = async() => {
    const res = await fetch('http://localhost:5001/api/recipes')
    const resData = await res.json()
    setRecipes(resData)
  }

  if(user){
    return <Redirect href={'/top-recipes'} />
  }

  return (
    <SafeAreaView style={{ flex: 1}}>
      <Toast />
      <View>
        <View className="flex-row justify-between items-center px-4 py-3">
          <Text className="font-bold text-2xl text-gray-600">Recipes</Text>
          <Pressable onPress={() => router.navigate("/login")}>
            <Text className="text-blue-600 font-medium text-base">Login</Text>
          </Pressable>
        </View>
        <ScrollView>
          {
            recipes.map((recipe: RecipeCardProp) => <View className="m-2" key={recipe._id}>
                <RecipesCard 
                  title={recipe.title} 
                  imageURI={recipe.image} 
                  ingredients={recipe.ingredients} instructions={recipe.instructions} />
              </View>)
          }
          
        </ScrollView>
        </View>
      </SafeAreaView>
  );
}
