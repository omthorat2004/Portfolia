import express from "express"

require("dotenv").config()

const app = express()

app.get('/',(req,res)=>{
    res.status(200).json({"message":'Server Running!'})
})

app.listen(process.env.PORT,()=>{
    console.log(process.env.PORT)
    console.log("Server listening at 3000")
})