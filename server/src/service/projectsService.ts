import projectDAO from "../dao/projects.dao";
import { IProject } from "../models/ProjectSchema";


class ProjectsService{
    
    async addProject(project:Partial<IProject>){
        return await  projectDAO.addProject(project)
    }
}

const projectsService = new ProjectsService()

export default projectsService;