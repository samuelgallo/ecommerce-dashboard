const express = require('express')
const routes = express.Router()

// Controller
const Api = require('../controllers/ApiController')

// Routes
routes.get('/', Api.index)
routes.get('/products', Api.products)
routes.get('/categories', Api.categories)
routes.get('/pages', Api.pages)

module.exports = routes