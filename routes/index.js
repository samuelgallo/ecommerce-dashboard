const express = require('express')
const routes = express.Router()

// Just redirection to /dashboard
routes.get('/', (req, res) => {
  res.redirect('/dashboard')
})

module.exports = routes