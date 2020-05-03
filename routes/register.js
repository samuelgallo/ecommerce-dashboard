const express = require('express')
const routes = express.Router()

// Register controller
const Register = require('../controllers/RegisterController')

// Register routes
routes.get('/', Register.index)
routes.post('/save', Register.save)

module.exports = routes