const express=require('express');
const fullRoutes = require('./Routings/productManager');
const adminRoutes=require('./Routings/AdminRoutes');
const commentsRoutes=require('./Routings/CommentsRoutes');
const registerRoutes=require('./Routings/RegisterRoutes');
const cartRoutes=require('./Routings/CartRoutes');
const Parsbdy=require('body-parser');
const mongoose=require('mongoose');
const app = express();
const cors = require('cors');

require('dotenv').config();

const port = process.env.PORT || 5000;
const mongouri = process.env.ATLAS_URI;

app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

mongoose.connect(mongouri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('MongoDB Connected…')
})
  .catch(err => console.log(err))

app.use(Parsbdy.json());
app.use('/admin', adminRoutes);
app.use('/comment', commentsRoutes);
app.use('/register', registerRoutes);
app.use('/cart', cartRoutes);

//custom error handling
app.use(function(erro,rq,res,next){
  res.status(422).send({error:erro.message});
});


// const productManagerRouter = require('./routes/products');//route eke mulata ena kotasa set krala tiyenne,meke nam product managwr eke url ekata kalin kotasa set karala tiyenne
// app.use('/products', productManagerRouter);

app.listen(port,function(){
  console.log(`Server is running on port: ${port}`);
});
