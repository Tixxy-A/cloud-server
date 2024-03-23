import express from "express";

import { getAllProviders } from "../controllers/adminController.js";
import { subscribe, updateResources } from "../controllers/userController.js";
import { getCurrentUser, updateUser } from "../controllers/authController.js";

import { authUser } from "../middlewares/auth.js";
const userRouter = express.Router();

userRouter.use(authUser);
userRouter.get("/getAllProviders", getAllProviders);
userRouter.patch("/subscribe/:id", subscribe);
userRouter.get("/getDetails", getCurrentUser);
userRouter.patch("/updateUser", updateUser);
userRouter.patch("/updateResources", updateResources);

export default userRouter;
