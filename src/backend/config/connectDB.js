import mongoose from "mongoose";
let DATABASE_URL =
  "mongodb+srv://monish:Monish1995@cluster0.ijjgg.mongodb.net/?retryWrites=true&w=majority";

let connection;
export const connectDB = async () => {
  try {
    const DB_OPTIONS = {
      dbName: "Gellery",
    };
    if (!connection) {
      connection = await mongoose.connect(DATABASE_URL, DB_OPTIONS);
    }
    console.log("Connected Successfully...");
  } catch (error) {
    console.log(error);
  }
};

export default connection;
