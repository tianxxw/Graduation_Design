const express = require("express")
const multer = require("multer")

const path = "goods_img"
const upload = multer({dest:path})
const router = express.Router()
const Img = require('../router_headler/uploadGoodImg')
router.post('/upload',upload.single('file'),Img.upload)
router.get('/download/:fileName',Img.download)

module.exports = router