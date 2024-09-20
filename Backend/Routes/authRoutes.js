const express = require("express");
const { login, signUp, forgotPassword, resetPassword, genrateOtpAndSend, verifyOtp } = require("../Controllers/authController");
const userRouter = express.Router()



userRouter.post('/login', login)
userRouter.post('/sendOtp', genrateOtpAndSend)
userRouter.post('/signup', signUp)
userRouter.post('/forgotPassword', forgotPassword)
userRouter.patch('/resetPassword', resetPassword)
userRouter.post('/verifyOTP', verifyOtp)







module.exports = userRouter;
















