import { SayingModel } from "../models/Sayings.js";
import { UserModel } from "../models/Users.js";
import express from "express";
import mongoose from "mongoose";

export const sayingsRouter  = express.Router();

sayingsRouter.get("/",async (req, res) => {
    try{
        await SayingModel.find({})
        .then((response)=>{
            res.status(200).json(response);
        })
        .catch((err)=>{
            res.status(401).json(err);
        })
    } catch (err){
        res.status(401).json(err);
    }
})

sayingsRouter.put("/", async (req, res) => {
    try{
        const saying = await SayingModel.findById(req.body.sayingID);
        const user = await UserModel.findById(req.body.userID);
        user.savedSayings.push(saying);
        await user.save()
        .then((response) => res.json(response));
    }catch(err){
        res.status(401).json(err);
    }
})

sayingsRouter.get("/savedRecipes/ids", async (req, res) => {
    try{
        await UserModel.findById(req.body.userID)
        .then((response)=>{
            res.json({savedRecipes: response.savedRecipes});
        })
        .catch((err)=> res.status(401).json(err));
    }catch(err){
        res.status(401).json(err);
    }
})

sayingsRouter.get("/savedRecipes", async (req, res) => {
    try{
        await UserModel.findById(req.body.userID)
        .then((response)=>{
           const savedRecipes = SayingModel.find({
            _id: {$in: response.savedRecipes}
           })
           res.json(savedRecipes)
        })
        .catch((err)=> res.status(401).json(err));
    }catch(err){
        res.status(401).json(err);
    }
})

sayingsRouter.post("/", async (req, res)=>{
    const saying = new SayingModel(req.body)
    try{
        await saying.save()
        .then((response)=> res.status(200).json(response))
        .catch((err)=> res.status(200).json(err));
    } catch(err){
        res.status(200).json(err)
    }
})