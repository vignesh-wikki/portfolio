const express = require('express');
const router = express.Router();

router.get("/Login",(req,res,next) =>{
  res.render('Login');
})


module.exports = router;