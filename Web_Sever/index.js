const express=require('express');
const fullRoutes=require('./Routings/productManager');
const  Parsbdy=require('body-parser');
const mongoose=require('mongoose');
const app=express();

require('dotenv').config();

const port = process.env.PORT || 5000;

const mongouri = process.env.ATLAS_URI;

mongoose.connect(mongouri, { useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})
app.use(cors());
app.use(Parsbdy.json());


//custom error handling
app.use(function(erro,rq,res,next){
  res.status(422).send({error:erro.message});
});

const productManagerRouter = require('./routes/products');//route eke mulata ena kotasa set krala tiyenne,meke nam product managwr eke url ekata kalin kotasa set karala tiyenne
app.use('/products', productManagerRouter);

app.listen(port,function(){
  console.log(`Server is running on port: ${port}`);
});
