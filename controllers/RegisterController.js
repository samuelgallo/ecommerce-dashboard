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
      res.redirect('/register')
    } else {
      await data.save()
      res.redirect('/login')
    }
  } catch (err) {
    res.status(500).render('503', { message: 'Can\'t register' })
  }
}
