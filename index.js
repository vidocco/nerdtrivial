const Koa        = require('koa')
const app        = new Koa()
const serve      = require('koa-static')
const router     = require('./router.js')
const bodyParser = require('koa-bodyparser')
const cors       = require('@koa/cors')

require('dotenv').config()

const { PORT = 3000, HOST = "http://localhost" } = process.env

const options = {
  origin: 'http://listmera.rocks',
}

app.use(bodyParser())
  .use(cors(options))
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(PORT)
console.log(`App listening at ${HOST}:${PORT}`)
