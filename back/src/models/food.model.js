const mongoose=require('mongoose')
const foodSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true

    },
    video:
    {
        type:String,
        required:true
    },
    description:{
        type:String,

    },
    foodPartner:{
        type:mongoose.Schema.Types.ObjectId,
           //ye maine kiya hai
        ref:"foodpartner"
    },
    comment:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"comment"

    }],
    Likes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }]
    
},
{
    timestamps: true, // 🔥 IMPORTANT (createdAt, updatedAt)
  }

)
const foodModel=mongoose.model("food",foodSchema)
module.exports=foodModel




//frontend install from                 npm create vite@latest .