const express = require("express");
const router = express.Router();
const Category = require("../schema/Category");
const Register = require("../schema/Register");

require('dotenv').config();

const mailAccountUser =  process.env.MAIL_USER_NAME;
const mailAccountPassword =  process.env.MAIL_PASSWORD;

const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");

const transport = nodemailer.createTransport(
  smtpTransport({
    service: "gmail",
    auth: {
      user: mailAccountUser,
      pass: mailAccountPassword,
    },
  })
);

router.post("/storemanager", function (req, res, next) {
  Register.create({
    utype: "sm",
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    password: genPassword(),
  })
    .then(function (item) {
      res.send(item);
      let mail = {
        from: mailAccountUser,
        to: req.body.email,
        subject: "You have been promoted as store manager",
        text: "Use This username and password to log into site",
        html:
          '<b>Hello!</b><p><a href="http://www.yahoo.com">Click Here</a></p>',
      };
      transport.sendMail(mail, function (error, response) {
        if (error) {
          console.log(error);
        } else {
          console.log("Message sent: " + response.message);
        }
      });

      transport.close();
    })
    .catch(next);
});

router.post("/category", function (req, res, next) {
  Category.create({
    name: req.body.name,
  })
    .then(function (item) {
      res.send(item);
    })
    .catch(next);
});

router.get("/category", function (req, res, next) {
  Category.find({}).then(function (item) {
    res.send(item);
  });
});

router.put("/category", function (req, res, next) {
  Category.findByIdAndUpdate(
    { _id: req.body.id },
    {
      name: req.body.name,
    }
  ).then(function () {
    Category.findOne({ _id: req.body.id }).then(function (single) {
      res.send(single);
    });
  });
});

router.delete("/category", function (req, res, next) {
  Category.findByIdAndRemove({ _id: req.body.id }).then(function (item) {
    res.send(item);
  });
});

router.get("/stats", async function (req, res, next) {
  let cateCount = -1;
  let userCount = -1;
  cateCount = await Category.find({}).then(function (item) {
    return item.length;
  });
  userCount = await Register.find({}).then(function (item) {
    return item.length;
  });
  res.json({
    categories: cateCount,
    users: userCount,
  });
});

function genPassword() {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < 8; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

module.exports = router;
