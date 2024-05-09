const express = require('express')
const { calculatetotalpods } = require('../controllers/calculationcontroller')
const router = express.Router()

console.log("In calculations")
router.post('/',calculatetotalpods)

module.exports = router
