/* eslint-disable no-undef */
const express = require('express')
const route = express.Router()
const routeUsers = require('./users')
// const routeTransfer= require('./transfer')
// const routeTopup = require('./topup')
const routeAuth = require('./auth')

route
  .use('/users', routeUsers)
  // .use('/transfer', routeTransfer)
  // .use('/topup', routeTopup)
  .use('/auth', routeAuth)
  .use('/upload', express.static('./public/uploads'))


module.exports = route
