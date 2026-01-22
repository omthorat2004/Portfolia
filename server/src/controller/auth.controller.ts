import { Request, Response } from "express";
import { authService } from "../service/authService";
import { ApiError } from "../utils/apiError";

export const signup = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      throw new ApiError("All fields are required", 400);
    }

    const token = await authService.signup(name, email, password);

    return res.status(201).json({ token });
  } catch (err: any) {
    console.error(err);

    const statusCode = err instanceof ApiError ? err.statusCode : 500;
    const message = err instanceof ApiError ? err.message : "Server Error";

    return res.status(statusCode).json({ message });
  }
};
