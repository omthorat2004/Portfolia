import express from "express"
import cors from 'cors'

require("dotenv").config()

const app = express()

import authRouter from './routes/auth.route'

app.use(express.json())
app.use(cors())


//routes
app.use("/auth",authRouter)


app.get('/',(req,res)=>{
    res.status(200).json({"message":'Server Running!'})
})



app.listen(process.env.PORT,()=>{
    console.log(process.env.PORT)
    console.log("Server listening at 3000")
})