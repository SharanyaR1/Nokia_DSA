const express = require('express')
const {servicesbundleconfig,servicescustom,servicesoptionaldependency} = require('../controllers/configcontroller')
const router = express.Router()

router.get('/',servicesbundleconfig)
router.get('/custom',servicescustom)
router.post('/optionaldependency',servicesoptionaldependency)

module.exports = router



// {"project_name":"Project4",
//     "version":"0.1.0","charts":{
//     "SS7LB":2,"HTTPLB":6
//     }}