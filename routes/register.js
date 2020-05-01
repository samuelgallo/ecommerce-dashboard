const express = require('express')
const routes = express.Router()

const Register = require('../controllers/RegisterController')

routes.get('/', Register.index)
routes.post('/save', Register.save)

module.exports = routes