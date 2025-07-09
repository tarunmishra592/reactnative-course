
const mongoose = require('mongoose')
const Recipe = require('../models/Recipe')
require('dotenv').config()


const recipeData = [
    {
        title: "Spaghetti Bolognese",
        ingredients: [
          "400g spaghetti",
          "2 tbsp olive oil",
          "1 onion, finely chopped",
          "2 garlic cloves, minced",
          "500g ground beef",
          "800g canned tomatoes",
          "2 tbsp tomato paste",
          "1 tsp dried oregano",
          "Salt and pepper to taste",
          "Fresh basil leaves for garnish"
        ],
        instructions: "Cook spaghetti according to package instructions. In a separate pan, heat olive oil and sauté onion and garlic until translucent. Add ground beef and cook until browned. Stir in canned tomatoes, tomato paste, oregano, salt, and pepper. Simmer for 20 minutes. Serve sauce over spaghetti and garnish with fresh basil leaves.",
        image: "https://images.unsplash.com/photo-1622973536968-3ead9e780960?q=80&w=500&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      },
      {
        title: "Indian Chicken Curry",
        ingredients: [
          "500g chicken thighs, cut into pieces",
          "2 tbsp vegetable oil",
          "1 onion, chopped",
          "2 garlic cloves, minced",
          "1 tbsp ginger, grated",
          "2 tbsp curry powder",
          "1 tsp ground cumin",
          "1 tsp paprika",
          "400ml coconut milk",
          "Salt to taste",
          "Fresh coriander for garnish"
        ],
        instructions: "Heat oil in a pan over medium heat. Add onion, garlic, and ginger; sauté until fragrant. Add curry powder, cumin, and paprika; cook for 1 minute. Add chicken pieces; cook until browned. Pour in coconut milk and add salt. Simmer for 20-25 minutes until chicken is cooked through. Garnish with fresh coriander and serve with rice.",
        image: "https://images.unsplash.com/photo-1707448829764-9474458021ed?q=80&w=500&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      },
      {
        title: "Vegetable Stir Fry",
        ingredients: [
          "1 tbsp vegetable oil",
          "2 cups broccoli florets",
          "1 cup sliced carrots",
          "1 bell pepper, sliced",
          "2 tbsp soy sauce",
          "2 garlic cloves, minced"
        ],
        instructions: "Heat oil in a wok or large skillet over high heat. Add garlic and sauté for 30 seconds. Add broccoli, carrots, and bell pepper; stir-fry for 5-7 minutes until vegetables are tender-crisp. Add soy sauce and stir to combine. Serve hot.",
        image: "https://images.unsplash.com/photo-1614955177711-2540ad25432b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8VmVnZXRhYmxlJTIwU3RpciUyMEZyeXxlbnwwfHwwfHx8MA%3D%3D"
      }
]

const connectDB = async() => {
    try{
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 60000, // 60 seconds
            connectTimeoutMS: 30000,
        })

        // await Recipe.deleteMany({})

        // await Recipe.insertMany(recipeData)
        console.log('DB Connected')
    }catch(err){
        console.log('Connection Failed', err)
        process.exit(1)
    }
}

module.exports = connectDB 
