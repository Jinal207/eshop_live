const mongoose = require("mongoose")

const CategorySchema = new mongoose.Schema({
    id:{type:String,required:true},
    name:{type:String,required:true},
    color:{type:String,required:true},
    icon:{type:String,required:true},
    image:{type:String,required:true},
})

const Category = mongoose.model("categories",CategorySchema);

module.exports=Category;