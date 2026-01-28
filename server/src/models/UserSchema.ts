import mongoose, { Document, Model } from "mongoose";


type AdditionalLink = {
  label: string;
  value: string;
};


export type SocialLinks = {
  github?: string;
  twitter?: string;
  portfolio?: string;
};


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
  { timestamps: true } 
);


const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);

export default User;
