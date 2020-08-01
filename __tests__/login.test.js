var chai = require('chai')
var chaiHttp = require('chai-http')
var server = require('../config/app.js')
var should = chai.should()

chai.use(chaiHttp)


describe('Login Controller', function () {

  it('should fail POST /login/auth', function (done) {
    chai.request(server)
      .post('/login/auth').send({ email: 'adminn', password: 'admin' })
      .end(function (err, res) {
        res.should.have.status(401)
        done()
      })
  })

  it('should success login POST /login/auth', function (done) {
    chai.request(server)
      .post('/login/auth').send({ email: 'admin', password: 'admin' })
      .end(function (err, res) {
        res.should.have.status(200)
        done()
      })
  })
})