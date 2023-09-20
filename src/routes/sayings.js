import { SayingModel } from "../models/Sayings.js";
import { UserModel } from "../models/Users.js";
import express from "express";
import mongoose from "mongoose";

export const sayingsRouter  = express.Router();

sayingsRouter.get("/:sort?",async (req, res) => {
    try{
        const sort = Number(req.params.sort) || -1;
        await SayingModel.aggregate([
            {
              $lookup: {
                from: 'tags',
                localField: 'tags',
                foreignField: '_id',
                as: 'tagDetails'
              }
            },
            {
                $sort: {
                    edited: sort
                }
            }
          ])
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

sayingsRouter.get("/:tag?/:sort?",async (req, res) => {
    try{
        const tags = req.params.tag.length>0 && req.params.tag.split(",");
        const sort = Number(req.params.sort) || -1;
        const matchers = [];
        tags && tags.length>0 && tags.forEach(tag => tag.length>0 && tag!="" && matchers.push({
            $match: {
                tags: {
                    $elemMatch: { $eq: new mongoose.Types.ObjectId(tag) }
                  }
            }
        }));
        await SayingModel.aggregate([ 
            ...matchers,
            {
              $lookup: {
                from: 'tags',
                localField: 'tags',
                foreignField: '_id',
                as: 'tagDetails'
              }
            },
            {
                $sort: {
                    edited:sort
                }
            }
          ])
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

sayingsRouter.delete('/:id', async (req, res) => {
    try {
      const sayingId = req.params.id;
      const deletedSaying = await SayingModel.findByIdAndDelete(sayingId);
  
      if (!deletedSaying) {
        return res.status(404).json({ error: 'Saying not found' });
      }
  
      res.json({ message: 'Saying deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
});

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

sayingsRouter.put("/:id", async (req, res) => {
    try{
        const sayingId = req.params.id;
        await SayingModel.findByIdAndUpdate(sayingId,req.body.saying)
        .then((response)=>res.status(200).json(response))
        .catch((err)=>res.status(400).json(err));
    }catch(err){
        res.status(401).json(err);
    }
})

sayingsRouter.get("/savedSayings/ids", async (req, res) => {
    try{
        await UserModel.findById(req.body.userID)
        .then((response)=>{
            res.json({savedSayings: response.savedSayings});
        })
        .catch((err)=> res.status(401).json(err));
    }catch(err){
        res.status(401).json(err);
    }
})

sayingsRouter.get("/savedSayings", async (req, res) => {
    try{
        await UserModel.findById(req.body.userID)
        .then((response)=>{
           const savedSayings = SayingModel.find({
            _id: {$in: response.savedSayings}
           })
           res.json(savedSayings)
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
        .then((response)=> {
            res.status(200).json(response)
        })
        .catch((err)=> res.status(401).json(err));
    } catch(err){
        res.status(401).json(err)
    }
});