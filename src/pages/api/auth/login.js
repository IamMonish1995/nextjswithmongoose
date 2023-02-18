import { userModel } from "@/backend/schema/userSchema";
import { connectDB } from "@/backend/config/connectDB";
connectDB()
export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.json({ messege: "Methods Other then POST are not allowed" });
  } else {
    const { email, password } = req.body;
    const user = await userModel.findOne({
      email,
      password,
    });

    if (user) {
      res.send({ status: "success", message: "Login Successfull", user: user });
    } else {
      res.send({ status: "failed", message: "User Not Found" });
    }
  }
}
