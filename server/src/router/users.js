import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "../model/user.js";

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

        console.log("Registered hashedPassword = " + hashedPassword);

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
router.post("/login", async (req, res)=>{
    const {username, password} = req.body;
    
    try {
        const { username, password } = req.body;
        const existingUser = await UserModel.findOne({ username });
        if (!existingUser) {
            return res.status(409).send("Username is Not Found!");
        }
        
        const user = req.body.username;
        const pass = req.body.password;
        console.log(pass);
        const isPasswordValid = await bcrypt.compare(pass, existingUser.password) 
        console.log(isPasswordValid);
        if (user !== existingUser.username || !isPasswordValid){
            return res.status(403).send('Wrong Credentials')
        }
        // generate a token and set it to the
        const token = jwt.sign({id: existingUser._id}, "secret");
        return res.status(201).send({
            token: token,
            message: "User Login successfully",});

    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
})

export { router as userRouter };
