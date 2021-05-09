const mongoose = require('mongoose')
const { connection } = mongoose

const models = require('./models')

const { MONGO_URI = 'mongodb://localhost:27017/trivia' } = process.env

const mongoOptions = { useUnifiedTopology : true, useNewUrlParser : true }

module.exports = () => {
  mongoose.connect(MONGO_URI, mongoOptions)
    .catch(console.error)

  connection.once('open', () => {
    console.log("MongoDB database connection established successfully")
  })
}

