require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const PORT = process.env.PORT
const cors = require('cors')
const routerUsers = require('./src/router/users')
const routerTransfer = require('./src/router/transfer')
const routerTopup = require('./src/router/topup')
const bodyParser = require('body-parser')
const helper = require('./src/helpers/helper')

// use middleware

// cors
const corsOptions = {
    origin: 'http://locahost:2020/',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// add morgan
app.use(morgan('dev'))

// router
app.use('/users', routerUsers)
app.use('/transfer', routerTransfer)
app.use('/topup', routerTopup)

// error handling
app.use((err, req, res, next) => {
  helper.response(res, null, err.status, { message: err.message })
  // console.log("bla bla bla bla")
})
app.use('*', (req, res) => {
// res.json()
  helper.response(res, null, 404, { message: 'URL Not Found' })
})

app.listen(PORT, () => console.log(`server is running port ${PORT}`))
