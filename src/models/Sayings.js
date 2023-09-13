import mongoose from "mongoose"

const SayingSchema = new mongoose.Schema({
    saying: {type: String, required: true, unique: true},
    tags: [{type: String, required: true}],
    created:{type: Date, default: Date.now, required:true},
    edited: {type: Date, default: Date.now, required:true},
    likes: {type: Number,required:true},
    isVisible: {type: Boolean,required:true},
    author: { type: mongoose.Schema.Types.ObjectId, ref:"users", required:true},
    editors:[{type: mongoose.Schema.Types.ObjectId, ref:"users",required:true}],
    lastEditor:{type: mongoose.Schema.Types.ObjectId, ref:"users",required:true}
})

export const SayingModel = mongoose.model("sayings", SayingSchema);