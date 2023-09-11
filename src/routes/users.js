import express from 'express';
import jwt from 'jsonwebtoken';
import { UserModel } from "../models/Users.js";
import bcrypt from 'bcrypt'; 
const userRouter = express.Router();

userRouter.post("/register", async(req, res)=>{
    const {username, password} = req.body;
    const user = await UserModel.findOne({username});
    
    if(user){
        return res.json({message:"User already exists!"});
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({username, password:hashedPassword, isAdmin:false});
    await newUser.save();

    res.json({message:"Created new user"})
})

userRouter.post("/login", async (req, res)=>{
    const {username, password} = req.body;
    const user = await UserModel.findOne({username});

    if(!user){
        return res.json({message:"User does not exist!"});
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid){
        return res.json({message:"Username or Password Is Incorrect!"});
    }

    const token = jwt.sign({ id:user._id}, process.env.JWT_SIGN_KEY);
    res.json({token, userID: user._id})
})
 export default userRouter