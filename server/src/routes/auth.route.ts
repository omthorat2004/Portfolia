import express from "express"
import { signup } from "../controller/auth.controller"
import { isProfileComplete } from "../middleware/authentication"

const router = express.Router()

router.post('/signup',signup)

router.post('/login',isProfileComplete,)

export default router