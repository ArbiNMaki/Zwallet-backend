const express = require('express')
const router = express.Router()
const topupController = require('../controllers/topup')

router
    .get('/', topupController.getAllTopUp)
    .post('/', topupController.chargeTopUp)
    
module.exports = router