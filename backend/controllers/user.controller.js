import {PrismaClient} from "@prisma/client"
import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const prisma=new PrismaClient();


const registerUser = asyncHandler(async(req,res) => {
    const {name, username, email, password, number} = req.body;

    if(
        [name, username, email, password, number].some((field) => field?.trim() === "")
    ){
        throw new ApiError(400, "All fields are required")
    }

    const existedUserUsername = await prisma.user.findUnique({
        where:{
            username: username 
        }
    })
    if(existedUserUsername){
        throw new ApiError(409, "user with username already exists")
    }
    const existedUserEmail = await prisma.user.findUnique({
        where:{ 
                email: email 
        }
    })
    if(existedUserEmail){
        throw new ApiError(409, "user with email already exists")
    }
    const existedUserNumber = await prisma.user.findUnique({
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


    const user = await prisma.user.create({
        data:{
            name: name,
            username: username.toLowerCase(),
            email: email,
            password: password,
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

export {
    registerUser
}