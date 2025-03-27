import { asyncHandler } from "../utils/asyncHandler.js";
import { PrismaClient } from "@prisma/client";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import jwt from 'jsonwebtoken'
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const prisma = new PrismaClient();

const createNewPost = asyncHandler(async(req,res)=>{

    const {caption} = req.body

    const token = req.cookies?.accessToken

    if(!token){
        throw new ApiError(404, "User not found")
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

    const userId = decodedToken.id;

    if(!userId){
        throw new ApiError(404, "User not found")
    }

    const mediaLocalPath = req.files?.media?.[0]?.path;

    console.log(mediaLocalPath)

    // if(!mediaLocalPath){
    //     throw new ApiError(400, "file not uploaded")
    // }

    let media = ""

    if(mediaLocalPath){
        media = await uploadOnCloudinary(mediaLocalPath)

        if(!media){
            throw new ApiError(400, "error uploading on cloudinary")
        }
    }

    const newPost = await prisma.post.create({
        data:{
            authorId : userId,
            caption: caption,
            mediaUrl: media.url,
            userId:userId
        }
    })

    if(!newPost){
        throw new ApiError(400, "error occured while creating new post")
    }

    console.log(newPost);

    return res
    .status(201)
    .json(new ApiResponse(201, newPost, "Post created succesfully"))
    
})

const getPosts = asyncHandler(async(req, res) => {

    const posts = await prisma.post.findMany({
        where:{
            authorId: req.user.id
        }
    })

    console.log(posts)

    res.send(posts)
})

const fetchUserPosts = asyncHandler(async(req, res) => {

    const { userId } = req.params;

    const posts = await prisma.post.findMany({
        where:{
            authorId:userId
        },
    })

    if (!posts) {
        return res.status(404).json({ message: "Posts not found" });
      }
  
    console.log("posts: ",posts)

    res.send(posts)
})
// const getPost = asyncHandler(async(req,res){

// }) 

const deletePost = asyncHandler(async(req,res) => {
    
    const {postid}=req.body;

    try{
        await prisma.post.delete({
            where:{
                id:postid
            }
        })
        res.send({
            status:200,
            message:"Post deleted successfully"
        })
    }
    catch(err){
        res.send({
            status:400,
            message:err.message
        })
    }
})

export {
    createNewPost,
    getPosts,
    fetchUserPosts,
    deletePost
}