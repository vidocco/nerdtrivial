const Router = require('@koa/router')
const router = new Router()

const { questions, question } = require('./controllers')

// sign-up/log-in methods
router
  .get('/questions', questions.get)
  .post('/question', question.post)
  .put('/question', question.put)

module.exports = router
