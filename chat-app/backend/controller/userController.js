const User = require("../model/User");
const generateToken = require("../utils");
const { registerSchema, loginSchema } = require("../validate")
const bcrypt = require('bcryptjs');


const registerUser=async(req,res)=>{
    try{
        const {username,email,password}=registerSchema.parse(req.body)
        const userExist=await User.findOne({where:{email}})
        if(userExist){
            return res.status(400).json({
                message:"User already exists"
            })
        }
        
        const salt=await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(password,salt);

        const user=await User.create({username,email,password:hashedPassword});

        if(user){
            res.status(201).json({
                _id:user.id,
                username:user.username,
                email:user.email,
                token:generateToken(user.id)
            })
        }else{
            res.status(400).json({
                message:'Invalid user data'
            })
        }
    }catch(e){
        res.status(400).json({message:e.message})
    }
}

const authUser=async(req,res)=>{
    try {
        const {email,password}=loginSchema.parse(req.body);

        const user=await User.findOne({where:{email}})

        if(user && (await bcrypt.compare(password,user.password))){
            res.json({
                _id:user.id,
                username:user.username,
                email:user.email,
                token:generateToken(user.id),
                message:"Successfully Logged In"
            })
        }else{
            res.status(401).json({
                message:"Invalid username or password"
            })
        }

    } catch (e) {
        res.status(400).json({message:e.message})
    }
}

module.exports={registerUser,authUser}