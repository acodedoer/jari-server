import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    firstname: {type: String, require:true, min:3, max: 50},
    lastname: {type: String, require:true, min:3, max: 50},
    email: {type: String, required: true, unique: true},
    password: {type: String, min:8, required: true},
    isVerified: {type: Boolean, required:true, default: false},
    createdSayings: [{type: mongoose.Schema.Types.ObjectId, ref:"sayings"}]},
    {timestamps: true}    
);

export const UserModel = mongoose.model("users", UserSchema);
 