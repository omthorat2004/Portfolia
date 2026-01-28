import User, { SocialLinks } from "../models/UserSchema";
import { ApiError } from "../utils/apiError";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/auth";



 const authService = {
    signup: async (name: string, email: string, password: string) => {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            throw new ApiError("User already exists", 409);
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            email,
            password: hashedPassword
        });

        await user.save();

        const token = generateToken(user._id.toString());

        return token;
    },
    register: async (email: string, bio: string, social: SocialLinks, skills: string[], additionalLinks: any) => {
        const userExist = await User.findOne({ email })
        if (!userExist) {
            throw new ApiError("User does not exists", 404)
        }
        const user = await User.findOneAndUpdate(
            { email },
            {
                $set: {
                    bio,
                    social,
                    skills,
                    additionalLinks,
                    isProfileComplete: true
                }
            },
            {
                new: true
            }
        ).select("-password")
        console.log(user)
        return user
    },
    login:async(email:string,password:string)=>{
        const userExist = await User.findOne({email});
        if(!userExist){
            throw new ApiError("User Does not exist",404)
        }
        const isPasswordCorrect = await bcrypt.compare(password,userExist.password)

        if(!isPasswordCorrect){
            throw new ApiError("Email or Password is Incorrect",401)
        }

        const token = generateToken(userExist._id.toString())
        return token
    }
};


export default authService