const express=require('express');
const foodPartnerController=require("../controllers/food-partner.controller");
const foodController=require("../controllers/food.controller")
const authMiddleware=require("../middlewares/auth.middleware")
const multer=require('multer')

const upload=multer({
    storage:multer.memoryStorage(),
})
const router=express.Router()
router.get("/alldishwithrestaurant",authMiddleware.authFoodPartnerMiddleware,foodController.allrestaurantwithdish)
router.get("/dish/:id",authMiddleware.authUserMiddleware,foodController.getintopartnerdish)
router.post("/createrestaurantdish",authMiddleware.authFoodPartnerMiddleware,upload.single('image'),foodController.createrestaurantdish)
router.get("/:id",
    authMiddleware.authUserMiddleware,
    foodPartnerController.getFoodPartnerById)
//router.get("api/order/:id",authMiddleware.authFoodPartnerMiddleware,foodController.getRestaurantOrders)
router.get("/edit/dish/:id",authMiddleware.authFoodPartnerMiddleware,foodController.editdish)

module.exports=router