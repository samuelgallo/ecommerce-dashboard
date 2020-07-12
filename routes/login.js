const express = require('express')
const routes = express.Router()

// Login controller
const Login = require('../controllers/LoginController')

// Login Routes
routes.get('/', Login.index)
routes.post('/auth', Login.auth)

module.exports = routes
