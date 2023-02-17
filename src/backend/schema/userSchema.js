import mongoose ,{model , models} from "mongoose";

// Defining Schema
const userSchema = new mongoose.Schema({
    email: String,
    password: String,
})

export const userModel = models.users || model("users", userSchema) // collection name "image"