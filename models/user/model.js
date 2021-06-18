let mg = require("mongoose")

const UserScehma = new mg.Schema({
    name:{
        type:String,
        required: true,
        index:true,
    }
    ,
    email:{
        type:String,
        required: true,
        unique: true,
        index: true
    }
    ,
    password:{
        type:String,
        required: true
    }
    ,
    refreshToken:{
        type: String,
    }
    ,
}, {timestamps:true})

const User = mg.model('User', UserScehma)

module.exports = User