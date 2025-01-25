import User from "../model/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signup = async(req,res) => {
    const {fullName,email,password} = req.body;
    try {
        if(!fullName || !email || !password){
            return res.status(500).json({success:false,message:"All fields are required"});
        }

        const isEmail = await User.findOne({email});
        if(isEmail){
            return res.status(500).json({success:false,message:'Already account exists,Please Login'});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = new User({
            fullName,
            email,
            password:hashedPassword
        });

        const user = await newUser.save();

        const token = jwt.sign({id:user._id},process.env.JWT_SECRET);
        res.status(201).json({ success:true,token,user:{name:user.fullName}});   
    } catch (error) {
        console.log(error);
        res.json({success:false,message: error.message}); 
    }
}

export const signin = async(req,res) => {
    try {
        const {email,password} = req.body;

        const user = await User.findOne({email});
        if(!user){
            return res.status(500).json({success:false,message:'user doesnt exist,Please Signup first'})
        }

        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(500).json({success:false,message:'Password is incorrect'})
        }else{
            const token = jwt.sign({id:user._id},process.env.JWT_SECRET);
            res.status(201).json({ success:true,token,user:{name:user.fullName}}); 
        }
    } catch (error) {
        console.log(error);
        res.json({success:false,message: error.message});      
    }
}

export const userCredits = async(req,res) => {
    try {
        const {userId} = req.body;
        const user = await User.findById(userId);
        res.json({success:true,credits:user.creditBalance,user:{name:user.fullName}});
    } catch (error) {
        console.log(error);
        res.json({success:false,message: error.message});
    }
}