import express from "express";

import { login, signup,register } from "../controller/auth.controller";
import { isProfileComplete, verifyUser } from "../middleware/authentication";
import User from "../models/UserSchema";

const router = express.Router()


router.post('/signup', signup);
router.post('/login', login);


router.post('/register', verifyUser, register);

router.get('/verifyuser',verifyUser,async(req,res)=>{
    const user = await User.findById(req.userId).select("-password")
    res.status(200).json({message:'Token is valid!',user})
})

router.get('/return-email',verifyUser,async(req,res)=>{
    try{
        const id = req.userId
        const user = await User.findById(id,'email')
        return res.status(200).json({email:user?.email})
    }catch(err){
        console.log(err)
        return res.status(500).json({err:'Server Error Occurred!'})
    }
})

// router.get('/dashboard', verifyUser, isProfileComplete, dashboard);





export default router