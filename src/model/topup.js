const connection = require('../configs/db')

const topup = {
    getAllTopUp: (date, limit, offset) => {
    return new Promise((resolve, reject) => {
      if (date) {
        connection.query(`SELECT * FROM topup WHERE date LIKE ? LIMIT ${offset}, ${limit}`, `%${date}%  ORDER BY date DESC`, (error, result) => {
          if (!error) {
            resolve(result)
          } else {
            reject(error)
          }
        })
      } else {
        connection.query(`SELECT * FROM topup LIMIT ${limit} OFFSET ${offset}`, (error, result) => {
          if (!error) {
            resolve(result)
          } else {
            reject(error)
          }
        })
      }
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