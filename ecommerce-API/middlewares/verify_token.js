const jwt = require("jsonwebtoken")

const JWT_SECRET = process.env.JWT_SECRET

const verifyToken = (req, res, next)=>{
    const token = req.headers.authorization
    if(token){
        jwt.verify(token, JWT_SECRET, (err, payload)=>{
            if(err){
                res.status(403).json({message: "token is not valid"})
            }else{
                req.user = payload
                next()
            }
        })
    }else{
        res.status(401).json({message: "you are not authenticated"})
    }
}

module.exports = verifyToken
