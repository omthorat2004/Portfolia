import User from "../models/UserSchema";
import { ApiError } from "../utils/apiError";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/auth";

export const authService = {
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
  }
};
