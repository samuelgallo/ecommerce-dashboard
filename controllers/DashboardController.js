const Settings = require('../models/Settings')

exports.index = (req, res) => {
  res.status(200).render('index', {message: 'pagina', path: req.path})
}