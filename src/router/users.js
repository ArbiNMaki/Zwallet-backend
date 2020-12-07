/* eslint-disable no-undef */
const express = require('express')
const route = express.Router()
const { getUsers, getUserById, addUser, updateUser, deleteUser, myProfile } = require('../controllers/users')
const { verifyToken, roleAdmin } = require('../middleware/auth')
const { uploadMulter } = require('../middleware/upload')
const { deleteCacheAllUsers, getCacheAllUsers, cacheUserId } = require('../middleware/redis')

route
  .get('/', getCacheAllUsers, getUsers)
  .get('/myprofile', verifyToken, myProfile)
  .get('/:id', verifyToken, cacheUserId, getUserById)
  .post('/', uploadMulter.single('photo'), deleteCacheAllUsers, addUser)
  .patch('/', verifyToken, uploadMulter.single('photo'), deleteCacheAllUsers, updateUser)
  .delete('/:id', roleAdmin, deleteCacheAllUsers, deleteUser)
module.exports = route
