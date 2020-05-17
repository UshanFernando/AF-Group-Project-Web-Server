const express = require("express");
const router = express.Router();
const Category = require("../schema/Category");
const Register = require("../schema/Register");

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

module.exports = router;
