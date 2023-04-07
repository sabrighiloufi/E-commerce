const jwt = require("jsonwebtoken")
const clientModel = require("../models/client_model")
const JWT_SECRET = process.env.JWT_SECRET

const verifyTokenClient = (req, res, next)=>{
    const token = req.headers.authorization
    if(token){
        jwt.verify(token, JWT_SECRET,  (err, payload)=>{
            if(err){
                res.status(403).json({message: "token is not valid"})
            }else{
                
                 clientModel.findById(payload.id, (err, item)=>{
                     
                        console.log(item)    
                        if(item && item.itemtype == "clients"){
                            req.user = payload
                            next()
                        }else{
                            res.status(401).json({message: "you are not client"}) 
                        }           
                        
                       
                })
                //console.log(client)
                
            }
        })
    }else{
        res.status(401).json({message: "you are not authenticated"})
    }
}

module.exports = verifyTokenClient
