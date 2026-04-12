const mongoose=require('mongoose')
const commentSchema=new mongoose.Schema({
    text:{
        type:String,
        required:true

    },
    authorId:{
         type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    ShortId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"food"
    }
    
   
})
const commentModel=mongoose.model("comment",commentSchema)
module.exports=commentModel