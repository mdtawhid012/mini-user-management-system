import { z } from "zod";
import { User } from "../models/user.model.ts";
import { comparePassword, hashPassword } from "../utils/hash.ts";
import { generateToken } from "../utils/jwt.ts";
import type { Request, Response } from "express";

const signupSchema = z.object({
  fullName: z
    .string("Full name is required")
    .min(3, "Full name must be at least 3 characters"),

  email: z.email("Please provide a valid email"),

  password: z
    .string("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

const signinSchema = z.object({
  email: z.email("Please provide a valid email"),
  password: z
    .string("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

export const signup = async (req: Request, res: Response) => {
  const result = signupSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      errors: result.error.flatten().fieldErrors,
    });
  }

  const { fullName, email, password } = result.data;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json({
      message: "User already exists",
    });
  }

  const hashedPass = await hashPassword(password);

  const user = await User.create({
    fullName,
    email,
    password: hashedPass,
  });

  const token = generateToken(user._id.toString());

  return res.status(201).json({
    message: "User created successfully",
    token,
  });
};

export const signin = async (req: Request, res: Response) => {
  const result = signinSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      //@ts-ignore
      errors: result.error.fieldErrors,
    });
  }

  const { email, password } = result.data;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({
      message: "Invalid credentials",
    });
  }

  const isValid = await comparePassword(password, user.password);
  if (!isValid) {
    return res.status(401).json({
      message: "Invalid credentials",
    });
  }

  const token = generateToken(user._id.toString());

  return res.status(200).json({
    message: "Login successful",
    token,
  });
};

export const logout = (req: Request, res: Response) => {
  return res.status(200).json({
    message: "Logout successful",
  });
};
