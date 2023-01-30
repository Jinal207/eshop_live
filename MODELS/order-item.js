const mongoose = require("mongoose")

const OrdersItemsSchema = new mongoose.Schema({
    // id:{type:String,required:true},
    quantity:{type:Number,required:true},
    product:{type:mongoose.Schema.Types.ObjectId,ref:"products"},
})

const orderitems = mongoose.model("orderitems",OrdersItemsSchema);

module.exports=orderitems;