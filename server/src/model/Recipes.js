import mongoose from "mongoose";

// const  Schema = mongoose.Schema;
let RecipeSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    ingredients: [{
        type: String,
        required: true 
    }],
    instructions: [{
        type: String,
        required: true 
    }],
    imgUrl: {
        type: String,
        required: true 
    },
    cookingTime: {
        type: Number,
        required: true
    },
    userOwner: {
        type: mongoose.Types.ObjectId,
        ref: 'users', 
        required: true
    }
})

export const RecipeModel = mongoose.model("recipes", RecipeSchema);