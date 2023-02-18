import mongoose ,{model , models} from "mongoose";

// Defining Schema
const imageSchema = new mongoose.Schema({
    name: String,
    image: String,
    isactive:String
})

export const imageModel = models.Image || model("Image", imageSchema) // collection name "image"