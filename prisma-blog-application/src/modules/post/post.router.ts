
import express, { NextFunction, Request, Response } from "express";
import { postController } from "./post.controller";
const router = express.Router();

const auth = (...roles: any) => {
return async (req: Request, res:Response, next: NextFunction) => {
    console.log(roles) 
    next()
}
}


router.post("/", auth("USER"), postController.createPost)

export const postRouter = router; 