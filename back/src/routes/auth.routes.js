const express=require('express')
const authController=require("../controllers/auth.controller")
const middleware=require("../middlewares/auth.middleware")
const router=express.Router();
router.post('/user/register',authController.registerUser)
router.post('/user/login',authController.loginUser)
router.get('/user/logout',authController.logoutUser)

router.post('/food-partner/register',authController.registerFoodPartner)
router.post('/food-partner/login',authController.loginFoodPartner)
router.get('/food-partner/logout',authController.logoutFoodPartner)

router.post('/commentcreate/:id',middleware.authUserMiddleware,authController.commentcreate)
router.get('/commentshow/:id',middleware.authUserMiddleware,authController.commentshow)
module.exports=router

