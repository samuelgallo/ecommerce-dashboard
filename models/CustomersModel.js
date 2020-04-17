const mongoose = require('../config/database')

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

module.exports = mongoose.model('Customers', Customers)