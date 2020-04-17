exports.index = async (req, res) => {
  try {
    res.status(200).render('login', { title: 'Login' })
  } catch (err) {
    res.status(500).render('login', { message: 'Can\'t load login page' })
  }
}

exports.auth = async (req, res) => {
  try {

  } catch (err) {
    res.status(500).render('503', { message: 'Can\'t load login' })
  }
}