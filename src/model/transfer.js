const connection = require('../configs/db')

const transfer = {
  getTransfer: (id, limit, offset) => {
    return new Promise((resolve, reject) => {
      if (id) {
        connection.query(`SELECT * FROM transfer WHERE id LIKE ? LIMIT ${limit}, ${offset}, %${id}%  ORDER BY id DESC` , (error, result) => {
          if (!error) {
            resolve(result)
          } else {
            reject(error)
          }
        })
      } else {
        connection.query(`SELECT * FROM transfer LIMIT ${limit} OFFSET ${offset}`, (error, result) => {
          if (!error) {
            resolve(result)
          } else {
            reject(error)
          }
        })
      }
    })
  },
  getTransferById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM transfer WHERE id = ?', id, (error, result) => {
        if (!error) {
          resolve(result)
        } else {
          reject(error)
        }
      })
    })
  },
  addTransfer: (data) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO transfer SET ?', data, (error, result) => {
        if (!error) {
          resolve(result)
        } else {
          reject(error)
        }
      })
    })
  },
  deleteTransfer: (id) => {
    return new Promise((resolve, reject) => {
      connection.query('DELETE FROM transfer WHERE id = ?', id, (error, result) => {
        if (!error) {
          resolve(result)
        } else {
          reject(error)
        }
      })
    })
  }
}

module.exports = transfer