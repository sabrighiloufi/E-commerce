const mongoose = require("mongoose")

const userModel = require("./user_model")

const providerSchema = new mongoose.Schema({
    company:{
        type:String,
        required:true
    }
}) 

const providers = userModel.discriminator("providers", providerSchema)

module.exports = mongoose.model("providers")