import { Request, Response } from "express";

import { ApiError } from "../utils/apiError";
import authService from "../service/authService";

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

export const register = async (req: Request, res: Response) => {
    try {

        const { email, social, bio, skills, additionalLinks } = req.body
        if(!email||social.length==0||!bio||skills.length==0){
            return res.status(400).json({message:'All fields are required!'})
        }

        const user = await authService.register(email,bio,social,skills,additionalLinks)
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
        const { email, password } = req.body

        if(!email || !password){
            throw new ApiError('All fields are required',400)
        }
        const token = authService.login(email,password)
        return res.status(200).json({token})
    } catch (err) {
        console.error(err);

        const statusCode = err instanceof ApiError ? err.statusCode : 500;
        const message = err instanceof ApiError ? err.message : "Server Error";

        return res.status(statusCode).json({ message });
    }
}