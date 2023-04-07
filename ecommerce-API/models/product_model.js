const mongoose = require("mongoose")

const gallerySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    }

})

const productSchema = new mongoose.Schema({
    refproduct:{
        type:String,
        required:true,
        trim:true,
    },
    price:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    quantity:{
        type: String,
        required: true,
    },
    color:{
        type:String
    },
    subcategory:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "subcategories"
    },
    order:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"orders"
    },
    images:[gallerySchema],

    

},{timestamps:true})

module.exports = mongoose.model("products", productSchema)