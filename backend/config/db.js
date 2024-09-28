import mongoose from "mongoose";

const connectDB = async () => {
  await mongoose
    .connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/ECom", {})
    .then((con) => {
      console.log(`Database connected to : ${con.connection.host}`);
    });
};

export default connectDB;
