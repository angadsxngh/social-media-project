import {PrismaClient} from "@prisma/client"
import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { findUserByEmailOrUsername, generateAccessToken, generateRefreshToken, validatePassword } from "../services/user.services.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'

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

    const pfpLocalPath = req.files?.pfp?.[0]?.path;


    // console.log(pfpLocalPath);
    // if(!pfpLocalPath){
    //     throw new ApiError(400, "file not uploaded")
    // }

    const pfp = ""
    
    if(pfpLocalPath){
        pfp = await uploadOnCloudinary(pfpLocalPath)
        if(!pfp){
            throw new ApiError(400, "error uploading profile picture on cloudinary")
    }    

    }
    
    const hashedPassword = await bcrypt.hash(password, 10);

    // const tempUser = { id: crypto.randomUUID() }
    // const refreshToken = await generateRefreshToken(tempUser)

    const user = await prisma.user.create({
        data:{
            name: name,
            username: username.toLowerCase(),
            email: email,
            password: hashedPassword,
            number: number,
            pfp: pfp.url,    
            // refreshToken: refreshToken
        }
    })

    console.log(user);
    

    const accessToken = await generateAccessToken(user)
    const refreshToken = await generateRefreshToken(user)
    
    const createdUser = await prisma.user.findUnique({
        where:{
            username: username
        }
    })

    if(!createdUser){
        throw new ApiError(500, "Error occured while registering the user")
    }

    const options = {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        path: "/",
    }

    res
    .cookie("refreshToken", refreshToken, options)
    .cookie("accessToken", accessToken, options)

    return res.send(createdUser)
    
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
    
        const isPasswordValid =await  bcrypt.compare(enteredPassword, userPass);
    
        if(!isPasswordValid){
            throw new ApiError(401, "invalid credentials")
        }

        const accessToken = await generateAccessToken(user)
        console.log("access token: ", accessToken)
        const refreshToken = await generateRefreshToken(user)
        console.log("refresh token: ", refreshToken)

        const options = {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            path: "/",
        }
    
        console.log(user);
    
        res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        
        res.send({
            user: user
        })
    
})

//secured

const findUser = asyncHandler(async(req,res) => {

    const { query } = req.query

    if (!query || query.length < 3) {
        console.log("Search query must be at least 3 characters long")
        return res.status(400).json({ message: "Search query must be at least 3 characters long" });
    }

    if (!query) {
        return res.status(400).json({ message: "Search query is required" });
    }

    try {
        const users = await prisma.user.findMany({
            where: {
                OR: [
                    { name: { contains: query, mode: "insensitive" } },
                    { username: { contains: query, mode: "insensitive" } },
                ],
            },
            select: {
                id: true,
                username: true,
                pfp: true,
            },
        })

        const validUsers = users.filter(user => {
            return (
                user.name?.toLowerCase().includes(query.toLowerCase()) ||
                user.username?.toLowerCase().includes(query.toLowerCase())
            );
        });
    
        return res.json({ users: validUsers })
    } catch (error) {
        return res
        .status(500)
        .json({error})
    }
})

const getUserProfile = asyncHandler(async (req, res) => {
    const { userId } = req.params;
  
    const user = await prisma.user.findUnique({
      where: { 
        id: userId 
    },
      include: {
        posts: true, 
      },
    });
  
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log("user: ",user)
  
    res.send(user);
  });


const logoutUser = asyncHandler(async(req,res) => {

    const options = {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        path: "/",
    }

    res.clearCookie("accessToken", options)
    res.clearCookie("refreshToken", options)

    return res
    .status(200)
    .json(new ApiResponse(200, {}, "User logged out!"))
})

const refreshAccessToken = asyncHandler(async(req,res) => {

    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if(!incomingRefreshToken){
        throw new ApiError(401, "Unauthorized request")
    }

    try {
        
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )

        console.log("decoded token: ",decodedToken);

        const user = await prisma.user.findFirst({
            where:{
                id: decodedToken.id
            }
        })

        console.log("user", user);
        

        if(!user){
            throw new ApiError(401, "Invalid refresh token")
        }

        console.log("Incoming refresh token: ",incomingRefreshToken);
        console.log("user refresh token: ",user.refreshToken);
        

        if(incomingRefreshToken !== user?.refreshToken){
            throw new ApiError(401, "refresh token is expired or used")
        }

        const options = {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            path: "/",
        }

        const accessToken = generateAccessToken(user)
        const newRefreshToken = generateRefreshToken(user)

        return res
        .send(200)
        .cookie("access token", accessToken, options)
        .cookie("refresh token", newRefreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    accessToken, refreshToken: newRefreshToken
                },
                "access token refreshed"
            )
        )

    } catch (error) {
        
        throw new ApiError(401, error?.message || "invalid refresh token")

    }
})

const changePassword = asyncHandler(async(req,res) => {
    
    const {newPassword, oldPassword} = req.body

    const user = await prisma.user.findFirst({
        where:{
            id: req.user?.id
        }
    })

    const isPasswordValid = await bcrypt.compare(oldPassword, user.password)

    if(!isPasswordValid){
        throw new ApiError(401, "Invalid password")
    }

    user.password = await bcrypt.hash(newPassword, 10)

    await prisma.user.update({
        where: { id: user.id },
        data: {password: await bcrypt.hash(newPassword, 10) }
    })

    return res
    .status(200)
    .json(new ApiResponse(200, {}, "password updated succesfully"))
})

const updateAccountDetails = asyncHandler(async (req, res) => {

    const { name } = req.body;

    console.log(req.body)
    console.log("name", name)

    if (!name) {
        throw new ApiError(400, "field cannot be empty");
    }   

    const user = await prisma.user.findFirst({
        where: {
            id: req.user.id
        }
    });

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    await prisma.user.update({
        where: {
            id: user.id
        },
        data: {name: name}
    });

    return res
    .status(200)
    .json(new ApiResponse(200, {}, "Account details updated successfully"))
});

const updatePfp = asyncHandler(async(req,res) => {

    const pfpLocalPath = req.files?.pfp?.[0]?.path;

    if(!pfpLocalPath){
        throw new ApiError(400, "Pfp file is missing")
    }

    const pfp = await uploadOnCloudinary(pfpLocalPath)

    if(!pfp.url){
        throw new ApiError(400, "error while uploading on cloudinary")
    }

    const user = await prisma.user.update({
        where:{
            id: req.user.id
        },
        data:{
            pfp: pfp.url
        }
    })

    return res
    .send()

})

const getUser = asyncHandler(async(req,res) => {
    res.send({
        user:req.user
    })
})

const deleteAccount = asyncHandler(async(req, res) => {

    const {password} = req.body

    const user = await prisma.user.findFirst({
        where:{
            id: req.user.id
        }
    })

    if(!password){
        throw new ApiError(400, "input field cannot be empty")
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if(!isPasswordValid){
        console.log("password is incorrect")
        throw new ApiError(400, "Password is incorrect")
    }

    await prisma.user.delete({
        where:{
            id: req.user.id
        }
    })

    const options = {
        httpOnly: true,
        secure: true
    }

    res
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)

    res.send("Account deleted succefully")
})

export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changePassword,
    updateAccountDetails,
    updatePfp,
    getUser,
    deleteAccount,
    findUser,
    getUserProfile
}