const mongoose = require('../config/database')

const Product = new mongoose.Schema({
  name: {type: String, required: true},
  sku: {type: String, required: true},
  price: Number,
  special_price: Number,
  status: String,
  description: String,
  path: String,
  quantity: Number,
  images: Array
},{
  timestamps: true
})

module.exports = mongoose.model('Product', Product)