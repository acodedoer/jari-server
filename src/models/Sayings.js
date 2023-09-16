import mongoose from "mongoose"

const SayingSchema = new mongoose.Schema({
    saying: {type: String, required: true, unique: true},
    tags: [{type: mongoose.Schema.Types.ObjectId, ref:"tags", required: true}],
    created:{type: Date, default: Date.now, required:true},
    edited: {type: Date, default: Date.now, required:true},
    likes: {type: Number,required:true, default:0},
    isVisible: {type: Boolean,required:true},
    author: { type: mongoose.Schema.Types.ObjectId, ref:"users", required:true},
    editors:[{type: mongoose.Schema.Types.ObjectId, ref:"users",required:true}],
    lastEditor:{type: mongoose.Schema.Types.ObjectId, ref:"users",required:true}
})

export const SayingModel = mongoose.model("sayings", SayingSchema);   