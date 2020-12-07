/* eslint-disable no-undef */
const bcrypt = require('bcryptjs')
const helper = require('../helpers/helper')
const { checkEmail, checkUser, insertUser } = require('../model/auth')
const createError = require('http-errors')
const { v4: uuidv4 } = require('uuid')
const jwt = require('jsonwebtoken')
const { sendEmail } = require('../helpers/email')


exports.login = (req, res, next) => {
  const { username, password } = req.body
  checkUser(username)
    .then(result => {
      if (result.length > 0) {
        const user = result[0]
        bcrypt.compare(password, user.password, function (err, resCheck) {
          if (user.length === 0 && !resCheck) return helper.response(res, 401, null, { message: 'Password Wrong!!' })
          delete user.password

          const payload = {
            userId: user.id,
            email: user.email,
            roleId: user.roleId
          }
          jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '24h' }, function (err, token) {
            user.token = token
            return helper.response(res, 200, user, null)
          })
        })
      } else {
        return helper.response(res, 401, null, { message: 'Username Unlisted!!' })
      }
    })
    .catch(() => {
      const error = createError.InternalServerError()
      return next(error)
    })
}


exports.register = (req, res, next) => {
  const id = uuidv4()
  const {
    username,
    email,
    password,
    roleId
  } = req.body
  const message = { username, password }
  checkEmail(email)
    .then(result => {
      if (result.length > 0) return helper.response(res, 401, null, { message: 'Email already exist!!' })
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {
          const data = {
            id,
            username,
            email,
            password: hash,
            roleId,
            createdAt: new Date(),
            updatedAt: new Date()
          }
          insertUser(data)
            .then(() => {
              sendEmail(email, message)
              return helper.response(res, 201, { message: 'Register Success' }, null)
            })
            .catch(() => {
              return helper.response(res, 401, null, new Error)
            })
        })
      })
    })
    .catch(() => {
      const error = createError.InternalServerError()
      return next(error)
    })
}

exports.sendEmail= (req, res) => {
  const email = req.body.email
  const message = req.body.message
  sendEmail(email, message)
  .then((res)=>{
    console.log(res)
    // return helper.response(res, { id: res.messageId}, 200, null)
    return helper.response(res, {message: 'send email success'}, 200,null)
  })
  .catch((err)=>{
    return helper.response(res, null, 500, {
      err
    })
  })
}