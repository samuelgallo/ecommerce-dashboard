const mongoose = require('../config/database')

const Settings = new mongoose.Schema({
  store_name: {type: String,  default: ''},
  email: {type: String,  trim: true},
  phone: String,
  copyright: String,
  hours: {type: String, default: ''},
  welcome: {type: String, default: ''},
  store_mode: Boolean,

  street_address_1: String,
  street_address_2: String,
  street_address_3: String,
  city: String,
  state: String,
  zip_code: String,


  
  store: {type: String, default: 'default'},

  updated_at: {type: Date, default: Date.now}
})

module.exports = mongoose.model('Settings', Settings)
