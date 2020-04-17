exports.index = async (req, res) => {
  try {
    res.status(200).render('register', { title: 'Register' })
  } catch (err) {
    res.status(500).render('503', { message: 'Can\'t load register' })
  }
}

exports.save = async (req, res) => {
  try {

    res.redirect('/dashboard')
  } catch (err) {
    res.status(500).render('503', { message: 'Can\'t register' })
  }
}
