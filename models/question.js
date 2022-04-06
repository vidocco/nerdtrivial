const { Schema, model } = require('mongoose')
const { ObjectId } = Schema

const Question = new Schema({
  theme    : { type: ObjectId, required : true, ref: 'Theme' },
  question : { type: String, required : true, unique: true },
  answer   : { type: String, required : true },
  category : { type: ObjectId, required : true, ref: 'Category' },
  author   : { type: String, required : true },
  votes    : { type: Number, required : true,  default : 0 },
  approved : { type: Boolean, required : true, default: false }
}, { collection : 'questions' })

// TODO: validate theme and category exist before save.
// https://stackoverflow.com/questions/18516610/does-mongoose-actually-validate-the-existence-of-an-object-id

module.exports = model('Question', Question)
