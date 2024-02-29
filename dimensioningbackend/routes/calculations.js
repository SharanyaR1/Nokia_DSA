const express = require('express')
const { calculatetotalpods } = require('../controllers/calculationcontroller')
const router = express.Router()

router.post('/',calculatetotalpods)

module.exports = router
