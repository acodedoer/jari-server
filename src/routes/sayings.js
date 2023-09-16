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
            console.log(response)
            res.status(200).json(response)
        })
        .catch((err)=> res.status(401).json(err));
    } catch(err){
        res.status(401).json(err)
    }
}) 