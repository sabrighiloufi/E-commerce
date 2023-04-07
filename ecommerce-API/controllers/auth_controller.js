const userModel = require("../models/user_model")

const bcrypt = require("bcrypt")

const mailController = require("./mail_controller")

const DOMAIN = process.env.DOMAIN

const jwt = require("jsonwebtoken")

const {join} = require("path")

const JWT_SECRET = process.env.JWT_SECRET

const RT_SECRET = process.env.RT_SECRET
//generate access token
const generateAccessToken = function(user){
    return jwt.sign({id:user._id, email:user.email}, JWT_SECRET, {expiresIn: "24h"})
}

//generate refresh token
const generateRefreshToken = function(user){
    return jwt.sign({id:user._id, email: user.email}, RT_SECRET, {expiresIn: "48h"})
}


let refreshTokens = [] 


 
module.exports = {

    login:async (req,res)=>{
      
        userModel.findOne({email:req.body.email}).populate({path:"orders"}).exec(function (err, user) {
        if (err) {
          res.status(406).json({ status: 406, message: "error login", data: null });
        } else {
          if (user) {
            if (user.verified === false) {
            res.status(406).json({message: "please verify your account"})
           } else {
          if (bcrypt.compare(req.body.password, user.password)) {
            const accessToken = generateAccessToken(user);
            const refreshToken = generateRefreshToken(user);
            refreshTokens.push(refreshToken);
            res.status(200).json({status: 200, message: "user found", data:user,accessToken,refreshToken});
          } else {
            res.status(404).json({status: 406, message: "password incorrect", data: null});
          }
        }
          }  else {
            res.status(406).json({ status: 406, message: " email is not found", data: null });
          }
        }
      });
    },

    refreshToken: function(req, res){
        const refreshToken = req.body.token

        if(!refreshToken) return res.status(401).json({message: "you are not authenticated!" })

        if(!refreshTokens.includes(refreshToken)){
            return res.status(401).json({message: "refresh token is not valid!"})
        }

        jwt.verify(refreshToken, RT_SECRET, function(err, user){

            err && console.log(err)

            refreshTokens = refreshTokens.filter((token) => token !== refreshToken)

            const newAccessToken = generateAccessToken(user)

            const newrefreshToken = generateRefreshToken(user)

            refreshTokens.push(newrefreshToken)

            res.status(200).json({accessToken: newAccessToken, refreshToken: newrefreshToken})
        })
    },

    logout: (req, res)=>{
       const refreshToken = req.body.token

       refreshTokens = refreshTokens.filter((token) => token !== refreshToken)

       res.status(200).json({message: "your are logged out"})
    },
    VerifyEmail: async (req, res)=>{
        try {
            const user = await userModel.findOne({verificationCode: req.params.verificationcode})
            user.verified = true
            user.verificationCode = undefined
            user.save()
            res.sendFile(join(__dirname, "../verification_templates/success.html"))
        } catch (error) {
            res.sendFile(join(__dirname, "../verification_templates/error.html"))
        }

    },
    ForgetPassword: async (req, res)=>{
      const user = await userModel.findOne({email: req.body.email})
      if(!user){
        return res.status(404).json({message: "email not found"})
      }
      const resetPasswordToken = generateAccessToken(user)
      user.resetPasswordToken = resetPasswordToken
      user.save()
      mailController(user.email,
        "Reset Password ", 
       `<h2>Hello ${user.firstName +" "+ user.lastName}! </h2>
       <p>click here to reset your password: </p>
       <table class="action" align="center" width="100%" cellpadding="0" cellspacing="0" role="presentation" style="box-sizing: border-box; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'; position: relative; -premailer-cellpadding: 0; -premailer-cellspacing: 0; -premailer-width: 100%; margin: 30px auto; padding: 0; text-align: center; width: 100%;">
       <tr>
       <td style="box-sizing: border-box; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'; position: relative;">
       <a align="center" href="${DOMAIN}/reset-password/${resetPasswordToken}" class="button button-primary" target="_blank" rel="noopener" style="box-sizing: border-box; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'; position: relative; -webkit-text-size-adjust: none; border-radius: 4px; color: #fff; display: inline-block; overflow: hidden; text-decoration: none; background-color: #2d3748; border-bottom: 8px solid #2d3748; border-left: 18px solid #2d3748; border-right: 18px solid #2d3748; border-top: 8px solid #2d3748;">Reset Password</a>
       </td>
       </tr>
       </table>`
      )
      res.status(200).json({message: "email reset password sended"})
    },
    
    resetPassword: async (req, res)=>{
      try {
        jwt.verify(req.params.resetPasswordToken, JWT_SECRET, async (err)=>{
          if(err){
            return res.status(404).json({message: "token is expired"})
          }
          const user = await userModel.findOne({resetPasswordToken : req.params.resetPasswordToken})
          user.password = req.body.password
          user.resetPasswordToken = undefined
          user.save()
          res.status(200).json({message: "password updated successfully"})
        })
        
      } catch (error) {
         res.status(406).json({message: error})
      }
    }

}