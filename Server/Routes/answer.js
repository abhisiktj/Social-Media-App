const express=require('express');
const { addAnswer } = require('../Controllers/answer');
const router=express.Router();

router.post('/add',addAnswer);

module.exports=router;