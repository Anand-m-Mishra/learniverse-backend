import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import userRouter from "./routes/user.routes.js"
import * as dotenv from 'dotenv'
import todorouters from "./routes/todo.routes.js"

dotenv.config();



const app=express()

app.use(cors({              //to handle middlewares
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))
app.use(express.json());  //to handle json data
app.use(express.urlencoded({extended:true,limit:"16kb"})) //to handle URLs 
app.use(cookieParser())  //to handle cookies

//+++++++++ Router Declaration ++++++
app.use("/api/v1/users",userRouter)
app.use("/api/v1/users",todorouters)

//http://localhost:8000/api/v1/users/register

export {app}