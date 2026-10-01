import express from 'express';
import  connectDB  from "./DB/connectionDB.js";
import userRouter from "./modules/users/users.controller.js";
import cors from "cors"

const app = express();
const port = 3000;

const bootstrap = async()=>{

    app.use(cors({
        origin: "*"
    }))

    app.use(express.json())
    
    await connectDB() 

    app.use("/users", userRouter);
   

    app.get("/",(req,res,next)=>res.status(200).json({message:"hello world"}))

   
    app.use("{/*demo}",(req,res,next)=>{
        res.status(404).json({
            message: `url:${req.originalUrl} with method: ${req.method} not found `,
            stautscode:404
        })
    })
    app.listen(port,()=>console.log(`server is running on port ${port}!`))
}
export default bootstrap