const express = require('express')
const route = express.Router()
const transferController = require('../controllers/transfer')

route
  .get('/', transferController.getTransfer)
  .get('/:id', transferController.getTransferById)
  .post('/', transferController.addTransfer)
  .delete('/:id', transferController.deleteTransfer)
  
module.exports = route