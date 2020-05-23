const express=require('express');
const router=express.Router();
const Cart = require('../schema/Cart');
//const auth = require("../Authentication/Auth");
const StoreProducts = require('../schema/StoreManagerProducts');

router.post('/newCart', function (req, res, next) {
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
     Cart.find({user:userId}).then(function (item) {
      res.send(item);
    });

});
  module.exports=router;