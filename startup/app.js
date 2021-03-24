import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import { notFound, errorStack } from "../middlewares/errorHandler.js";

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

//error handler
app.use(notFound);
app.use(errorStack);

export default app;
