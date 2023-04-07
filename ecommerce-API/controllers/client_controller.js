const clientModel = require("../models/client_model")

const {randomBytes} = require("crypto")

const mailController = require("./mail_controller")

const DOMAIN = process.env.DOMAIN


const create =async (req, res)=>{
    //if(req.file){
     //   req.body.image = req.file.filename
    //}

    const client = new clientModel({...req.body, verificationCode: randomBytes(6).toString("hex")})

    const email =await clientModel.findOne({email: req.body.email})
    if(email){
        res.status(406).json({message: "email exist"})
    }else{
    client.save(req.body, (err, item)=>{
        if(err){
            res.status(406).json({message: "client not created" + err})
        }else{
            mailController(client.email,
                 "Welcome " + client.firstName, 
                `<h2>Hello ${client.firstName +" "+ client.lastName}! </h2>
                <p>We're glad to have you on board at ${client.email}. </p>
                <p>We're glad to have you on board at My app</p>
                <table class="action" align="center" width="100%" cellpadding="0" cellspacing="0" role="presentation" style="box-sizing: border-box; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'; position: relative; -premailer-cellpadding: 0; -premailer-cellspacing: 0; -premailer-width: 100%; margin: 30px auto; padding: 0; text-align: center; width: 100%;">
                <tr>
                <td style="box-sizing: border-box; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'; position: relative;">
                <a align="center" href="${DOMAIN}/auth/verify-now/${client.verificationCode}" class="button button-primary" target="_blank" rel="noopener" style="box-sizing: border-box; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'; position: relative; -webkit-text-size-adjust: none; border-radius: 4px; color: #fff; display: inline-block; overflow: hidden; text-decoration: none; background-color: #2d3748; border-bottom: 8px solid #2d3748; border-left: 18px solid #2d3748; border-right: 18px solid #2d3748; border-top: 8px solid #2d3748;">Click here to Verify your account</a>
                </td>
                </tr>
                </table>`,
                [{
                    //filename: req.file.filename,
                    //path: "./storages/" + req.file.filename,
                    //cid: "test"
                }]
            )
            res.status(201).json({message: "client created successfully", data: item})
        }
    })
    }
}

const getAll = (req, res)=>{
    clientModel.find({}, (err, items)=>{
        if(err){
            res.status(406).json({message: "no clients found"})
        }else{
            res.status(201).json({message: "list of clients", data: items})
        }
    })
}


const getByID = (req, res)=>{
    clientModel.findById(req.params.id, (err, item)=>{
        if(err){
            res.status(406).json({message: "no client found"})
        }else{
            res.status(201).json({message: "client founded", data: item})
        }  
    })
}

const getByQuery =async (req, res)=>{
    let {q} = req.query 
    let clients =await clientModel.find({
        $or: [
            {firstName: {$regex: q, $options:"i"}}
        ]
    })
    res.status(201).json(clients)
}

const update = (req, res)=>{

    const user = req.params.id
    const image = user.image
    req.body.image = !req.file ? image : req.file.filename
    clientModel.findByIdAndUpdate(req.params.id, req.body,{new:true}, (err, item)=>{
        if(err){
            res.status(406).json({message: "client not updated"})
        }else{
            res.status(201).json({message: "client updated successfully", data:item})
        }
    })
}

const deleteClient = (req, res)=>{
    clientModel.findByIdAndRemove(req.params.id, (err)=>{
        if(err){
            res.status(406).json({message: "client not deleted"})
        }else{
            res.status(201).json({message: "client deleted successfully"})
        }
    })
}


const deleteAll = (req, res)=>{
    clientModel.deleteMany(function(err){
        if(err){
            res.status(406).json({message: "clients not deleted"})
        }else{
            res.status(201).json({message: "clients deleted"})
        }
    })
}

const getStats = async (req, res)=>{
    const date = new Date()
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1))
    try {
        const data = await clientModel.aggregate([
            {$match: {createdAt: {$gte: lastYear}}},
            {$project: {month: {$month: "$createdAt"}}},
            {$group: {_id: "$month", total: {$sum: 1}}} 
        ]) 
        const newData = data.sort((a, b) => a._id < b._id ? -1 : 1)
        res.status(200).json(newData)   
    } catch (error) {
        res.status(406).json(error) 
    }
} 


module.exports = {create, getAll, getByID, getByQuery, update, deleteClient, deleteAll, getStats}