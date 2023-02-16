const express = require('express');
const router = express.Router();

router.get("/Aboutme",(req,res,next) =>{
  res.render('Aboutme');
})


module.exports = router;