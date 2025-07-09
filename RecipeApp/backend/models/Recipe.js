

const mongoose = require('mongoose')

const recipeSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    ingredients:[String],
    instructions: String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    image: String
})


module.exports = mongoose.model('Recipe', recipeSchema)