const mongoose = require('mongoose');

const UserSchema= new mongoose.Schema({
     firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    }
    ,
    role:{
        type:String,
        enum:['volunteer','admin'],
        required:true
    }
    ,
    active:{
        type:Boolean,
        default: true
    },
    createdAt: {
        type:Date,
        default:Date.now()
    }   ,
    updatedAt: {
        type:Date,
        default:Date.now()
    }  
},{ timestamps: true });

module.exports = mongoose.model('User', UserSchema);

