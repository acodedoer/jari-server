import express from 'express';
import jwt from 'jsonwebtoken';
import { UserModel } from "../models/Users.js";
import bcrypt from 'bcrypt'; 

const userRouter = express.Router();

userRouter.post("/register", async(req,res) => {
    try{
        const {firstname, lastname, email, password} = req.body;
        const checkEmail = await UserModel.findOne({email});
        if(checkEmail){
           return res.status(409).json({"message":"Email in use!"})
        }

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new UserModel({
            firstname, lastname, email, password:passwordHash
        })

        const savedUser = await  newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(err.code).json({message: err.message});
    }
})

userRouter.post("/login", async (req, res)=>{
    try{
        const {email, password} = req.body;
        const user = await UserModel.findOne({email});

        if(!user){
            return res.status(400).json({message:"Username or Password Is Incorrect!"});
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(!isPasswordValid){
            return res.status(400).json({message:"Username or Password Is Incorrect!"});
        }
  
        const token = jwt.sign({ id:user._id}, process.env.JWT_SIGN_KEY);
        delete user.password; 
        res.json({token, userID: user})     
    } catch( err ){
        res.status(err.code).json({message: err.message});
    }
})
 export default userRouter