

const express = require('express')
const { storeprojectdetails,getprojectdetails} = require('../controllers/project')
const router = express.Router()

router.post('/',storeprojectdetails)
router.get('/',getprojectdetails)


module.exports = router