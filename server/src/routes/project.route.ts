import express from 'express'
import projectsController from '../controller/projects.controller'

const router = express.Router()

router.post('/add-project',projectsController.addProject);

export default router