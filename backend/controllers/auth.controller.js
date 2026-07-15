import genToken from "../config/token.js"
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"

export const siqnUp = async (req,res) => {
    try {
        const {userName,email,password} = req.body

        const checkUserByUserName = await User.findOne({userName})
        if(checkUserByUserName){
            return res.status(400).json({message:"userName already exists"})
        }

        const checkUserByEmail = await User.findOne({email})
        if(checkUserByEmail){
            return res.status(400).json({message:"email already exists"})
        }

        if(password.length<6){
            return res.status(400).json({message:"password must be atleast 6 characters"})
        }

        const hasedPassword = await bcrypt.hash(password,10)

        const user = await User.create({
            userName,email,password:hasedPassword
        })

        const token = await genToken(user._id)
        res.cookie("token",token,{
            httpOnly:true,
            maxAge:2*24*60*60*1000,
            sameSite:"None",
            secure:false
        })
        return res.status(201).json(user)

    } catch (error) {
        return res.status(500).json({message:`siqn up error ${error}`})
    }
}

export const checkUserName = async (req, res) => {
    try {
        const { userName } = req.params
        const user = await User.findOne({ userName })
        return res.status(200).json({ exists: !!user })
    } catch (error) {
        return res.status(500).json({ message: `check username error ${error}` })
    }
}

export const siqnIn = async (req,res) =>{
    try {
        const {email,password}= req.body
    
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({message:"user does not exist "})
        }
    
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json({message:"incorrect password"})
        }
    
        const token = await genToken(user._id)
        res.cookie("token",token,{
            httpOnly:true,
            maxAge:2*60*60*1000,
            sameSite:"None",
            secure:false
        })

        return res.status(200).json(user)
    }
    

    catch (error) {
        return res.status(500).json({message:`siqn in error ${error}`})
    }
}

export const logOut = async (req,res) => {
    try {
        res.clearCookie("token")
        return res.status(200).json({message:"log out successfully"})
    }
    catch (error) {
        return res.status(500).json({message:`log out error ${error}`})
    }
}