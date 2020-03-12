const Settings = require('../models/Settings')

exports.index = (req, res) => {
  res.status(200).render('dashboard', {message: 'pagina', path: req.path})
}