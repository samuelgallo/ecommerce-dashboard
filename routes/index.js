const express = require('express')
const routes = express.Router()

routes.get('/', (req, res) => {
  res.redirect('/dashboard')
})

module.exports = routes