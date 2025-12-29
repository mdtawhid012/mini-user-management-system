import { Router } from "express";
import { logout, signin, signup } from "../controllers/auth.controller.ts";
import { authMiddleware } from "../middleware/auth.middleware.ts";

const authRouter = Router();

authRouter.post("/signup", signup);
authRouter.post("/signin", signin);
authRouter.post("/logout", authMiddleware, logout);

export default authRouter;
