const { Category } = require("../MODELS/category");
const express = require("express");
const router = express.Router();
const CATEGORY = require('../MODELS/category')

// GET CATEGORY
router.get(`/getcategory`, async (req, res) => {
  const categoryList = await CATEGORY.find();

  if (!categoryList) {
    res.status(500).json({ success: false });
  }
  res.status(200).send(categoryList);
});

router.get("/getcategory/:id", async (req,res)=>{
  console.log(req.params)
  const category = await CATEGORY.findById(req.params.id);

  if(!category) {
    res 
      .status(500)
      .json({message:"The category with the given id was not found."});
    }
    res.status(200).send(category);
})

// POST CATEGORY
router.post("/postcategory", async (req, res) => {
  let category = new CATEGORY({
    id: req.body.id,
    name: req.body.name,
    color: req.body.color,
    icon: req.body.icon,
    image: req.body.image,
  });
  category = await category.save();

  if (!category) return res.status(400).send("the category cannot be created!");

  res.send(category);
});

// PUT CATEGORY
router.put("/putcategory/:id", async (req,res)=>{
  const category = await CATEGORY.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      icon: req.body.icon || category.icon,
      color: req.body.color,
    },
    {new: true}
  );
  if (!category) return res.status(400).send("the category cannot be created!");

  res.send(category);
});

// DELETE CATEGORY
router.delete("/deletecategory/:id", async (req,res)=>{
  CATEGORY.findByIdAndRemove(req.params.id)
  .then((category)=>{
    if (category){
      return res
      .status(200)
      .json({success:true,messege:"the category is deleted"});
    }else{
      return res 
      .status(404)
      .json({success: false,message:"category not found"});
      }
  })
  .catch((err)=>{
    return res.status(500).json({success:false,error:err});
  });
});



module.exports = router;
