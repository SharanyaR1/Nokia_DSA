const express = require('express');
const router = express.Router();
const bundleservices = require('../controllers/bundlecontroller');

router.post('/', bundleservices);

module.exports = router;
