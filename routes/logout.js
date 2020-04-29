const express = require('express')
const routes = express.Router()

routes.get('/', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.status(500).render('503', { message: 'Can\'t logout this session' })
    }
    res.redirect('/login');
  });
})

module.exports = routes
