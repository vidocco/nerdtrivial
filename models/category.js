const { Schema, model } = require('mongoose')

const Category = new Schema({
  name        : { type: String, required : true, unique : true },
  description : { type: String, required : true, unique : true }
}, { collection : 'categories' })

module.exports = model('Category', Category)
