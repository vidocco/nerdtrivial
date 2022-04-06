const { Question } = require('../../models')

module.exports = async ctx => {
  const { body : question } = ctx.request

  console.log(question)
  const db_question = new Question(question)
  const { body, status } = await db_question.save()
    .then(res => ({
      body: question,
      status: 201
    }))
    .catch(err => {
      console.error(err)
      return {
        status: 400,
        body: { error : err.message }
      }
    })
  ctx.body   = body
  ctx.status = status
}

