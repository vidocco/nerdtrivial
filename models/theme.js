const { Schema, model } = require('mongoose')

const Theme = new Schema({
  name        : { type: String, required : true, unique : true },
  description : { type: String, required : true, unique : true }
}, { collection : 'themes' })

module.exports = model('Theme', Theme)

