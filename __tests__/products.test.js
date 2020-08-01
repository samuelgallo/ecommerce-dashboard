var chai = require('chai')
var chaiHttp = require('chai-http')
var server = require('../config/app.js')
var should = chai.should()

chai.use(chaiHttp)


describe('Product', function () {
  it('should POST /', function (done) {
    const product = {
      name: new Date(),
      sku: new Date(),
      price: 10,
      status: 'disable',
      path: '/test-' + new Date(),
      quantity: 10
    }
    chai.request(server)
      .post('/dashboard/products/save').send(product)
      .end(function (err, res) {
        res.should.have.status(200)
        done()
      })
  })
})
