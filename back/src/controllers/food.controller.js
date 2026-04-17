const foodModel=require('../models/food.model')
const orderfoodmodel=require("../models/orderfood")
const restaurantmodel=require('../models/restaurantwithdish')
const userModel=require('../models/user.model')
const foodPartnerModel=require('../models/foodpartner.model')
const storageService=require('../services/storage.service')
const{ v4:uuid}=require("uuid")              // npm i uuid=>this not work so install => npm install uuid@7
async function createFood(req,res){
    // console.log(req.foodPartner._id)
    //console.log(req.body)            //give only now name and description not file
   // console.log(req.file)
    const fileUploadResult=await storageService.uploadFile(req.file.buffer,uuid())
  
    console.log(fileUploadResult)

  const foodItem=await foodModel.create({
    name:req.body.name,
    description:req.body.description,
    video:fileUploadResult.url,
    foodPartner:req.foodPartner._id   
  })
     res.status(201).json({
        message:"food created successfully",
        food:foodItem
     })
  
    


           ///cloud storage provider imagekit

}
async function getFoodItems(req,res){
  console.log("req.user")
 const Video=await foodModel.find({}).populate('foodPartner').sort({createdAt:-1})
 res.status(200).json({
  message:"Food items fetched successfully",
  Video
  
  
 })
}
const delvideo=async(req,res)=>{
  const id=req.params.id;
  const video=await foodModel.findByIdAndDelete(id);
  res.status(200).json({
    message:"video deleted successfully",
    video
  })
  
}
const createrestaurantdish=async(req,res)=>{
  const{name,description,cost}=req.body;
   const fileUploadResult=await storageService.uploadFile(req.file.buffer,uuid())
  
    console.log(fileUploadResult)
  const foodPartnerId=req.foodPartner._id;
  const dish=await restaurantmodel.create({
    name,
    description,
     cost,
    foodPartner: foodPartnerId,
     image:fileUploadResult.url, 
    
})
const foodPartner=await foodPartnerModel.findById(foodPartnerId)
foodPartner.alldishes.push(dish._id)
await foodPartner.save()
res.status(200).json({
  message:"create successfully",
  dish
})}



const allrestaurantwithdish=async(req,res)=>{
  const dish=await  restaurantmodel.find({}).populate("foodPartner").sort({ createdAt: -1 })
  res.status(200).json({
    message:"restaurantwithdish fetched successfully",
    dish
  })

}

const getintopartnerdish=async(req,res)=>{
  const id=req.params.id;
  const dish=await foodPartnerModel.findById({_id:id}).populate('alldishes')
  res.status(200).json({
    message:"dish fetched successfully",
    dish
  })
}
const deldish=async(req,res)=>{
  const id=req.params.id;
  const dish=await restaurantmodel.findByIdAndDelete(id);
  const foodPartner=await foodPartnerModel.findById(dish.foodPartner)
  foodPartner.alldishes.pull(dish._id)
  await foodPartner.save()
  res.status(200).json({
    message:"dish deleted successfully",
    dish
  })
  
}
const representalldish=async(req,res)=>{
  
  const dish=await restaurantmodel.find(req.foodpartner._id).populate(foodPartner).sort({createdAt:-1})
res.status(200).json({
  message:"dish fetched successfully",
  dish

})}


const getorderfood=async(req,res)=>{

   //const user=await userModel.findById(req.user._id)
  const orderss=await orderfoodmodel.find({customerName:req.user._id}).populate('customerName').populate("foodpartner").populate('items.foodId').sort({ createdAt: -1 });   
  return res.status(200).json({
    message:"get successfully",
    orderss
  })
}
const orderfood = async (req, res) => {
  const { items, total, address, foodpartner } = req.body;

  try {
    // 1️⃣ Create order in DB
    const ordercome = await orderfoodmodel.create({
      items,
      total,
      customerName: req.user._id,
      address,
      foodpartner, // 🔥 food partner ID
    })

    // 2️⃣ Emit live order to the food partner room
    if (req.io && foodpartner) {
      req.io.to(foodpartner.toString()).emit("newOrder", ordercome);
      console.log(`New order emitted to food partner: ${foodpartner}`);
    }

    // 3️⃣ Send response
    res.status(200).json({
      message: "Order placed successfully",
      ordercome,
    });
  } catch (err) {
    console.error("Order food error:", err);
    res.status(500).json({ message: err.message });
  }
};


const orderfoodbyuser=async(req,res)=>{
  const orderss=await orderfoodmodel.findOne({customerName:req.user._id}).populate('customerName').populate("foodpartner").populate('items.foodId').sort({ createdAt: -1 });   
  return res.status(200).json({
    message:"get successfully",
    orderss
  })
}

const samedish=async(req,res)=>{
  const givenname=req.params.name
  console.log(givenname)
  const dishes=await restaurantmodel.find({name:req.params.name}).populate('foodPartner')
  return res.status(200).json({
    message:"get successfully",
    dishes
  })
}
const getRestaurantOrders = async (req, res) => {
  const orders = await orderfoodmodel
    .find({ foodpartner: req.foodPartner._id }) // 🔥 only their orders
    .populate("customerName")
    .populate("items.foodId")
    .sort({ createdAt: -1 });

  return res.status(200).json({
    message: "Restaurant orders fetched successfully",
    orders: orders
  });

}


 /* const Post=await post.findById(req.params.id)
    await Post.updateOne({ $addToSet: { Like: req.id } });
    await Post.save()
    let Post =await foodModel.findById(req.params.id)
   if(Post.Likes.indexOf(req.id)===-1){
    Post.Likes.push(req.id)
   }
   else{
    Post.Likes.splice(Post.Likes.indexOf(req.id),1)
   }
  
  await Post.save()
  return res.status(201).json({
    message:"liked",
    Post
  })
 
}*/

const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await orderfoodmodel.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    return res.json({
      message: "Status updated",
      order,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error updating status" });
  }
}
  const like = async (req, res) => {
  try {
    const Post = await foodModel.findById(req.params.id);

    // ❗ Check post exist
    if (!Post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // ❗ Check user
    if ( !req.user._id) {
      return res.status(402).json({ message: "Unauthorized" });
    }

    const userId = req.user._id.toString();

    // ❗ Safe likes array
    const likes = (Post.Likes || []).map(id => id.toString());

    if (!likes.includes(userId)) {
      // Like
      Post.Likes.push(req.user._id);
    } else {
      // Unlike
      Post.Likes = Post.Likes.filter(
        id => id.toString() !== userId
      );
    }

    await Post.save();

    return res.status(200).json({
      message: "Success",
      Post
    });

  } catch (err) {
    console.error("LIKE ERROR:", err);
    return res.status(500).json({ message: err.message });
    }
}

  
  


module.exports={createFood,getFoodItems,createrestaurantdish,allrestaurantwithdish,getintopartnerdish,getintopartnerdish,orderfood,getorderfood,orderfoodbyuser,samedish,like,getRestaurantOrders,updateOrderStatus,delvideo,deldish,representalldish}



