import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from 'jsonwebtoken'
import { ApiError } from "../utils/ApiError.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient(); 

export const verifyJWT = asyncHandler(async(req, res, next) => {
    try {
        
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")

        if(!token){
            throw new ApiError(401, "Unauthorized request")
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        const user = await prisma.user.findFirst({
            where:{
                id: decodedToken.id
            }
        })

        if(!user){
            throw new ApiError(401, "Invalid access token")
        }

        req.user = user;
        next();

    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token")
    }
})