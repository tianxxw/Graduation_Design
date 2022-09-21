const express = require('express')
const router = express.Router();
const {login,register} = require('../router_headler/ma_login')
router.get('/login',login)
router.post('/register',register)
module.exports = router