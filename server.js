import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import "express-async-errors";

import connectDB from "./db/connect.js";
import authRouter from "./routes/authRoute.js";
import providerRouter from "./routes/providerRoute.js";
import adminRouter from "./routes/adminRoute.js";
import notFoundMiddleware from "./middlewares/not-found.js";
import errorHandlerMiddleware from "./middlewares/error-handler.js";
import userRouter from "./routes/userRoute.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "https://660c1746a0e0f10008ef5e49--cloud-brooker.netlify.app", // Your frontend URL
    credentials: true, // Allow cookies (if using authentication)
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  })
);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/provider", providerRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/user", userRouter);
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL)
      .then(() => {
        console.log("connected DB successfully");
      })
      .catch((err) => console.log(err));

    app.listen(port, () => {
      console.log("listening on port: " + port);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
