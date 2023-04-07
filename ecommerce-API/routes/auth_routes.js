const express = require("express")

const route = express.Router()

const authController = require("../controllers/auth_controller")

route.post("/login", authController.login)
route.get("/verify-now/:verificationcode", authController.VerifyEmail)
route.get("/forget-password", authController.ForgetPassword)
route.get("/reset-password/:resetPasswordToken", authController.resetPassword)
route.post("/refreshToken", authController.refreshToken)
route.post("/logout", authController.logout)



module.exports = route