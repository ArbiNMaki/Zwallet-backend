const usersModel = require('../model/users')
const helper = require('../helpers/helper')

const users = {
  getUsers: (req, res) => {
    const name = req.query.name
    const page = req.query.page || 1
    const limit = req.query.limit || 3
    const offset = (page - 1) * limit
    usersModel.getUsers(name, limit, offset)
      .then(result => {
        if (result.length === 0) {
          return helper.response(res, 404, null, { message: 'data not found' })
        }
        helper.response(res, 200, result, null)
      })
      .catch(e => console.log(e))
  },
  getUserById: (req, res) => {
    const id = req.params.id
    usersModel.getUserById(id)
      .then(result => {
        if (result.length === 0) {
          return helper.response(res, 404, null, { message: 'id not found' })
        }
        helper.response(res, 200, result, null)
      })
      .catch(e => {
        return helper.response(res, 500, null, {
          message: 'database error'
        })
      })
  },
  addUser: (req, res) => {
    const { name, pin, phone, amount, verified } = req.body
    const data = { name, pin, phone, amount, verified }
    usersModel.addUser(data)
      .then(result => {
        helper.response(res, 201, result, null)
      })
      .catch(e => console.log(e))
  },
  updateUser: (req, res) => {
    const id = req.params.id
    const { name, pin, phone, amount, verified } = req.body
    const data = {}
    if (name) {
      data.name = req.body.name
    }
    if (phone) {
      data.phone = req.body.phone
    }
    if (amount) {
      data.amount = req.body.amount
    }
    if (verified) {
      data.verified = req.body.verified
    }
    if (pin) {
      data.pin = req.body.pin
    }
    if (amount) {
      data.amount = req.body.amount
    }
    usersModel.updateUser(id, data)
      .then(result => {
        if (result.affectedRows === 0) {
          return helper.response(res, 404, null, { message: 'id not found' })
        }
        helper.response(res, 200, result, null)
      })
      .catch(e => console.log(e))
  },
  deleteUser: (req, res) => {
    const id = req.params.id
    usersModel.deleteUser(id)
      .then(result => {
        if (result.affectedRows === 0) {
          return helper.response(res, 404, null, { message: 'id not found' })
        }
        helper.response(res, 200, result, null)
      })
      .catch(e => console.log(e))
  }
}

module.exports = users