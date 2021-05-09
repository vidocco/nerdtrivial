const mongoose = require('mongoose')
const { connection } = mongoose

const models = require('../models')

const { MONGO_URI = 'mongodb://localhost:27017/trivia' } = process.env

const mongoOptions = { useUnifiedTopology : true, useNewUrlParser : true }

mongoose.connect(MONGO_URI, mongoOptions)
  .catch(console.error)

connection.once('open', async () => {
  console.log("MongoDB database connection established successfully")

  await models.Category.insertMany([
    {
      name        : "Books",
      description : "Book stuff"
    },
    {
      name        : "Media",
      description : "Tv and Movies"
    },
    {
      name        : "Games",
      description : "Video games and board games"
    },
    {
      name        : "Comics & Manga",
      description : "Explains itself"
    },
    {
      name        : "Internet Culture",
      description : "Meme big boy"
    },
    {
      name        : "Random Trivia",
      description : "Just useless knowledge"
    },
  ])

  mongoose.connection.close()
})
