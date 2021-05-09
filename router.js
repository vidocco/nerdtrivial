const Router = require('@koa/router')
const router = new Router()

const { questions, question, themes, categories } = require('./controllers')

router
  //questions
  .get('/questions', questions.get)
  .post('/question', question.post)
  .put('/question', question.put)
  // themes
  .get('/themes', themes.get)
  // categories
  .get('/categories', categories.get)

module.exports = router
