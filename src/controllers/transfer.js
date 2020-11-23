const transferModel = require('../model/transfer')
const helper = require('../helpers/helper')

const transfer = {
    getTransfer: (req, res) => {
    const date = req.query.date
    const page = req.query.page || 1
    const limit = req.query.limit || 3
    const offset = (page - 1) * limit
    transferModel.getTransfer(date, limit, offset)
      .then(result => {
        if (result.length === 0) {
          return helper.response(res, 404, null, { message: 'data not found' })
        }
        helper.response(res, 200, result, null)
      })
      .catch(e => console.log(e))
  },
  getTransferById: (req, res) => {
    const id = req.params.id
    transferModel.getTransferById(id)
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
  addTransfer: (req, res) => {
    const { amount, date, note, id_sender, receiver, id_receiver } = req.body
    const data = { amount, date, note, id_sender, receiver, id_receiver }
    transferModel.addTransfer(data)
      .then(result => {
        helper.response(res, 201, result, null)
      })
      .catch(e => console.log(e))
  },
  deleteTransfer: (req, res) => {
    const id = req.params.id
    transferModel.deleteTransfer(id)
      .then(result => {
        if (result.affectedRows === 0) {
          return helper.response(res, 404, null, { message: 'id not found' })
        }
        helper.response(res, 200, result, null)
      })
      .catch(e => console.log(e))
  }
}

module.exports = transfer