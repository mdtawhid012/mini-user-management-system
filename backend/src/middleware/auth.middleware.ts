import type { NextFunction, Request, Response } from "express";
import { User } from "../models/user.model.ts";
import { verifyToken } from "../utils/jwt.ts";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1]!;

  try {
    const decoded = verifyToken(token);
    const user = await User.findById(decoded.userId);

    if (!user || !user.isActive) {
      return res.status(401).json({ message: "Account inactive" });
    }

    (req as any).user = user;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
};
