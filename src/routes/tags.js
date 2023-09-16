import { TagModel } from "../models/Tags.js";
import express from "express";
import mongoose from "mongoose";

export const tagsRouter  = express.Router();

tagsRouter.get("/",async (req, res) => {

    try{
        await TagModel.find({})
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

tagsRouter.put("/", async (req, res) => {
    try{
        const tag = await TagModel.findById(req.body.tagID);
        if(tag.sayings.length<1){
            tag.name = req.body.name;
            await tag.save()
            .then((response) => res.json(response));
        }
        else{
            res.status(401).json({message:"Cannot edit a used tag"});
        }
    }catch(err){
        res.status(401).json(err);
    }
})


tagsRouter.post("/", async (req, res)=>{
    const tag = new TagModel(req.body)
    try{
        await tag.save()
        .then((response)=> {
            res.status(200).json(response)
        })
        .catch((err)=> res.status(401).json(err));
    } catch(err){
        res.status(401).json(err)
    }
}) 