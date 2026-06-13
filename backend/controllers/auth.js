import { User } from "../models/user.js"
import { generateToken } from "../utils/generateToken.js"
// register new user
export const signup = async (req,res,next) => {
    let { name,email,password,role,profilePicture } = req.body
    try {
        // return all emails to lowercase(filtered)
        email = email.toLowerCase()
        // check if the user is already registered
        const existing_user = await User.findOne({email})
        if(existing_user) {
            return res.status(404).json({ message: `Email ( ${email} ) already registered.` })
        }
        // create new user if not register
        const user = await User.create({ name,email,password,role,profilePicture })
        // generate token ( cant login without it ) for the new user 
        const token = generateToken(user._id)
        res.status(201).json({ message: 'user successfully registered.',user: user,signup_token: token })

    } catch (error) {
        next(error)
    }
} 
// login user
export const signin = async (req,res,next) => {
    let { email,password } = req.body
    try {
        email = email.toLowerCase()
        // check the user's data weather is registered or not
        const user = await User.findOne({email})
        if(!user || !(await user.comparePassword(password)) ) {
            return res.status(404).json({ message: 'Invalid Email or Password.' })
        }
        // generate token ( cant login without it ) for the new user 
        const token = generateToken(user._id)
        res.status(201).json({ message: 'user successfully signed in.',user: user,signin_token: token })
    } catch (error) {
        next(error)
    }
}