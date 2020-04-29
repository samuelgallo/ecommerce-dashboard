const User = require('../models/CustomersModel')

exports.index = (req, res) => {
  if (req.session && req.session.user) {
    User.findOne({ email: req.session.user.email }, (err, user) => {
      if (!user) {
        req.session.reset()
        res.redirect('/login')
      } else {
        // template globals
        res.locals.user = user

        res.status(200).render('index', { title: 'Dashboard', message: 'pagina', path: req.path })
      }
    })
  } else {
    res.redirect('/login')
  }

}