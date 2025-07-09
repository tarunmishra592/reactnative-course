
const mongoose = require('mongoose')

const ratingSchema = new mongoose.Schema({
    recipe: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe', required: true },
    user:{type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    rating:{ type: Number, min: 1, max: 5, required: true }
}, { timestamps: true })

ratingSchema.index({user: 1, recipe: 1}, {unique: true})


module.exports = mongoose.model('Rating', ratingSchema)