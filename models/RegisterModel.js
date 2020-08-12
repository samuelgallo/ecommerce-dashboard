const mongoose = require('../config/database')
const bcrypt = require('bcrypt')

const Register = new mongoose.Schema({
  name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, lowercase: true, trim: true, required: true, createIndexes: false },
  password: { type: String },
  status: { type: Boolean, default: true },
  role: { type: String, default: 'assistant' },
  passport_id: String,
  token: String,
  picture: String,
  provider: String
}, {
  // getting data from customers collection
  collection: 'customers',
  timestamps: true
})

// Before sabe use bcrypt do encrypt the password
Register.pre('save', function (next) {
  if (!this.isModified('password')) {
    return next()
  }
  this.password = bcrypt.hashSync(this.password, 10)
  next()
})

module.exports = mongoose.model('Register', Register)