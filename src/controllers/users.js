/* eslint-disable no-undef */
const { getUsers, getUserById, addUser, updateUser, deleteUser } = require('../model/users')
const helper = require('../helpers/helper')
const createError = require('http-errors')
const { pagination } = require('../helpers/pagination')
require('dotenv').config()
const bcrypt = require('bcryptjs')
const redis = require('redis')
const client = redis.createClient(6379)
const {updateEmail} = require('../helpers/email')

exports.getUsers = async (req, res, next) => {
  const name = req.query.name
  const phone = req.query.phone
  const page = parseInt(req.query.page) || 1
  const limit = parseInt(req.query.limit) || 3
  const offset = (page - 1) * limit
  const setPagination = await pagination(limit, page)
  getUsers(name, phone, limit, offset)
    .then(result => {
      if (result.length === 0) {
        return helper.response(res, 404, null, { message: 'data not found' })
      }
      client.setex('getAllUsers', 60 * 60 * 60, JSON.stringify(result))
      helper.response(res, 200, { users: result, pagination: setPagination }, null)
    })
    .catch(() => {
      const error = createError.InternalServerError()
      return next(error)
    })
}
exports.getUserById = (req, res, next) => {
  const id = req.params.id
  getUserById(id)
    .then(result => {
      if (result.length === 0) {
        return helper.response(res, 404, null, { message: 'id not found' })
      }
      client.setex('cacheUserId' + id, 60 * 60 * 60, JSON.stringify(result))
      helper.response(res, 200, result, null)
    })
    .catch(() => {
      const error = createError.InternalServerError()
      return next(error)
    })
},
exports.myProfile = (req,res,next) => {
  const {myId} = req
  console.log('this is a: ', myId)
  getUserById(myId)
    .then(result => {
      if (result.length === 0) {
        return helper.response(res, 404, null, { message: 'id not found' })
      }
      delete result[0].password
      helper.response(res, 200, result, null)
    })
    .catch(() => {
      const error = createError.InternalServerError()
      return next(error)
    })
}
exports.addUser = (req, res, next) => {
  const { name, username, password, email, pin, phone, amount, photo, roleId } = req.body
  const data = { name, username, password, email, pin, phone, amount, photo, roleId }
  addUser(data)
    .then(result => {
      const resultData = {
        insertId: result.insertId,
        data: { ...data }
      }
      helper.response(res, 201, resultData, null)
    })
    .catch(() => {
      const error = createError.InternalServerError()
      return next(error)
    })
},
exports.updateUser = (req, res, next) => {
  const { myId } = req
  const { name, username, password, email, pin, phone, amount, photo, roleId } = req.body
  const data = {}

  data.photo = `${process.env.BASE_URL}/v1/upload/${req.file.filename}`

  if (name) {
    data.name = req.body.name
  }
  if (username) {
    data.username = req.body.username
  }
  if (email) {
    data.email = req.body.email
  }
  if (pin) {
    data.pin = req.body.pin
  }
  if (phone) {
    data.phone = req.body.phone
  }
  if (amount) {
    data.balance = req.body.amount
  }
  if (photo) {
    data.balance = req.body.amount
  }
  if (roleId) {
    data.roleId = req.body.roleId
  }
  if (!password) {
    delete data.password
    updateUser(myId, data)
      .then(result => {
        updateEmail(email, email)
        if (result.affectedRows === 0) {
          return helper.response(res, 404, null, { message: 'id not found' })
        }
        delete data.password
        helper.response(res, 200, data, null)
      })
      .catch(() => {
        const error = createError.InternalServerError()
        return next(error)
      })
  } else if (password) {
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, function (err, hash) {
        data.password = hash
        updateUser(myId, data)
          .then(result => {
            updateEmail(email, email)
            if (result.affectedRows === 0) {
              return helper.response(res, 404, null, { message: 'id not found' })
            }
            delete data.password
            helper.response(res, 200, data, null)
          })
          .catch(() => {
            const error = createError.InternalServerError()
            return next(error)
          })
      })
    })
  }
},

exports.deleteUser = (req, res, next) => {
  const id = req.params.id
  deleteUser(id)
    .then(result => {
      if (result.affectedRows === 0) {
        return helper.response(res, 404, null, { message: 'id not found' })
      }
      helper.response(res, 200, { message: 'delete success' }, null)
    })
    .catch(() => {
      const error = createError.InternalServerError()
      return next(error)
    })
}
