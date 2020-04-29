const mongoose = require('../config/database')
const bcrypt = require('bcrypt')

const Customers = new mongoose.Schema({
  name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, lowercase: true, trim: true, required: true },
  phone: String,
  birthday: String,
  newsletter: String,
  password: String,
  address: Array,
  status: Boolean
}, {
  timestamps: true
})

Customers.virtual('fullname').get(() => {
  return this.name + ' ' + this.last_name
})

Customers.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next()
  }
  this.password = bcrypt.hashSync(this.password, 10)
  next()
})

Customers.methods.comparePassword = function (plaintext, callback) {
  return callback(null, bcrypt.compareSync(plaintext, this.password));
};

module.exports = mongoose.model('Customers', Customers)