import { IProject } from "../models/ProjectSchema";

import Project from "../models/ProjectSchema";
class ProjectDAO{
    async addProject(projectData:Partial<IProject>){
       try{
        const project =  new Project(projectData)
        return await project.save()
       }catch(err){
        throw new Error('DB Failed')
       }
    }
}

const projectDAO = new ProjectDAO()

export default projectDAO

