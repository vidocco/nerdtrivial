const { Schema, model } = require('mongoose')
const { ObjectId } = Schema

const Question = new Schema({
  theme    : { type: ObjectId, required : true },
  question : { type: String, required : true, unique: true },
  answer   : { type: String, required : true },
  category : { type: ObjectId, required : true },
  author   : { type: String, required : true },
  votes    : { type: Number, required : true,  default : 0 },
  approved : { type: Boolean, required : true, default: false }
}, { collection : 'questions' })

module.exports = model('Question', Question)
