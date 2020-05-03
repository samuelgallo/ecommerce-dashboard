const mongoose = require('mongoose');
require('dotenv').config()

// if in development mode get a local url
const urlDatabase = (process.env.NODE_ENV === 'development') ? process.env.DB_HOST_LOCAL : process.env.DB_HOST_REMOTE

mongoose.connect(urlDatabase, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

mongoose.connection.on('error', (err) => {
  console.log('error', err)
})

mongoose.connection.on('connected', (err, res) => {
  console.log('Mongoose is connected')
})

module.exports = mongoose
