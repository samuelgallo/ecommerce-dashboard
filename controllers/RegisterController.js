const Register = require('../models/RegisterModel')

exports.index = async (req, res) => {
  try {
    res.status(200).render('register', { title: 'Register' })
  } catch (err) {
    res.status(500).render('503', { message: 'Can\'t load register' })
  }
}

exports.save = async (req, res) => {
  try {
    //check if user already exists
    const user = await Register.findOne({ email: req.body.email })

    const data = new Register(req.body)
    if (user) {
      res.status(401).render('login', { title: 'Login', message: 'Can\'t register, user already registred' })
    } else {
      await data.save()
      res.redirect('/login')
    }
  } catch (err) {
    res.status(500).render('503', { message: 'Can\'t register' })
  }
}
