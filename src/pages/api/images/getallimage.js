const { connectDB } = require("@/backend/config/connectDB");
const { imageModel } = require("@/backend/schema/imageSchema");

export default async function handler(req, res) {
  connectDB();
  try {
   
   let images = await imageModel.find().sort({date: -1})
      
      if (images) {
        res.status(200).json({
          status: "success",
          data: images,
        });
      }

  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Something went wrong",
      result: error,
    });
  }
};
