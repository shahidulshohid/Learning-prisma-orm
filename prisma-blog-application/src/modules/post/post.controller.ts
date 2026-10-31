import { Request, Response } from "express";
import { postService } from "./post.service";

const createPost = async (req: Request, res: Response) => {
    try {
        const result = await postService.createPost(req.body);
        res.status(201).json(result);
    } catch (error: any) {
        console.error("Post creation error:", error);
        res.status(400).json({
            error: "Post creation failed",
            message: error?.message || "Unknown error occurred",
            details: error,
        });
    }
};

export const postController = {
    createPost,
}; 
