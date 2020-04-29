const mongoose = require('../config/database')

const Login = new mongoose.Schema({
  email: String,
  password: String,
  name: String
}, {
  collection: 'customers'
})

module.exports = mongoose.model('Login', Login)
