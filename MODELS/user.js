const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    id:{type:String,required:true},
    name:{type:String,required:true},
    email:{type:String,required:true},
    passwordHash:{type:String,required:true},
    street:{type:String,required:true},
    apartment:{type:String,required:true},
    city:{type:String,required:true},
    zip:{type:String,required:true},
    country:{type:String,required:false},
    phone:{type:Number,required:true},
    isAdmin:{type:Boolean,required:true},
})

const user = mongoose.model("users",UserSchema);

module.exports=user;