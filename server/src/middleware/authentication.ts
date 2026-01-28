import { NextFunction, Request, Response } from "express";
import User from "../models/UserSchema";
import { verify } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string


export const isProfileComplete = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = await User.findById(req.userId).select("isProfileComplete");

  if (!user || !user.isProfileComplete) {
    return res.status(403).json({
      message: "Please complete your profile first"
    });
  }

  next();
};

export const verifyUser = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = verify(token, JWT_SECRET) as { userId: string };
    req.userId = decoded.userId; 
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
