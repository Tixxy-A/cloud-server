import express from "express";

import { authProvider } from "../middlewares/auth.js";
import { getCurrentProvider } from "../controllers/authController.js";
import { updateProvider } from "../controllers/providerController.js"

const providerRouter = express.Router();

providerRouter.use(authProvider);
providerRouter.get("/getDetails", getCurrentProvider);
providerRouter.patch("/updateDetails/:id", updateProvider);

export default providerRouter;
