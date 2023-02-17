import { connectDB } from "@/backend/config/connectDB";
import { userModel } from "@/backend/schema/userSchema";


export default async function handler(req, res) {
  connectDB()
  if (req.method !== "POST") {
    res.json({ messege: "Methods Other then POST are not allowed" });
  } else {
    try {
      const { email, password } = req.body;
      const user = await userModel.findOne({ email: email });

      if (user) {
        res.send({ status: "failed", message: "email already exists" });
      } else {
        if (email && password) {
          try {
            const doc = new userModel({
              email,
              password,
            });
            await doc.save();
            const saved_user = await userModel.findOne({ email: email });

            res.status(201).send({
              status: "success",
              message: "Registration Success",
              token: saved_user,
            });
          } catch (error) {
            console.log(error);
            res.send({ status: "failed", message: "Unable to Register" });
          }
        } else {
          res.send({
            status: "failed",
            message: "email and password both are required",
          });
        }
      }
    } catch (error) {
      console.log(error);
      res.status(200).json({ status: "failed", messege: error });
    }
  }
}
