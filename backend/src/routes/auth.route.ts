import { Router } from "express";
import { logout, signin, signup } from "../controllers/auth.controller.ts";

const authRouter = Router();

authRouter.post("/signup", signup);
authRouter.post("/signin", signin);
authRouter.post("/logout", logout);

export default authRouter;
