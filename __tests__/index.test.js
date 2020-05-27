const request = require('supertest')
const app = require('../config/app')

// test('Should login', async () => {
//   await request(app).get('/login').expect(200)
// })

//test('Shouldt login', async () => {
//  await request(app).post('/login/auth').expect(401)
//})

test('success login', async () => {
  await request(app).post('/login/auth').send({
    email: 'admin',
    password: 'adminz'
  }).expect(200)
})