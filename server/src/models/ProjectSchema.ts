import mongoose, { Document, type ObjectId }  from "mongoose";
import { AdditionalLink } from "./UserSchema";



export interface IProject extends Document{
    problemStatement:string;
    image:string;
    intro:string;
    teckStack:string;
    githubLink:string;
    userId:ObjectId;
    description:string;
    demo:string;
    extraLinks:AdditionalLink[];
    tags:string[];
    presentationPdf:string;
    uniqueness:string;
    portfolioOn:boolean;
}

const projectSchema =new mongoose.Schema<IProject>({
    problemStatement:{type:String,required:true},
    image:{type:String,required:true},
    intro:{type:String,required:true},
    teckStack:{type:String,required:true},
    githubLink:{type:String,required:true},
    userId:{type:mongoose.Schema.Types.ObjectId},
    description:{type:String},
    demo:{type:String},
    presentationPdf:{type:String},
    uniqueness:{type:String},
    portfolioOn:{type:Boolean,default:false}
},{
    timestamps:true
})


const Project = mongoose.model('Project',projectSchema)

export default Project