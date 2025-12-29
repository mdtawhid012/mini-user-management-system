import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware.ts";
import { adminMiddleware } from "../middleware/admin.middleware.ts";
import {
    getAllUsers,
    toggleUserStatus,
} from "../controllers/admin.controller.ts";

const adminRouter = Router();

adminRouter.get("/", authMiddleware, adminMiddleware, getAllUsers);
adminRouter.put(
    "/:userId/toggle",
    authMiddleware,
    adminMiddleware,
    toggleUserStatus
);

export default adminRouter;
