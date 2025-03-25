import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser';
import { PrismaClient } from '@prisma/client';
import userRouter from './routes/user.routes.js';
// import postRouter from './routes/post.routes.js'
import cookieParser from 'cookie-parser';

const app = express();

const prisma=new PrismaClient();

app.use(cors({
    origin: "*",
    credentials:true
}))
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: '16kb'}))
app.use(express.static('public'))
app.use(cookieParser())
app.use(bodyParser.json())

app.listen(3000, ()=> {
    console.log("server running on port 3000");
})

app.use('/api/v1/users', userRouter)
// app.use('api/v1/posts', postRouter)

export {app}