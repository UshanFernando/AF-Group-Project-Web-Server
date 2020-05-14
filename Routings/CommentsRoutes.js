const express=require('express');
const router=express.Router();
const Category = require('../schema/Comment');

router.post('/newComment', function (req, res, next) {
    Category.create({
      
      name: req.body.name,
      message: req.body.message,
      rating: req.body.rating,
    //user: {type: mongoose.Types.ObjectId, required: true, ref: 'User' },
      user: req.body.user
    }
     ).then(function(item){
      res.send(item);
    }).catch(next);
 
});

router.get('/comments',function(req,res,next){
    Category.find({}).then(function(item){
      res.send(item);
    });
});
  

 
module.exports=router;