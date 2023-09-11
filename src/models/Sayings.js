const mongoose = require("mongoose");

const SayingSchema = new mongoose.Schema({
    saying: {type: String, required: true, unique: true},
    tags: {type: String, required: true}
})