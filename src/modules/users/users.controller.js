import { Router } from "express";
import * as Us from "./users.service.js";

const userRouter = Router()

userRouter.post("/signUp", Us.signUp);
userRouter.post("/signUp/gmail", Us.signUpWithGmail);
userRouter.post("/signin", Us.signin);
userRouter.get("/Profile", Us.getProfile);


export default userRouter;
