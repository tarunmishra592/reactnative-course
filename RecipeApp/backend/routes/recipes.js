

const express = require('express');
const mongoose = require('mongoose')
const router = express.Router();
const Recipe = require('../models/Recipe');
const { RecipeSchemaValidation } = require('../validations/RecipeValidation');
const authentication = require('../middleware/authenticateUser');
const Rating = require('../models/Rating');



router.get('/', async (req, res) => {
    try {
      const recipes = await Recipe.find();
      res.json(recipes);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
});

router.get('/my', authentication, async (req, res) => {
  try{
    const recipe = await Recipe.find({createdBy: req.userId})
    res.json(recipe)
  }catch(err){
    res.status(500).json({ message: err.message });
  }
})


router.post('/create', authentication, async(req, res) => {
  try{

    const payload = {
      title: req.body.title,
      ingredients: req.body.ingredients,
      instructions: req.body.instructions,
      image: req.body.imageUrl
    }

    const result = RecipeSchemaValidation.safeParse(payload)

    if(!result.success){
        return res.status(400).json({error: result.error.issues.map(x => x.message).join(', ')})
    }

    const recipe = new Recipe({
      title: req.body.title,
      ingredients: req.body.ingredients,
      createdBy: req.userId,
      instructions: req.body.instructions,
      image: req.body.imageUrl
    })
    const newRecipe = await recipe.save()
    res.status(201).json(newRecipe)
  }catch(err){
    res.status(400).json({message: err.message})
  }
})


router.post('/:id/rate', authentication, async(req, res) => {

  const {rating} = req.body;
  const recipeId = req.params.id;
  const userId = req.userid
  if(!rating || rating < 1 || rating > 5){
    return res.status(400).json({message: 'Rating must be between 1 to 5'})
  }

  try{
    await Recipe.findById(recipeId)

    const updatedRating = await Rating.findOneAndUpdate(
      { recipe:recipeId, user: userId },
      {rating},
      { upsert: true, new: true, setDefaultsOnInsert: true }
    )

    res.json({message: 'Thanks for Rating', rating:updatedRating })

  }catch(err){
    res.status(500).json({message: 'Error while rating.'})
  }

})


router.get('/:id', authentication, async (req, res) => {
  try {
    const [recipe] = await Recipe.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(req.params.id) } },
      {
        $lookup: {
          from: 'ratings',
          localField: '_id',
          foreignField: 'recipe',
          as: 'ratings'
        }
      },
      {
        $addFields: {
          ratingCount: { $size: '$ratings' },
          averageRating: {
            $cond: [
              { $gt: [{ $size: '$ratings' }, 0] },
              { $round: [{ $avg: '$ratings.rating' }, 1] },
              null
            ]
          }
        }
      },
      {
        $project: {
          title: 1,
          ingredients: 1,
          instructions: 1,
          image: 1,
          createdBy: 1,
          ratingCount: 1,
          averageRating: 1
        }
      }
    ]);

    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found.' });
    }
    res.json(recipe);
  } catch (err) {
    console.error('Error fetching recipe:', err);
    res.status(500).json({ message: 'Server error fetching recipe.' });
  }
});


module.exports = router;



