import { Router } from "express";
import { getUsers, signup, updateUser,getUserByEmail, getUserById } from "./user.service.js";

const userRouter = Router();



userRouter.get("/",getUsers)

userRouter.post("/signup", signup);

userRouter.get("/by-email", getUserByEmail);

userRouter.get("/user/:id", getUserById);

userRouter.put("/:id", updateUser);




export default userRouter