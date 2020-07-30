var chai = require('chai')
var chaiHttp = require('chai-http')
var server = require('../config/app.js')
var should = chai.should()

chai.use(chaiHttp)


describe('Routes', function () {
  it('should GET /login', function (done) {
    chai.request(server)
      .get('/login')
      .end(function (err, res) {
        res.should.have.status(200)
        done()
      })
  })
  it('should GET /dashboard', function (done) {
    chai.request(server)
      .get('/dashboard')
      .end(function (err, res) {
        res.should.have.status(200)
        done()
      })
  })

  it('should GET /logout', function (done) {
    chai.request(server)
      .get('/logout')
      .end(function (err, res) {
        res.should.have.status(200)
        done()
      })
  })
  it('should GET /api', function (done) {
    chai.request(server)
      .get('/api')
      .end(function (err, res) {
        res.should.have.status(200)
        done()
      })
  })
})