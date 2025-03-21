import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser';
import { PrismaClient } from '@prisma/client';
import router from './routes/user.router.js';

const app = express();

const prisma=new PrismaClient();

app.use(cors({
    origin: "*"
}))
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: '16kb'}))
app.use(express.static('public'))


app.use(bodyParser.json())

app.listen(3000, ()=> {
    console.log("server running on port 3000");
})

app.use('/api/v1/users', router)

export {app}