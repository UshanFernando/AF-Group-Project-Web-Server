const express=require('express');
const router=express.Router();
const Register = require('../schema/Register');
// let express = require('express');
// let router = express.Router();
// let bodyParser = require('body-parser');

// router.use(bodyParser.urlencoded({
//     extended: true
// }));

// let SignupUsers = require('../models/signupusers');

router.get('/delete-customer/:demail/', function (req) {
    console.log('Delete Customers Called.');

    console.log(req.params.demail);

    let Email = req.params.demail;

    let errors = req.validationErrors;

    if(errors) {
        console.log('error reported in customers');
    } else {
        Register.findOne({email:Email}, function(err,signupUser) {
            if(signupUser) {
                console.log('Customer Found');
                SignupUsers.findByIdAndDelete(signupUser._id, function(err) {
                    if(err) return console.log(err);
                    console.log('Successfully Deleted Customer');
                })
            }
        });
    }
});


router.post("/reset", function (req, res, next) {

    Register.findOne({ _id: req.body.id }).then(function (item) {
      res.send(item);
    });
  });



router.post('/update-customer',function (req,res) {

    console.log('update customer called');
    console.log(req.body.uEmail);
    console.log(req.body.uFname);
    console.log(req.body.uLname);
    console.log(req.body.uMobile);
    console.log(req.body.uPassword);

    let foundingEmail = req.body.uEmail;
    let eFname = req.body.uFname;
    let eLname = req.body.uLname;
    let eMobile = req.body.uMobile;
    let ePassword = req.body.uPassword;

     let errors = req.validationErrors;

    if(errors) {
        console.log('update error reported');
    }
    else {

        Register.findOneAndUpdate({email:foundingEmail},{fName:eFname,lName:eLname,mobile:eMobile,password:ePassword}).then(function(updatedCustomer) {
            if(updatedCustomer){
                res.redirect('/Signin/CustomerProf/'+ updatedCustomer.email);    
            }
            
        });
    }

});

router.post('/logged/:gtoken', function(req, res){
    console.log('log function called');
    let logStatus = req.params.gtoken;
    console.log(logStatus);

    if(logStatus){
        // res.redirect('/Cart/'+logStatus);
        console.log('If condition true');
        // res.redirect('/CustomerProf/Cart/'+logStatus);
        res.send(logStatus);
    }

})

module.exports = router;