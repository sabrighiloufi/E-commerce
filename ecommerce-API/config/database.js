const mongoose = require("mongoose")

const dotenv = require("dotenv")
require("dotenv").config()

const DB = process.env.DB
 
const database = mongoose.connect(DB, (err)=>{
    if(err){
        console.log("server can't connected to mongoDB")
    }else{
        console.log("server connected to MongoDB successfully")
    }
})