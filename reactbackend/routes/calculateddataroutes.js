const express = require('express')
const { data} = require('../controllers/calculateddata')
const router = express.Router()

router.get('/',data)

module.exports = router
