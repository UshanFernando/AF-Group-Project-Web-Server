const express=require('express');
const router=express.Router();
const Register = require('../schema/Register');

router.post('/login', function (req, res) {

    console.log(req.body);
    let Email=req.body.email;
    console.log(Email);

   Register.findOne({email:Email },function(loginUser){
        console.log(loginUser);
        if(loginUser){
            console.log('email match');
            Register.findOne({password: req.body.password},function(User){
                if(User){

                    console.log('Ok');
                    // res.redirect('../Containers/Home/Home' );
                }else{
                    console.log('error1');
                    res.redirect('../login');
                }
            })
        }else{
            console.log('error2');
            res.redirect('../login');
        }
    })
 
});


  

module.exports=router;