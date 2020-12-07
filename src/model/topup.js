const connection = require('../configs/db')

const topup = {
    getAllTopUp: (id) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM topup ORDER BY id DESC`, id, (error, result) => {
          if (!error) {
            resolve(result)
          } else {
            reject(error)
          }
        })
    })
  },
  chargeTopUp: (data) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO topup SET ?', data, (error, result) => {
        if (!error) {
          resolve(result)
        } else {
          reject(error)
        }
      })
    })
  }
}

module.exports = topup