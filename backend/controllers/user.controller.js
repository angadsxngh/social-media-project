import {PrismaClient} from "@prisma/client"
import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { findUserByEmailOrUsername, generateAccessToken, generateRefreshToken, validatePassword } from "../services/user.services.js";
import { generateToken } from "../utils/jwt.utils.js";
import { hash } from "bcryptjs";
import bcrypt from "bcryptjs";
import { error } from "console";

const prisma=new PrismaClient();

const registerUser = asyncHandler(async(req,res) => {
    const {name, username, email, password, number} = req.body;

    if(
        [name, username, email, password, number].some((field) => field?.trim() === "")
    ){
        throw new ApiError(400, "All fields are required")
    }

    const existedUserUsername = await prisma.user.findFirst({
        where:{
            username: username 
        }
    })
    console.log("user",existedUserUsername)
    console.log("username:",req.body.username);
    
    if(existedUserUsername){
        throw new ApiError(409, "user with username already exists")
    }
    const existedUserEmail = await prisma.user.findFirst({
        where:{ 
                email: email 
        }
    })
    if(existedUserEmail){
        throw new ApiError(409, "user with email already exists")
    }
    const existedUserNumber = await prisma.user.findFirst({
        where:{
                number: number
        }
    })
    if(existedUserNumber){
        throw new ApiError(409, "user with number already exists")
    }

    const pfpLocalPath = req.files?.pfp[0]?.path;


    // console.log(pfpLocalPath);
    if(!pfpLocalPath){
        throw new ApiError(400, "file not uploaded")
    }
    
    const pfp = await uploadOnCloudinary(pfpLocalPath)
    if(!pfp){
       throw new ApiError(400, "error uploading profile picture on cloudinary")
    }    

    const hashedPassword = await bcrypt.hash(password, 10);


    const user = await prisma.user.create({
        data:{
            name: name,
            username: username.toLowerCase(),
            email: email,
            password: hashedPassword,
            number: number,
            pfp: pfp.url,    
        }
    })


    const createdUser = await prisma.user.findUnique({
        where:{
            username: username
        }
    })

    if(!createdUser){
        throw new ApiError(500, "Error occured while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully")
    )

})

const loginUser = asyncHandler(async(req, res) => {
        const {username, email, password} = req.body;

        if(!(username || email)){
            throw new ApiError(400, "email or username is required")
        }
    
        const user = await findUserByEmailOrUsername(email, username)
    
        if(!user){
            throw new ApiError(404, "user not found")
        }

        if(!password){
            throw new ApiError(400, "password is required")
        }

        const enteredPassword = password
        const userPass = user.password
        
        console.log("entered password",enteredPassword);
        console.log("Hashed password",userPass);
    
        const isPasswordValid =await  bcrypt.compare(enteredPassword, userPass);
    
        if(!isPasswordValid){
            throw new ApiError(401, "invalid credentials")
        }

        const accessToken = await generateAccessToken(user)
        const refreshToken = await generateRefreshToken(user)

        const options = {
            httpOnly: true,
            secure: true,
        }
    
        console.log(user);
    
        return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: user, accessToken, refreshToken
                },
                "User logged in successfully"
            )
        )
    
})

export {
    registerUser,
    loginUser
}