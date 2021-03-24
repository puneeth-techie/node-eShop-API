import mongoose from "mongoose";
import createError from "http-errors";

const connectDB = async () => {
  const url = process.env.MONGO_URI;
  try {
    const conn = await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log(`Connected to the DB: ${conn.connection.host}`);
  } catch (error) {
    createError(500, error.message);
  }
};

export default connectDB;
