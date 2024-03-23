import express from "express";

import {
  signup,
  login,
  signupProvider,
  loginProvider,
} from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.post("/register", signup);
authRouter.post("/login", login);
authRouter.post("/registerProvider", signupProvider);
authRouter.post("/loginProvider", loginProvider);
export default authRouter;
