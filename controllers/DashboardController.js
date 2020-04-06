exports.index = (req, res) => {
  res.status(200).render('index', {title: 'Dashboard', message: 'pagina', path: req.path})
}