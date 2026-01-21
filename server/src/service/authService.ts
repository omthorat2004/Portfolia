import  User  from '../models/UserSchema';
import jwt from 'jsonwebtoken';
import { ApiError } from '../utils/apiError';

export const authService = {
  register: async (name: string, email: string, password: string) => {
    const existingUser = await User.findOne({ email });
    if (existingUser) throw new ApiError('User already exists', 409);

    const user = new User({ name, email, password });
    await user.save();

    const token = generateToken(user._id);
    return { user, token };
  },

  login: async (email: string, password: string) => {
    const user = await User.findOne({ email });
    if (!user) throw new ApiError('User not found', 404);

    const isMatch = await user.comparePassword(password);
    if (!isMatch) throw new ApiError('Invalid password', 401);

    const token = generateToken(user._id);
    return { user, token };
  },
};

const generateToken = (userId: string) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET || 'secret', {
    expiresIn: '1d',
  });
};
