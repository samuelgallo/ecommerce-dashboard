const Customer = require('../models/CustomersModel')

// middle to check if have user session
function auth(req, res, next) {
  if (req.session && req.session.user) {
    Customer.findOne({ email: req.session.user.email }, (err, user) => {
      if (user) {
        req.user = user
        delete req.user.password
        req.session.user = user
        res.locals.user = user
      }
      next()
    })
  } else {
    res.redirect('/login')
  }
}

module.exports = auth
