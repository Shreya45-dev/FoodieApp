const mongoose=require('mongoose')
const foodrestaurantSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true

    },
    image:
    {
        type:String,
        //required:true
    },
    description:{
        type:String,

    },
    cost:{
        type:Number
    },
    foodPartner:{
        type:mongoose.Schema.Types.ObjectId,
           //ye maine kiya hai
        ref:"foodpartner"
    }
}

)
const foodrestaurantModel=mongoose.model("restaurantwithdish",foodrestaurantSchema)
module.exports=foodrestaurantModel