import { User } from "../models/user.model.ts";
import type { Request, Response } from "express";

export const getAllUsers = async (req: Request, res: Response) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const users = await User.find().select("-password").skip(skip).limit(limit);

    const total = await User.countDocuments();

    res.status(200).json({
        page,
        totalPages: Math.ceil(total / limit),
        users,
    });
};

export const toggleUserStatus = async (req: Request, res: Response) => {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    user.isActive = !user.isActive;
    await user.save();

    res.status(200).json({
        message: `User ${user.isActive ? "activated" : "deactivated"}`,
    });
};
