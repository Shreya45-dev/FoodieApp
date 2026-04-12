const userModel=require("../models/user.model")
const foodPartnerModel=require("../models/foodpartner.model")
const bcrypt=require('bcryptjs');
const commentModel=require('../models/comment.model')
const foodModel=require('../models/food.model')
const jwt=require('jsonwebtoken')
async function registerUser(req,res){
    const {fullName,email,password,phonenumber}=req.body
    const isUserAlreadyExist=await userModel.findOne({
        email
    })
    if(isUserAlreadyExist){
        return res.status(400).json({
            message:"User already exists"
        })
    }
    const hashedPassword=await bcrypt.hash(password,10);
    const user=await userModel.create({
        fullName,
        email,
        password:hashedPassword,
        phonenumber
    })

    const token=jwt.sign({
        id:user._id,
    },process.env.JWT_SECRET)   
                                                              
    res.cookie("token",token)
    res.status(201).json({
        message:"User registered successfully",
        user:{
            _id:user._id,
            email:user.email,
            fullName:user.fullName
        }
    })

}
async function loginUser(req,res){
    const{email,password}=req.body;
    const user=await userModel.findOne({
        email})
    
        if(!user){
            return res.status(400).json({
                message:"Invalid email or password"
            })
        }

        const isPasswordValid=await bcrypt.compare(password,user.password)
        if(!isPasswordValid){
            return res.status(400).json({
                message:"Invalid email or password"
            })
        }

        const token=jwt.sign({
            id:user._id,
        },process.env.JWT_SECRET)
        res.cookie("token",token)
        res.status(200).json({
            message:"User logged in successfully",
            user:{
                _id:user._id,
                email:user.email,
                fullName:user.fullName
            },
            token:token

        })
    }


function logoutUser(req,res){
res.clearCookie("token");
res.status(200).json({
    message:"User logged out successfully"
})}


async function registerFoodPartner(req,res){
    const {name,email,password,restaurantName,Address,City}=req.body;
    const isAccountAlreadyExists=await foodPartnerModel.findOne({
        email
    })
    if(isAccountAlreadyExists){
        return res.status(400).json({
            message:"Food partner account already exists"
        })
    }
    const hashedPassword=await bcrypt.hash(password,10);
    const foodPartner=await foodPartnerModel.create({
        name,
        email,
        password:hashedPassword,
        restaurantName,
        Address,
        City
    })
    const token=jwt.sign({
        id:foodPartner._id,
    },process.env.JWT_SECRET)
    res.cookie("token",token)

    res.status(201).json({
        message:"Food partner registered successfully",
        foodPartner:{
            _id:foodPartner._id,
            email:foodPartner.email,
            name:foodPartner.name
        }
    })

}

async function loginFoodPartner(req,res){
    const{email,password}=req.body
    const foodPartner=await foodPartnerModel.findOne({
        email
    })
    if(!foodPartner){
        return res.status(400).json({
            message:"Invalid email or password"
        })
    }
    if(foodPartner){
     const isPasswordValid=await bcrypt.compare(password,foodPartner.password)
        if(!isPasswordValid){
            return res.status(400).json({
                message:"Invalid email or password"
            })
        }

        const token=jwt.sign({
            id:foodPartner._id,
        },process.env.JWT_SECRET)
        res.cookie("token",token)
        res.status(200).json({
            message:"foodpartner  logged in successfully",
            user:{
                _id:foodPartner._id,
                email:foodPartner.email,
                fullName:foodPartner.fullName
            }
        })
    }}
    function logoutFoodPartner(req,res){
res.clearCookie("token");
res.status(200).json({
    message:"food Partner User logged out successfully"
})}



const commentcreate=async(req,res)=>{
   
    const comment=await commentModel.create({
        text:req.body.text,
        authorId:req.user._id,
        ShortId:req.params.id
        

    })
    const food=await foodModel.findById(req.params.id)
    food.comment.push(comment._id)
    await food.save()
    return res.status(400).json({
        message:"comment created",
        comment
    })

}
 
const commentshow=async(req,res)=>{
    const comment=await commentModel.find({ShortId:req.params.id}).populate('authorId')

    return res.status(201).json({
        message:"get successfully",
        comment
    })
    

}




module.exports={registerUser,loginUser,logoutUser,registerFoodPartner,loginFoodPartner,logoutFoodPartner,commentcreate,commentshow}