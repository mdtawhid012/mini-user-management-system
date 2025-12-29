import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware.ts";
import {
  changePassword,
  getProfile,
  updateProfile,
} from "../controllers/user.controller.ts";

const userRouter = Router();

userRouter.get("/", authMiddleware, getProfile);
userRouter.put("/", authMiddleware, updateProfile);
userRouter.put("/password", authMiddleware, changePassword);

export default userRouter;
