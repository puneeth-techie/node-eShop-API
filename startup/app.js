import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import { notFound, errorStack } from "../middlewares/errorHandler.js";
import categoryRoute from "../routes/categoryRoute.js";
import productRoute from "../routes/productRoute.js";
import userRoute from "../routes/userRoute.js";
import orderRoute from "../routes/orderRoute.js";

//configure dotenv
dotenv.config();

//init app
const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//route handler
app.use("/api/v1/categories", categoryRoute);
app.use("/api/v1/products", productRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/orders", orderRoute);

//notFound handler
app.use(notFound);
//error handler
app.use(errorStack);

export default app;
