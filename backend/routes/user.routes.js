import { Router } from "express";
import { changePassword, deleteAccount, findUser, followUser, getUser, getUserProfile, loginUser, logoutUser, refreshAccessToken, registerUser, updateAccountDetails, updatePfp } from "../controllers/user.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { createNewPost, deletePost, fetchUserPosts, getPosts } from "../controllers/post.controller.js";

const router = Router();

router.route("/register").post(
    upload.fields([
        {
            name: "pfp",
            maxCount: 1,
        }
    ]),
    registerUser
)

router.route("/login").post(loginUser)



//secured routes

router.route("/logout").post(verifyJWT ,logoutUser)

router.route("/refresh-token").post(refreshAccessToken)

router.route("/change-password").post(verifyJWT, changePassword)

router.route("/update-details").post(verifyJWT, updateAccountDetails)

router.route("/update-pfp").post(
    upload.fields([
        {
            name: "pfp",
            maxCount: 1
        }
    ]),
    verifyJWT, updatePfp
)

// router.route("/get-user").post(verifyJWT, getUser)

router.get("/search", verifyJWT, findUser);

router.get('/get-user', verifyJWT, getUser)

router.route("/delete-account").post(verifyJWT, deleteAccount)

router.route("/create-post").post(
    upload.fields([
        {
            name: "media",
            maxCount: 1,
        }
    ]),
    createNewPost
)

router.route('/get-posts').get(verifyJWT, getPosts)

router.route('/delete-post').delete(verifyJWT,deletePost);

router.get("/profile/:userId", verifyJWT, getUserProfile);

// router.get('/profile/:userId', fetchUserPosts)

router.post('/follow/:userId', verifyJWT, followUser)


export default router;