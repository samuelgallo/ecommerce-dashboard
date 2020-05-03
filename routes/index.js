const express = require('express')
const routes = express.Router()

<<<<<<< HEAD
=======
// Just redirection to /dashboard
>>>>>>> master
routes.get('/', (req, res) => {
  res.redirect('/dashboard')
})

module.exports = routes