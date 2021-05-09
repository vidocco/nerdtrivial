const mongoose = require('mongoose')
const { connection } = mongoose

const models = require('../models')

const { MONGO_URI = 'mongodb://localhost:27017/trivia' } = process.env

const mongoOptions = { useUnifiedTopology : true, useNewUrlParser : true }

mongoose.connect(MONGO_URI, mongoOptions)
  .catch(console.error)

connection.once('open', async () => {
  console.log("MongoDB database connection established successfully")

  await models.Theme.insertMany([
    {
      name        : "Harry Potter",
      description : "The kid with glasses"

    },
    {
      name        : "Warhammer 40k",
      description : "For the emperor"
    },
    {
      name        : "Dr Who",
      description : "A good man goes to war"
    }
  ])

  mongoose.connection.close()
})
