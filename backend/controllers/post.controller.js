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
            userId: userId
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

const likePost = asyncHandler(async(req, res) => {

    const userid = req.user.id
    const postid = req.body.postid

    console.log("user id: ", userid)
    console.log("post id: ", postid)

    if(!userid){
        throw new ApiError(400, "User Id is invalid")
    }

    if(!postid){
        throw new ApiError(400, "Post id is invalid")
    }

    try {
        // const user = await prisma.user.findUnique({ where: {id: userId}})
        const post = await prisma.post.findUnique({ where: {id: postid}})
    
        if(!post){
            throw new ApiError(404, "user or post is missing")
        }
    
        const isLiked = post.likes.includes(userid)
    
        if(isLiked){
            //unlike the post
            const update = await prisma.post.update({
                where: {
                    id: postid
                },
                data: {
                    likes: {set: post.likes.filter(id => id !== userid)}
                }
            })
    
            return res.status(200).json({ message: "post unliked succesfully",post:update})
        } else{
            //like the post
            const update=await prisma.post.update({
                where: {
                    id: postid
                },
                data: {
                    likes: {set: [...post.likes, userid]}
                }
            })
            return res.status(200).json( {message: 'post liked succesfully',post:update} )
            // res.send()
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json( {message: "Internal server error"} )
    }
})

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

const getPost = asyncHandler( async(req, res) => {
    const postid = req.params

    const post = await prisma.post.findUnique({
        where:{
            id: postid
        }
    })

    if(!post){
        throw new ApiError(400, "Post is not defined")
    }

    return res
    .status(200)
    .send(post)
})

export {
    createNewPost,
    getPosts,
    fetchUserPosts,
    deletePost,
    likePost,
    getPost,
}