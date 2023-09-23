import jwt from 'jsonwebtoken';
import { UserModel } from "../models/Users.js";
import bcrypt from 'bcrypt'; 

export const registerUser = async(req,res) => {
    try{
        let {firstname, lastname, email, password} = req.body

        email = email.toLowerCase();
        firstname = firstname.toLowerCase();
        lastname = lastname.toLowerCase();

        if(password.length<8) return res.status(409).json({"message":"Password must be at least 8 characters long!"})

        const checkEmail = await UserModel.findOne({email});
        if(checkEmail){
           return res.status(409).json({"message":"Email in use!"})
        }

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new UserModel({
            firstname, lastname, email, password:passwordHash
        })

        await  newUser.save()
        .then(({_id, firstname, lastname, email, token, isVerified}) => res.status(201).json({_id, firstname, lastname, email, token, isVerified}))

    } catch (err) {
        res.status(err.code).json({message: err.message});
    }
}

export const loginUser = async (req, res)=>{
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
        const {_id, firstname, lastname, isVerified} = user;
        res.json({token, _id, firstname, lastname, isVerified })     
    } catch( err ){
        res.status(err.code).json({message: err.message});
    }
}