import { Router } from "express";
import { createComments,
         updateComment,
         findOrCreateComment,
         searchComments,
         getNewestComments,
         getCommentDetails} from "./comment.service.js";

const commentRouter = Router();

commentRouter.post("/", createComments);

commentRouter.patch("/:commentId", updateComment);

commentRouter.post("/find-or-create", findOrCreateComment);

commentRouter.get("/search", searchComments);

commentRouter.get("/newest/:postId", getNewestComments);

commentRouter.get("/details/:id", getCommentDetails);


export default commentRouter;