const express = require("express");
const router = express.Router();


router.get("/Register", (req, res, next) => {
  res.render("Register");
});

module.exports = router;
