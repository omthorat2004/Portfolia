import { Request, Response } from "express";
import { ApiError } from "../utils/apiError";
import authService from "../service/authService";

export const signup = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      throw new ApiError("All fields are required", 400);
    }

    await authService.signup(name, email, password);

    return res.status(201).json({
      message: "Signup successful. Please login.",
    });
  } catch (err: any) {
    const statusCode = err instanceof ApiError ? err.statusCode : 500;
    const message = err instanceof ApiError ? err.message : "Server Error";
    return res.status(statusCode).json({ message });
  }
};

export const register = async (req: Request, res: Response) => {
    try {
        const { email, social, bio, skills, additionalLinks } = req.body;
        
        if(!email || !social || !bio || !skills || skills.length === 0){
            return res.status(400).json({message:'All fields are required!'})
        }

        const user = await authService.register(email, bio, social, skills, additionalLinks || []);
        if(!user){
            throw new Error()
        }
        return res.status(200).json({user})
    } catch (err) {
        console.error(err);

        const statusCode = err instanceof ApiError ? err.statusCode : 500;
        const message = err instanceof ApiError ? err.message : "Server Error";

        return res.status(statusCode).json({ message });
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if(!email || !password){
            throw new ApiError('All fields are required', 400);
        }
        
        const result = await authService.login(email, password);
        return res.status(200).json(result);
    } catch (err) {
        console.error(err);

        const statusCode = err instanceof ApiError ? err.statusCode : 500;
        const message = err instanceof ApiError ? err.message : "Server Error";

        return res.status(statusCode).json({ message });
    }
}