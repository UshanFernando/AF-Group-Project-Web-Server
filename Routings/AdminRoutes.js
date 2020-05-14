const express=require('express');
const router=express.Router();
const Category = require('../schema/Category');

router.post('/category', function (req, res, next) {
    Category.create({
      name:req.body.name,
    }
     ).then(function(item){
      res.send(item);
    }).catch(next);
 
});

router.get('/category',function(req,res,next){
    Category.find({}).then(function(item){
      res.send(item);
    });
});
  
router.get('/categorycount',function(req,res,next){
    Category.find({}).then(function(item){
      res.send(String(item.length));
    });
  });
 
module.exports=router;