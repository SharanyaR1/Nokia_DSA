const express = require('express')
const {servicesbundleconfig,servicescustom} = require('../controllers/configcontroller')
const router = express.Router()

router.get('/',servicesbundleconfig)
router.get('/custom',servicescustom)

module.exports = router
