import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv/config";
import { userRouter } from "./router/users.js";
import {recipeRouter} from "./router/recipes.js";
const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;

const app = express();
app.use(cors());
app.use(express.json());
app.use("/auth", userRouter);
app.use("/recipe", recipeRouter);


mongoose.connect(DB_URL).then(()=>{
    console.log( "MongoDB Connected Successfully");
}).catch((err)=>console.error("error with ur db sallah " + err));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});

