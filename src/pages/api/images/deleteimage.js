import { connectDB } from "@/backend/config/connectDB";
import { imageModel } from "@/backend/schema/imageSchema";
connectDB();
export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.json({ messege: "Methods Other then POST are not allowed" });
  } else {
    try {
      const { ID, isactive } = req.body;

      if (ID) {
        try {
          const filter = { _id: ID };
          const update = { isactive };

          let doc = await imageModel.findOneAndUpdate(filter, update, {
            new: true,
          });

          res.status(200).send({
            status: "success",
            message: "deleted Success",
            data: doc,
          });
        } catch (error) {
          console.log(error);
          res.send({ status: "failed", message: "Unable to delete" });
        }
      } else {
        res.send({
          status: "failed",
          message: "ID is required",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(200).json({ status: "failed", messege: error });
    }
  }
}
