const express = require('express');
const fis=require('fs');
const storeMangerRoutes = require('./Routings/StoreMangerRoutes/StoreMangerRoutes');
const adminRoutes = require('./Routings/AdminRoutes');
const commentsRoutes = require('./Routings/CommentsRoutes');
const wishListRoutes = require('./Routings/WishlistRoutes');
const registerRoutes = require('./Routings/RegisterRoutes');
const categoryRoutes = require('./Routings/CategoryRoutes');
const Parsbdy = require('body-parser');
const mongoose = require('mongoose');
const cartRoutes=require('./Routings/CartRoutes');
const loginRoutes=require('./Routings/LoginRoutes');
const app = express();
const cors = require("cors");
const morgan = require("morgan");

require("dotenv").config();

const port = process.env.PORT || 5000;
const mongouri = process.env.ATLAS_URI;

app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods: GET, POST,PUT,PATCH, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

mongoose
  .connect(mongouri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Connected…");
  })
  .catch((err) => console.log(err));

app.use(morgan("dev"));
app.use("/uploads", express.static("uploads"));
app.use(Parsbdy.json());

app.use('/admin', adminRoutes);
app.use('/comment', commentsRoutes);
app.use('/register', registerRoutes);
<<<<<<< HEAD
app.use('/reset', resetRoutes);
=======
app.use('/category', categoryRoutes);
>>>>>>> 246b8d9e0ee13b7b364586f5dab8388de9a14ce9
app.use('/cart', cartRoutes);
app.use('/wishList', wishListRoutes);
app.use('/login', loginRoutes);

app.use("/storemanger", storeMangerRoutes);

//custom error handling
app.use((req, res, next) => {
  if (req.file) {
    fis.unlink(req.file.path, (err) => {
      console.log(err);
    });
  }
  const Er = new Error("Not Found");
  Er.status = 404;
  next(Er);
});

// app.use(function (erro, rq, res, next) {
//   res.status(422).send({ error: erro.message });
// });

//custom error handling
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

app.listen(port, function () {
  console.log(`Server is running on port: ${port}`);
});
