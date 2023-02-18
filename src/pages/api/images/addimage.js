import { connectDB } from "@/backend/config/connectDB";
import { imageModel } from "@/backend/schema/imageSchema";
connectDB()
export default async function handler(req, res) {
    
    if (req.method !== "POST") {
      res.json({ messege: "Methods Other then POST are not allowed" });
    } else {
      try {
        const { name, image ,isactive } = req.body;
        const imagenew = await imageModel.findOne({ name: name ,isactive:"false"});
  
        if (imagenew) {
          const filter = { _id: imagenew._id };
          const update = { isactive : "true" };

          let doc = await imageModel.findOneAndUpdate(filter, update, {
            new: true,
          });
          res.send({ status: "success", message: "uploaded Success" ,data : doc });
        } else {
          if (name && image) {
            try {
              const doc = new imageModel({
                name,
                image,
                isactive
              });
              await doc.save();
              const saved_image = await imageModel.findOne({ name: name });
  
              res.status(201).send({
                status: "success",
                message: "uploaded Success",
                token: saved_image,
              });
            } catch (error) {
              console.log(error);
              res.send({ status: "failed", message: "Unable to upload" });
            }
          } else {
            res.send({
              status: "failed",
              message: "name and image both are required",
            });
          }
        }
      } catch (error) {
        console.log(error);
        res.status(200).json({ status: "failed", messege: error });
      }
    }
  }
  