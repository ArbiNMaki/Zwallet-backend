/* eslint-disable no-undef */
const express = require('express')
const route = express.Router()
const { login, register, sendEmail } = require('../controllers/auth')
const {deleteCacheAllUsers} = require('../middleware/redis')

route
  .post('/login', deleteCacheAllUsers, login)
  .post('/register', deleteCacheAllUsers, register)
  .post('/email', sendEmail)

module.exports = route
