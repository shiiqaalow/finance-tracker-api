import mongoose from "mongoose";
<<<<<<< HEAD
import bcrypt from 'bcryptjs'
// USER TABLE
const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
    role:{
        type: String,
        enum: ['admin','user'],
        default: 'user'
    },
    profilePicture: String,  
},{timestamps: true})

// HASH PASSWORD
userSchema.pre('save', async function(next) {
    if(!this.isModified('password')){
        return next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password,salt)
} )

// compare password DB and userInputs
userSchema.methods.comparePassword = function(inputPassword) {
    return bcrypt.compare(inputPassword,this.password)
}

export const User = mongoose.model('User',userSchema)
=======

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
>>>>>>> 1800e6af55e1c877a72e3e0b52621ae4d57c9875
