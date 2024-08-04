const express=require('express')
const { getMessage } = require('../controller/messageController')
const router=express.Router()

router.get('/',getMessage)

module.exports=router