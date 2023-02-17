import mongoose from "mongoose";

// Defining Schema
const imageSchema = new mongoose.Schema({
    name: String,
    image: String,
})

export const imageModel = mongoose.model("image", imageSchema) // collection name "image"