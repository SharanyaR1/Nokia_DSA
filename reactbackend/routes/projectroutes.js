

const express = require('express')
const { storeprojectdetails,getprojectdetails,getallprojectdetails} = require('../controllers/project')
const router = express.Router()

router.post('/',storeprojectdetails)
router.get('/',getprojectdetails)
router.get('/all',getallprojectdetails)


module.exports = router