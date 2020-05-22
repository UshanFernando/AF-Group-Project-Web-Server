const express=require('express');
const router=express.Router();
const Cart = require('../schema/Cart');
const auth = require("../Authentication/Auth");
const CartPrducts = require('../schema/CartProduct');
const StoreProducts = require('../schema/StoreManagerProducts');

router.post('/newCart',auth, function (req, res, next) {
    Cart.create({
        
        user: req.body.user,
        product: req.body.product,
        quantity: req.body.quantity,
      //user: {type: mongoose.Types.ObjectId, required: true, ref: 'User' },
        
      }
       ).then(function(item){
        res.send(item);
      }).catch(next);
   
  });
  router.get('/carts',function(req,res,next){
    Cart.find({}).then(function(item){
        res.send(item);
      });
  });
  
 
  router.get('/carts/:Uid', async function (req, res, next) {
    const userId=req.params.Uid;
    let pIds;
    let userCount ;
    pIds = await Cart.find({user:userId}).then(function (item) {
      return item;
    });
    console.log(pIds);
    // userCount = await Register.find({}).then(function (item) {
    //   return item.length;
    // });
  
    // productCount = await Product.find({}).then(function (item) {
    //   return item.length;
    // });
  
    // storemanagerCount = await Register.find({ utype: "sm" }).then(function (
    //   item
    // ) {
    //   return item.length;
    // });
  
    // res.json({
    //   categories: cateCount,
    //   users: userCount,
    //   products: productCount,
    //   storemanagers: storemanagerCount,
    // });
  });


  module.exports=router;