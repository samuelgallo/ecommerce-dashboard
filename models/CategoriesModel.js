const mongoose = require('../config/database')

const Categories = new mongoose.Schema({
  name: { type: String, required: true },
  path: { type: String, required: true },
  content: String,
  products: Array,
  status: Boolean,
}, {
  timestamps: true
})

module.exports = mongoose.model('Categories', Categories)