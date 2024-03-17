import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "../model/user.js";

import dotenv from 'dotenv';
// Load environment variables
dotenv.config();

const router = express.Router();

router.post("/register", async (req, res) => {
    const { regUsername, regPassword } = req.body;

    try {
        const existingUser = await UserModel.findOne({ username: regUsername });

        if (existingUser) {
            return res.status(409).send(`Username ${regUsername} already exists`);
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(regPassword, saltRounds);

        const newUser = new UserModel({
            username: regUsername,
            password: hashedPassword,
        });

        await newUser.save();

        res.status(201).send("User registered successfully");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        const existingUser = await UserModel.findOne({ username });

        if (!existingUser) {
            return res.status(409).send("Username is Not Found!");
        }

        const isPasswordValid = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordValid) {
            return res.status(403).send('Wrong Credentials');
        }

        const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET); // Use environment variable for secret key
        return res.status(201).send({
            token: token,
            userId: existingUser._id,
            message: "User Login successfully",
        });

    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

export { router as userRouter };
