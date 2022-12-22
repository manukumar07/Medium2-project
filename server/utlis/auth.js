import jwt from "jsonwebtoken";
const  auth = ( req,res,next) => {
    const authHeader  = req.headers.authorizaton.split(' ')[1];
    try {
        jwt.verify(authHeader,process.env.SECRET)
        next();
    } catch (error) {
        return res.status(401).json({errors :[{msg:error.message}]})
    }
    
}

export default auth