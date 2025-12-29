import type { NextFunction, Request, Response } from "express";

export const adminMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if ((req as any).user.role !== "admin") {
    return res.status(403).json({ message: "Admin access required" });
  }
  next();
};
