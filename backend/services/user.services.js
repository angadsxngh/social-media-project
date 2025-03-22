import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

const findUserByEmailOrUsername = async (email, username) => {
    return await prisma.user.findFirst({
        where: {
            OR: [
                { email: email},
                { username: username}
            ]
        }
    });
};

const validatePassword = async (enteredPassword, storedPassword) => {
    return await bcrypt.compare(enteredPassword, storedPassword);
};

const generateAccessToken = async(user) => {
    return jwt.sign(
        {
            id: user.id,
            email: user.email,
            username: user.username,
            name: user.name
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

const generateRefreshToken = async(user) => {
    return jwt.sign(
        {
            id: user.id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export {
    findUserByEmailOrUsername,
    validatePassword,
    generateAccessToken,
    generateRefreshToken
}