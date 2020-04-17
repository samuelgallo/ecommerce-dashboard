const express = require('express')
const routes = express.Router()

const Login = require('../controllers/LoginController')

routes.get('/', Login.index)
routes.post('/', Login.auth)


module.exports = routes