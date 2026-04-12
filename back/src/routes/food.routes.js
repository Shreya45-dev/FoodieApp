const express=require('express')
const foodController=require("../controllers/food.controller")
const authMiddleware=require("../middlewares/auth.middleware")
const router=express.Router();
const multer=require('multer')

const upload=multer({
    storage:multer.memoryStorage(),
})
// Post /api/food/[protected]
router.post('/',authMiddleware.authFoodPartnerMiddleware,upload.single("video"),foodController.createFood)

// GET /api/food/[protected]
router.get("/",authMiddleware.authUserMiddleware,foodController.getFoodItems)

router.post("/orderfood",authMiddleware.authUserMiddleware,foodController.orderfood)
router.get("/getorderfood",authMiddleware.authUserMiddleware,foodController.getorderfood)
router.get("/latestorder",authMiddleware.authUserMiddleware,foodController.orderfoodbyuser)
router.get("/samedish/:name",authMiddleware.authUserMiddleware,foodController.samedish)
router.post("/Like/:id",authMiddleware.authUserMiddleware,foodController.like)
router.get(
  "/restaurant-orders/:id",
  authMiddleware.authFoodPartnerMiddleware, // ✅ only food partner
  foodController.getRestaurantOrders
)


router.put("/api/order/:id",authMiddleware.authFoodPartnerMiddleware,foodController.updateOrderStatus)
//for frontend
// react works with npm run dev   
//npm i react-router-dom
module.exports=router