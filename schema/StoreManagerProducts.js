const mongoose=require('mongoose');
const Schema =mongoose.Schema;
mongoose.set('useFindAndModify', false);

const StoreManagerProducts=new Schema({

   Productname:{
      type:String,
      required:[true,"Productname should be defined"]
    },
      Category:{
        type:String,
        required:[true,"Category should be defined"]
      },
      Price:{
        type:String,
        required:[true,"Price should be defined"]
      },
      Discount:{
        type:String,
        required:[true,"Discount should be defined"]
      },
      Description:{
        type:String,
        required:[true,"Description should be defined"]
      },
      Image:{
        type:String,
        required:[true,"Image should be defined"]
      },
      StoreMangerID:{
        type:String,
        required:[true,"StoreMangerID should be defined"]
      }
  });
  
  const StoreMangerProduct=mongoose.model('productCategories',StoreManagerProducts);
  module.exports=Category;
  



//Mongo db  Schema
module.exports=FireAlarm;
