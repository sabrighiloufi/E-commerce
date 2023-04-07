const mongoose = require("mongoose")

const userModel = require("./user_model")

const clientSchema= new mongoose.Schema({
    address_L:{
        type:String,
        required:true
    },
    orders:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"orders"
    }]
})

const clients = userModel.discriminator("clients", clientSchema)

module.exports = mongoose.model("clients")