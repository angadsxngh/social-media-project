import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser';
import { PrismaClient } from '@prisma/client';
import userRouter from './routes/user.routes.js';
// import postRouter from './routes/post.routes.js'
import cookieParser from 'cookie-parser';

const app = express();
const PORT=process.env.PORT || 3000;
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
    console.log("server running on port ",PORT);
})

app.use('/api/v1/users', userRouter)

export {app}