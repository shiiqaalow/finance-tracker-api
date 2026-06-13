import jwt from "jsonwebtoken"
import { User } from "../models/user.js"

export const protect = async (req,res,next) => {
    try {
        // check if the user has signed in with token
        const token = req.headers.authorization?.split(' ')[1]
        if(!token){
            return res.status(401).json({ message: 'No token provided' })
        }
        // verify if the user has provided token
        const decode = jwt.verify(token,process.env.JWT_SECRET)
        console.log("Decode =>",decode)
        // find the user to get all info
        req.user = await User.findById(decode.user_id).select('-password')
        console.log('P.user =>',req.user)
        next()

    } catch (error) {
        next(error)
    }
}