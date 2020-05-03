const mongoose = require('../config/database')
const bcrypt = require('bcrypt')

const Login = new mongoose.Schema({
  email: String,
  password: String,
  name: String
}, {
  collection: 'customers'
})

// Compare input password with db password
Login.methods.comparePassword = function (customerPassword, callback) {
  return callback(null, bcrypt.compareSync(customerPassword, this.password))
}

module.exports = mongoose.model('Login', Login)
