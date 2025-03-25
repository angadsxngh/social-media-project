import { Router } from "express";
import { upload } from "../middleware/multer.middleware";
import { createNewPost } from "../controllers/post.controller";

const router = Router()

// router.route("/create-post").post(createNewPost)


export default router