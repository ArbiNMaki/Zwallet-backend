const topupModel = require('../model/topup')
const helper = require('../helpers/helper')

const topup = {
    getAllTopUp: (req, res) => {
        const date = req.query.date
        const page = req.query.page || 1
        const limit = req.query.limit || 3
        const offset = (page - 1) * limit
        topupModel.getAllTopUp(date, limit, offset)
            .then(result => {
                if (result.length === 0) {
                    return helper.response(res, 404, null, {
                        message: 'data not found'
                    })
                }
                helper.response(res, 200, result, null)
            })
            .catch(e => console.log(e))
    },
    chargeTopUp: (req, res) => {
        const {
            amount,
            title,
            date
        } = req.body
        const data = {
            amount,
            title,
            date
        }
        topupModel.chargeTopUp(data)
            .then(result => {
                helper.response(res, 201, result, null)
            })
            .catch(e => console.log(e))
    }
}

module.exports = topup