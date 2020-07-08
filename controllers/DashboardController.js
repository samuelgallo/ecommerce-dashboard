const Products = require('../models/ProductModel')
const Customers = require('../models/CustomersModel')

exports.index = async (req, res) => {
  const data = await Products.find()
  const users = await Customers.find()

  var productsStatus = []
  var userRoles = []

  Object.keys(data).forEach((key, index) => {
    if (data[key].status == 'enable') {
      productsStatus['enable'] = productsStatus['enable'] + 1 || 1
    } else {
      productsStatus['disable'] = productsStatus['disable'] + 1 || 1
    }
  })

  Object.keys(users).forEach((key, index) => {
    if (users[key].role == 'admin') {
      userRoles['admin'] = userRoles['admin'] + 1 || 1
    } else if (users[key].role == 'analyst') {
      userRoles['analyst'] = userRoles['analyst'] + 1 || 1
    } else {
      userRoles['assistant'] = userRoles['assistant'] + 1 || 1
    }
  })

  res.status(200).render('index', { title: 'Dashboard', message: 'pagina', path: req.path, productStatus: productsStatus, userRoles: userRoles })
}
