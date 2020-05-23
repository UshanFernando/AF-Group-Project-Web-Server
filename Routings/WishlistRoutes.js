const express=require('express');
const router=express.Router();
const WishList = require('../schema/WishList');

router.post('/newWishList', function (req, res, next) {
    WishList.create({
        
        user: req.body.user,
        product: req.body.product,
        quantity: req.body.quantity,
      //user: {type: mongoose.Types.ObjectId, required: true, ref: 'User' },
        
      }
       ).then(function(item){
        res.send(item);
      }).catch(next);
   
  });
  router.get('/WishLists',function(req,res,next){
    WishList.find({}).then(function(item){
        res.send(item);
      });
  });

  module.exports=router;