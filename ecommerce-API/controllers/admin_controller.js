const adminModel = require("../models/admin_model")

const {randomBytes} = require("crypto")

const mailController = require("./mail_controller")

const DOMAIN = process.env.DOMAIN

 

const create =async (req, res)=>{
    if(req.file){
        req.body.image = req.file.filename
    }

    const email =await adminModel.findOne({email: req.body.email})
    if(email){
        res.status(406).json({message: "email exists"})
    }else{
        const admin = new adminModel({...req.body, verificationCode: randomBytes(6).toString("hex")})
        admin.save(req.body, (err, item)=>{
            if(err){
                res.status(406).json({message: "admin not created " + err})
            }else{
                mailController(admin.email, "Welcome " + admin.firstName, 
            `<h2>Hello ${admin.firstName +" "+ admin.lastName}! </h2>
            <p>We're glad to have you on board at ${admin.email}. </p>
            <p>We're glad to have you on board at My app</p>
            <table class="action" align="center" width="100%" cellpadding="0" cellspacing="0" role="presentation" style="box-sizing: border-box; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'; position: relative; -premailer-cellpadding: 0; -premailer-cellspacing: 0; -premailer-width: 100%; margin: 30px auto; padding: 0; text-align: center; width: 100%;">
            <tr>
            <td style="box-sizing: border-box; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'; position: relative;">
            <a align="center" href="${DOMAIN}/auth/verify-now/${admin.verificationCode}" class="button button-primary" target="_blank" rel="noopener" style="box-sizing: border-box; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'; position: relative; -webkit-text-size-adjust: none; border-radius: 4px; color: #fff; display: inline-block; overflow: hidden; text-decoration: none; background-color: #2d3748; border-bottom: 8px solid #2d3748; border-left: 18px solid #2d3748; border-right: 18px solid #2d3748; border-top: 8px solid #2d3748;">Click here to Verify your account</a>
            </td>
            </tr>
            </table>`,
            [{
               filename: req.file.filename,
                 path: "./storages/" + req.file.filename,
                cid: "test"
            }]
            )
                
                res.status(201).json({message : "admin created successfully", data: item})
            }
        })
    }
}

const getAll = (req, res)=>{
    adminModel.find({}, (err, items)=>{
        if(err){
            res.status(406).json({message: "no admin found"})
        }else{
            res.status(201).json({message: "list of admins", data:items})
        }
    })
}

const getByID = (req, res)=>{
    adminModel.findById(req.params.id, (err, item)=>{
        if(err){
            res.status(406).json({message: "no admin found"})
        }else{
            res.status(201).json({message: "admin founded", data:item})
        } 
    })
}

const getByQuery =async (req, res)=>{
    let {q} = req.query 
    let admins =await adminModel.find({
        $or:[
            {firstName: {$regex: q, $options:"i"}}
        ]
    })
    res.status(201).json(admins)
}

const update = (req, res)=>{
    if(req.file){
        req.body.image =req.file.filename
    }
    adminModel.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, item)=>{
        if(err){
            res.status(406).json({message: "admin not updated"})
        }else{
            res.status(201).json({message: "admin updated", data:item})
        }
    })
}

const deleteAdmin = (req, res)=>{
    adminModel.findByIdAndRemove(req.params.id, (err)=>{
        if(err){
            res.status(406).json({message: "admin not deleted"})
        }else{
            res.status(201).json({message: "admin deleted"})
        }
    })
}



module.exports = {create, getAll, getByID, getByQuery, update, deleteAdmin}