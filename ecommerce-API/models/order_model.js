const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({
    ref:{
        type:String,
        required:true,
    }, 
    priceTotal:{
        type:Number,
        required:true,
    },
    quantityTotal:{
        type:String,
        required:true,
    }, 
    description:{
        type:String,
        required:true,
    },
    client:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"clients"
    },
    products:[{
        product:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "products",
        },
        price:{
            type:String,
            required:true,
        },
        quantity:{
            type:String,
            required:true,
        }
    }]

},{timestamps:true})

module.exports = mongoose.model("orders", orderSchema)