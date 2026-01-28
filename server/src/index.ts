import express from "express"
import cors from 'cors'

require("dotenv").config()

const app = express()

const MONGO_URL = process.env.MONGO_URL as string

import authRouter from './routes/auth.route'
import mongoose from "mongoose"

app.use(express.json())
app.use(cors())

mongoose.connect(MONGO_URL)
//routes
app.use("/auth",authRouter)


app.get('/',(req,res)=>{
    res.status(200).json({"message":'Server Running!'})
})



app.listen(process.env.PORT,()=>{
    console.log(process.env.PORT)
    console.log("Server listening at 3000")
})