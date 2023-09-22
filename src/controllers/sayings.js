import { SayingModel } from "../models/Sayings.js";
import mongoose from "mongoose";

export const getSayings = async (req, res) => {
    try{
        const tags = req.params.tag === "-1"?"":req.params.tag.length>0 && req.params.tag.split(",");
        const sort = Number(req.params.sort) || -1;
        const matchers = [];
        console.log(tags)
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
          .then((response)=>res.status(200).json(response)
        )
        .catch((err)=> res.status(401).json(err)
        )
    } catch (err){
        res.status(401).json(err);
    }
}

export const deleteSaying = async (req, res) => {
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
}

export const updateSaying = async (req, res) => {
    try{
        const sayingId = req.params.id;
        await SayingModel.findByIdAndUpdate(sayingId,req.body.saying)
        .then((response)=>res.status(200).json(response))
        .catch((err)=>res.status(400).json(err));
    }catch(err){
        res.status(401).json(err);
    }
}

export const createSaying = async (req, res)=>{
    const saying = new SayingModel(req.body)
    try{
        await saying.save()
        .then((response)=> {
            res.status(200).json(response);
        })
        .catch((err)=> res.status(401).json(err));
    } catch(err){
        res.status(401).json(err);
    }
}