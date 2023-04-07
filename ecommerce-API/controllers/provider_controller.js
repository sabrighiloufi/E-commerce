const providerModel = require("../models/provider_model")

const {randomBytes} = require("crypto")

const mailController = require("./mail_controller")

const DOMAIN = process.env.DOMAIN


const create =async (req, res)=>{

    req.body.image = req.file.filename
    const email =await providerModel.findOne({email: req.body.email})
    if(email){
        res.status(406).json({message: "email exist"})
    }else{ 
        const provider = new providerModel({...req.body, verificationCode: randomBytes(6).toString("hex")})
        provider.save(req.body, (err, item)=>{
        if(err){
            res.status(406).json({message: "provider not created"})
        }else{
            mailController(provider.email, "Welcome " + provider.firstName, 
            `<h2>Hello ${provider.firstName +" "+ provider.lastName}! </h2>
            <p>We're glad to have you on board at ${provider.email}. </p>
            <p>We're glad to have you on board at My app</p>
            <table class="action" align="center" width="100%" cellpadding="0" cellspacing="0" role="presentation" style="box-sizing: border-box; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'; position: relative; -premailer-cellpadding: 0; -premailer-cellspacing: 0; -premailer-width: 100%; margin: 30px auto; padding: 0; text-align: center; width: 100%;">
            <tr>
            <td style="box-sizing: border-box; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'; position: relative;">
            <a align="center" href="${DOMAIN}/auth/verify-now/${provider.verificationCode}" class="button button-primary" target="_blank" rel="noopener" style="box-sizing: border-box; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'; position: relative; -webkit-text-size-adjust: none; border-radius: 4px; color: #fff; display: inline-block; overflow: hidden; text-decoration: none; background-color: #2d3748; border-bottom: 8px solid #2d3748; border-left: 18px solid #2d3748; border-right: 18px solid #2d3748; border-top: 8px solid #2d3748;">Click here to Verify your account</a>
            </td>
            </tr>
            </table>`,
            [{
                filename: req.file.filename,
                path: "./storages/" + req.file.filename,
                cid: "test"
            }]
            )
            res.status(201).json({message: "provider created", data: item})
        }
    })
    }
}

const getAll = (req, res)=>{
    providerModel.find({}, (err, items)=>{
        if(err){
            res.status(406).json({message: "no provider found"})
        }else{
            res.status(201).json({message: "list of providers", data: items})
        }
    })
}

const getByID = (req, res)=>{
    providerModel.findById(req.params.id, (err, item)=>{
        if(err){
            res.status(406).json({message: "no provider found"})
        }else{
            res.status(201).json({message: "provider founded", data: item})
        }

    })
}

const getByQuery =async (req, res)=>{
    let {q} = req.query 
    let providers =await providerModel.find({
        $or:[
            {firstName: {$regex: q, $options: "i"}}
        ]
    })
    res.status(201).json(providers)
}


const update = (req, res)=>{
    const user = req.params.id 
    const image = user.image
    req.body.image = !req.file ? image : req.file.filename

    providerModel.findByIdAndUpdate(req.params.id, req.body,{new:true}, (err, item)=>{
        if(err){
            res.status(406).json({message: "provider not updated"})
        }else{
            res.status(201).json({message: "provider updated", data: item})
        }
    })

}

const deleteProvider = (req, res)=>{
    providerModel.findByIdAndRemove(req.params.id, (err)=>{
        if(err){
            res.status(406).json({message: "provider not deleted"})
        }else{
            res.status(201).json({message: "provider deleted"})
        }
    })
}

const deleteAll = (req, res)=>{
    providerModel.deleteMany((err)=>{
        if(err){
            res.status(406).json({message: "providers not deleted"})
        }else{
            res.status(200).json({message: "providers deleted"})
        }
    })
}



module.exports = {create, getAll, getByID, getByQuery, update, deleteProvider, deleteAll}