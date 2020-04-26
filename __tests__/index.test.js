const app = require('../index')
const supertest = require('supertest')
const request = supertest(app)

it('gets the test endpoint', async done => {
  const response = await request.get('/')
  console.log(response)
  expect(response.status).toBe(200)
  //expect(response.body.message).toBe('pass!')
  done()
})
