var chai = require('chai')
var chaiHttp = require('chai-http')
var server = require('../config/app.js')
var should = chai.should()

chai.use(chaiHttp)


describe('App', function () {
  it('should GET /', function (done) {
    chai.request(server)
      .get('/')
      .end(function (err, res) {
        res.should.have.status(200)
        res.should.be.a('object');

        done()
      })
  })
})