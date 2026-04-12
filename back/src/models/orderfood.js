const mongoose=require('mongoose');

const orderfoodSchema=new mongoose.Schema({
     items: [
    {
      foodId: { type: mongoose.Schema.Types.ObjectId, ref: "restaurantwithdish" },
      qty: Number,
      cost:Number,
    }
  ],
  customerName: {
    type:mongoose.Schema.Types.ObjectId, ref:"user" 
  },
  foodpartner: {   // 🔥 add this
    type: mongoose.Schema.Types.ObjectId,
    ref: "foodpartner"
  },
  address: String,
  total: Number,
  status: {
      type: String,
      enum: ["placed", "preparing", "delivered"],
      default: "placed",
    },
  },
  {
    timestamps: true, // 🔥 IMPORTANT (createdAt, updatedAt)
  }
);

const orderfoodModel=mongoose.model("orderfood",orderfoodSchema)
module.exports=orderfoodModel