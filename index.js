const Koa        = require('koa')
const app        = new Koa()
const router     = require('./router.js')
const bodyParser = require('koa-bodyparser')
const cors       = require('@koa/cors')

const db_init = require("./mongo")

require('dotenv').config()

const {
  PORT = 3000,
  HOST = 'http://localhost'
} = process.env

const corsOptions = {
  origin: '*',
}

db_init()

app.use(bodyParser())
  .use(cors(corsOptions))
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(PORT)
console.log(`App listening at ${HOST}:${PORT}`)
