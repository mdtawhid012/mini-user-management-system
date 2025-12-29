import { z } from "zod";
import { comparePassword, hashPassword } from "../utils/hash.ts";
import type { Request, Response } from "express";

const updateProfileSchema = z.object({
  fullName: z.string().min(3).optional(),
  email: z.email().optional(),
});

export const getProfile = async (req: Request, res: Response) => {
  const { _id, fullName, email, role, isActive } = (req as any).user;

  res.status(200).json({
    _id,
    fullName,
    email,
    role,
    isActive,
  });
};

export const updateProfile = async (req: Request, res: Response) => {
  const result = updateProfileSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      message: "Invalid input",
    });
  }

  (req as any).user.fullName =
    result.data.fullName ?? (req as any).user.fullName;
  (req as any).user.email = result.data.email ?? (req as any).user.email;

  await (req as any).user.save();

  res.status(200).json({
    message: "Profile updated successfully",
  });
};

export const changePassword = async (req: Request, res: Response) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  const verifyPass = await comparePassword(
    oldPassword,
    (req as any).user.password
  );
  if (!verifyPass) {
    return res.status(401).json({
      message: "Incorrect old password",
    });
  }

  (req as any).user.password = await hashPassword(newPassword);
  await (req as any).user.save();

  res.status(200).json({
    message: "Password changed successfully",
  });
};
