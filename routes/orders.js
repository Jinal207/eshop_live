const Order  = require("../MODELS/order")
const express = require("express");
const router = express.Router();
const OrderItem = require("../MODELS/order-item");

// GET ORDER
router.get(`/getorder`, async (req, res) => {
  const orderList = await Order.find();

  if (!orderList) {
    res.status(500).json({ success: false });
  }
  res.status(200).send(orderList);
});




router.get("/getorder/:id", async (req,res)=>{
  console.log(req.params)
  const order = await ORDER.findById(req.params.id);

  if(!order) {
    res 
      .status(500)
      .json({message:"The order with the given id was not found."});
    }
    res.status(200).send(order);
})


router.get(`/`,async(req,res)=>{
  const order=await Order.findById(req.params.id)
  .populate("user","name")
  .sort({dateOrdered:-1})
  if(!orderList){
    res.status(500).json({success:false})
  }
  res.send(orderList)
})

// POST ORDER
router.post("/postorder", async (req, res) => {
    const orderItemsIds = Promise.all(
      req.body.orderitems.map(async (orderitem) => {
        let newOrderItem = new OrderItem({
          quantity: orderitem.quantity,
          product: orderitem.product,
        });
        newOrderItem = await newOrderItem.save();
        return newOrderItem._id;
      })
    );
  
    const orderItemsIdsResolved = await orderItemsIds;
    const totalPrices = await Promise.all(
      orderItemsIdsResolved.map(async (orderItemId) => {
        const orderItem = await OrderItem.findById(orderItemId).populate(
          "product",
          "price"
        );
        const totalPrice = orderItem.product.price * orderItem.quantity;
        return totalPrice;
      })
    );
  
    const totalPrice = totalPrices.reduce((a, b) => a + b, 0);
    let order = new Order({
        id:req.body.id,
        orderitems: orderItemsIdsResolved,
      shippingAddress1: req.body.shippingAddress1,
      shippingAddress2: req.body.shippingAddress2,
      city: req.body.city,
      zip: req.body.zip,
      country: req.body.country,
      phone: req.body.phone,
      status: req.body.status,
      totalprice: totalPrice,
      user: req.body.user,
    });
    order = await order.save();
  
    if (!order) return res.status(400).send("the order cannot be created!");
  
    res.status(200).send(order);
  });
  
  
// PUT ORDER
router.put("/putorder/:id", async (req,res)=>{
  const order = await ORDER.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      icon: req.body.icon || category.icon,
      color: req.body.color,
    },
    {new: true}
  );
  if (!order) return res.status(400).send("the order cannot be created!");

  res.send(order);
});

// DELETE ORDER
router.delete("/deleteorder/:id", async (req,res)=>{
    ORDER.findByIdAndRemove(req.params.id)
  .then((order)=>{
    if (order){
      return res
      .status(200)
      .json({success:true,messege:"the order is deleted"});
    }else{
      return res 
      .status(404)
      .json({success: false,message:"order not found"});
      }
  })
  .catch((err)=>{
    return res.status(500).json({success:false,error:err});
  });
});



module.exports = router;
