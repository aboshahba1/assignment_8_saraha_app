import express from 'express';
import { connectDb, syncDb } from './DB/connectionDB.js';
import userRouter from "./modules/users/user.controller.js";
import userModel from "./DB/models/user.models.js";
import Post from "./DB/models/post.models.js";
import "./DB/models/associations.js";
import postRouter from "./modules/posts/post.controller.js";
import Comment from "./DB/models/comment.models.js";
import commentRouter from "./modules/comments/comment.controller.js";

const app = express();
const port = 3000;

const bootstrap = async()=>{
    app.use(express.json())
    app.use("/users", userRouter);
    app.use("/posts", postRouter);
    app.use("/comments", commentRouter);

    app.get("/",(req,res,next)=>res.status(200).json({message:"hello world"}))

    await connectDb()
    await syncDb()
    app.use("{/*demo}",(req,res,next)=>{
        res.status(404).json({
            message: `url:${req.originalUrl} with method: ${req.method} not found `,
            stautscode:404
        })
    })
    app.listen(port,()=>console.log(`server is running on port ${port}!`))
}
export default bootstrap