import { NextFunction, Request, Response } from "express";
import User from "../models/UserSchema";

export const isProfileComplete = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const email = req.headers['x-user-email']
        if (!email) {
            return res.status(401).json({ message: 'Email Header Missing' })
        }
        const user = await User.findOne({ email }, 'isProfileComplete -_id');
        if (!user || !user.isProfileComplete) {
            return res.status(403).json({ message: "Profile is not completed!" });
        }

        next()
    } catch (err) {

        console.log(err)
        return res.status(500).json({message:'Server Error'})
    }
}


