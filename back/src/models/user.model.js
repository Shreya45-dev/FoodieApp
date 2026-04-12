const mongoose=require('mongoose')
const userSchema=new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        
        type:String
    },
    phonenumber:{
        type:Number,
        required :true
    },
     comment:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"comment"
    }]
},

    {
        timestamps:true
    })
    const userModel=mongoose.model("user",userSchema);
    module.exports=userModel;