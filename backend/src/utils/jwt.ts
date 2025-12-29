import jwt, { type JwtPayload } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

interface AuthPayload extends JwtPayload {
  userId: string;
}

export const generateToken = (userId: string) => {
  return jwt.sign({ userId }, JWT_SECRET);
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET) as AuthPayload;
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
};
