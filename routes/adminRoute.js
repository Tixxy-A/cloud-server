import express from "express";

import { loginAdmin, signupAdmin } from "../controllers/authController.js";
import { getDetails, getAllProviders } from "../controllers/adminController.js";
import { authAdmin } from "../middlewares/auth.js";

const adminRouter = express.Router();

adminRouter.post("/register", signupAdmin);
adminRouter.post("/login", loginAdmin);
adminRouter.use(authAdmin);
adminRouter.get("/getDetails", getDetails);
adminRouter.get("/getProviders", getAllProviders);

export default adminRouter;
