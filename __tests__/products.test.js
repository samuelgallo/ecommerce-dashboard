var chai = require('chai')
var chaiHttp = require('chai-http')
var server = require('../config/app.js')
var should = chai.should()
var assert = chai.assert

chai.use(chaiHttp)

// Products Model
const Products = require('../models/ProductModel')
require('dotenv').config()

const productDate = new Date()


describe('Product Test', function () {

  it('Creates a product', function (done) {
    const product = new Products({
      name: productDate,
      sku: productDate,
      price: 10,
      status: 'disable',
      path: '/test-' + productDate,
      quantity: 10
    })
    product.save() //takes some time and returns a promise
      .then(() => {
        assert(!product.isNew)
        done()
      })
  })

  it('Remove a product', function (done) {
    Products.deleteOne({ name: productDate }).then((result) => {
      result.should.to.deep.include({ ok: 1 })
      done()
    })

  })
})