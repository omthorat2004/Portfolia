import { Request, Response } from "express";
import { IProject } from "../models/ProjectSchema";
import projectsService from "../service/projectsService";

class ProjectsController{
    
    async addProject(req:Request,res:Response){
        const projectData = req.body
        try{
            const project = await projectsService.addProject(projectData);
            return res.status(201).json({message:'Project is created'})
        }catch(err){
            console.log(err)
            return res.status(500).json({message:err})
        }
    }

}

const projectsController = new ProjectsController()

export default projectsController