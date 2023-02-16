const express = require("express");
const router = express.Router();

router.get("/Projects", (req, res, next) => {
  res.render("Projects");
});

module.exports = router;
