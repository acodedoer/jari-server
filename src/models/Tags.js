import mongoose from "mongoose"

const TagSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    sayings: [{type: mongoose.Schema.Types.ObjectId, ref:"sayings", default:[]}],
})

export const TagModel = mongoose.model("tags", TagSchema);    