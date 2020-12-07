// const connection = require('../configs/db')

// const transfer = {
//   getTransfer: (name, limit, offset) => {
//     return new Promise((resolve, reject) => {
//       if (name) {
//         connection.query(`SELECT * FROM transfer WHERE name LIKE ? LIMIT ${offset}, ${limit}`, [`%${name}%`], (error, result) => {
//           if (!error) {
//             resolve(result)
//           } else {
//             reject(error)
//           }
//         })
//       } else {
//         connection.query(`SELECT * FROM transfer LIMIT ${limit} OFFSET ${offset}`, (error, result) => {
//           if (!error) {
//             resolve(result)
//           } else {
//             reject(error)
//           }
//         })
//       }
//     })
//   },
//   getTransferById: (id) => {
//     return new Promise((resolve, reject) => {
//       connection.query('SELECT * FROM transfer WHERE id = ?', id, (error, result) => {
//         if (!error) {
//           resolve(result)
//         } else {
//           reject(error)
//         }
//       })
//     })
//   },
//   addTransfer: (data) => {
//     return new Promise((resolve, reject) => {
//       connection.query('INSERT INTO transfer SET ?', data, (error, result) => {
//         if (!error) {
//           resolve(result)
//         } else {
//           reject(error)
//         }
//       })
//     })
//   },
//   deleteTransfer: (id) => {
//     return new Promise((resolve, reject) => {
//       connection.query('DELETE FROM transfer WHERE id = ?', id, (error, result) => {
//         if (!error) {
//           resolve(result)
//         } else {
//           reject(error)
//         }
//       })
//     })
//   }
// }

// module.exports = transfer