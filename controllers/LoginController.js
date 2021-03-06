const Login = require('../models/LoginModel')


exports.index = async (req, res) => {
  try {
    res.status(200).render('login', { title: 'Login' })
  } catch (err) {
    res.status(500).render('login', { message: 'Can\'t load login page' })
  }
}

exports.auth = async (req, res, next) => {
  try {
    Login.findOne({ email: req.body.email }, (err, user) => {
      if (!user) {
        res.status(401).render('login', { title: 'Login', message: 'Invalid login or password' })
      } else {
        if (user.provider) {
          res.status(401).render('login', { title: 'Login', message: 'You need to use the ' + user.provider + ' to login.' })
        } else {
          // checking if password are the same
          user.comparePassword(req.body.password, function (err, isMatch) {
            if (err) {
              res.status(401).render('login', { title: 'Login', message: 'Invalid password' })
            } else {
              user = {
                email: user.email,
                password: user.password,
                name: user.name,
                id: user._id
              }
              // setting session
              req.session.user = user
              res.locals.user = user
              res.redirect('/dashboard')
            }
          })
        }
      }
    })

  } catch (err) {
    res.status(500).render('503', { message: 'Can\'t load login' })
  }
}
