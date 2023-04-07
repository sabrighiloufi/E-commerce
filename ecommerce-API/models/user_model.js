const mongoose = require("mongoose")

const bcrypt = require("bcrypt")

const baseOptions = {
    discriminatorKey: 'itemtype', // our discriminator key, could be anything
    collection: 'users', // the name of our collection
    timestamps:true,
  };


const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    }, 
    password:{
        type:String,
        required:true,
    }, 
    image:{
        type:String,
       // required:true
    },
    verified:{
        type:Boolean,
        default: false
    },
    verificationCode:{
        type:String,
    },
    resetPasswordToken:{
        type:String
    }

},baseOptions)


userSchema.pre("save", function(next){
    if(this.password){
        var salt = bcrypt.genSaltSync(10)
        this.password = bcrypt.hashSync(this.password, salt)
    }
    next()
})



module.exports = mongoose.model("users", userSchema)
