import mongoose from "mongoose"

const TagSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    useCount: {type: Number, required:true, default:0}
})
 
export const TagModel = mongoose.model("tags", TagSchema);    