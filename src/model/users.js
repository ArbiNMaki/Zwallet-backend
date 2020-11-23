const connection = require('../configs/db')

const users = {
  getUsers: (name, limit, offset) => {
    return new Promise((resolve, reject) => {
      if (name) {
        connection.query(`SELECT * FROM users WHERE name LIKE ? LIMIT ${offset}, ${limit}, %${name}% ORDER BY date DESC`, (error, result) => {
          if (!error) {
            resolve(result)
          } else {
            reject(error)
          }
        })
      } else {
        connection.query(`SELECT * FROM users LIMIT ${limit} OFFSET ${offset}`, (error, result) => {
          if (!error) {
            resolve(result)
          } else {
            reject(error)
          }
        })
      }
    })
  },
  getUserById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM users WHERE id = ?', id, (error, result) => {
        if (!error) {
          resolve(result)
        } else {
          reject(error)
        }
      })
    })
  },
  addUser: (data) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO users SET ?', data, (error, result) => {
        if (!error) {
          resolve(result)
        } else {
          reject(error)
        }
      })
    })
  },
  updateUser: (id, data) => {
    return new Promise((resolve, reject) => {
      connection.query('UPDATE users SET ? WHERE id = ?', [data, id], (error, result) => {
        if (!error) {
          resolve(result)
        } else {
          reject(error)
        }
      })
    })
  },
  deleteUser: (id) => {
    return new Promise((resolve, reject) => {
      connection.query('DELETE FROM users WHERE id = ?', id, (error, result) => {
        if (!error) {
          resolve(result)
        } else {
          reject(error)
        }
      })
    })
  }
}

module.exports = users