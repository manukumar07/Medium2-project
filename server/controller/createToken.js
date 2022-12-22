import jwt from "jsonwebtoken";

export const createToken = (user) =>
{
    return jwt.sign({ user }, process.env.SECRET ,{expiresIn:"7d"}) 
}