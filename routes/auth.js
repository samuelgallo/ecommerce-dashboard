const express = require('express')
const routes = express.Router()
const passport = require('passport')

// Passport config
require('../controllers/AuthController')(passport)

// Auth middleware
const auth = require('../config/auth')

// Google Routes
routes.get('/google', passport.authenticate('google'))

routes.get('/google/callback', passport.authenticate('google'), (req, res) => {
  req.session.user = req.user
  res.locals.user = req.user
  res.redirect('/dashboard')
})

// Linkedin Routes
routes.get('/linkedin', passport.authenticate('linkedin'))

routes.get('/linkedin/callback', passport.authenticate('linkedin'), (req, res) => {
  req.session.user = req.user
  res.locals.user = req.user
  res.redirect('/dashboard')
})

module.exports = routes