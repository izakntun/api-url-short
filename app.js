const express = require('express')
const bodyParser = require('body-parser')
const cors = require('./middlewares/cors')

const app = express()

const routes = require('./routes/api')

 /**
  * Middlewares
  */
 app.use(bodyParser.urlencoded({extended: false}))
 app.use(bodyParser.json())

  /**
  * CORS
  */
 app.use(cors)

app.use('/', routes)

module.exports = app