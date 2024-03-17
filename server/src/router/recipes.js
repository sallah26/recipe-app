import express from "express";
import { RecipeModel } from "../model/Recipes.js";

const router = express.Router();

// Route for getting all available Recipes
router.get("/", async (req, res) => {
    try {
        const recipeList = await RecipeModel.find({});
        if (!recipeList || recipeList.length === 0) return res.status(401).send("No Recopies found");
        return res.status(200).json(recipeList);
    } catch (err) {
        console.error(err);
        return res.status(500).send(`Error: ${err}`);
    }
    
});

// Route for getting one Recipe
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const recipe = await RecipeModel.findById(id);
        return res.status(200).json(recipe);
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
});

// Route for creating Recipe
router.post("/", async (req, res) => {
    const { name, ingredients, instructions, imgUrl, cookingTime, userOwner } = req.body;

    try {
       
        const newRecipe = new RecipeModel({
            name: name,
            ingredients: ingredients,
            instructions: instructions,
            imgUrl: imgUrl || "",
            cookingTime: parseInt(cookingTime),
            userOwner: userOwner
        });

        await newRecipe.save();

        res.status(201).send("New Recipe registered successfully");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

// Route for updating one Recipe
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const result = await RecipeModel.findByIdAndUpdate(id, { $set: req.body });
        res.status(200).json({ message: 'Recipe updated successfully', updatedRecipe: result });
    } catch (error) {
        console.error('Error updating recipe:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
    
});

// Route for deleting the Recipe
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await RecipeModel.findByIdAndDelete(id);
        return res.status(200).send('Recipe deleted successfully');
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

export { router as recipeRouter };
