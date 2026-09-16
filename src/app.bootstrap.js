import express from 'express';
import {connectionDB} from "./DB/connectionDB.js"
import bookRoutes from "./modules/books/book.routes.js";

const app = express();
const port = 3000;

const bootstrap = async()=>{
    app.use(express.json())
    await connectionDB() 
    app.use("/users", userRouter);
    app.use(bookRoutes);
  

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