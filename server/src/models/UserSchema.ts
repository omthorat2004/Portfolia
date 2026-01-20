import mongoose, { Document, Model } from "mongoose";

// Type for additional links
type AdditionalLink = {
  label: string;
  value: string;
};

// Type for social links
type SocialLinks = {
  github?: string;
  twitter?: string;
  portfolio?: string;
};

// Interface for User
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  bio?: string;
  isProfileComplete?: boolean;
  social?: SocialLinks;
  skills?: string[];
  additionalLinks?: AdditionalLink[];
}

// User Schema
const userSchema = new mongoose.Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    bio: { type: String, default: "" },
    isProfileComplete: { type: Boolean, default: false },
    social: {
      github: { type: String, default: "" },
      twitter: { type: String, default: "" },
      portfolio: { type: String, default: "" },
    },
    skills: { type: [String], default: [] },
    additionalLinks: {
      type: [{ label: String, value: String }],
      default: [],
    },
  },
  { timestamps: true } // adds createdAt and updatedAt
);

// Create User model
const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);

export default User;
