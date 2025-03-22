import { Router } from "express";
import { changePassword, loginUser, logoutUser, refreshAccessToken, registerUser, updateAccountDetails, updatePfp } from "../controllers/user.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

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


export default router;