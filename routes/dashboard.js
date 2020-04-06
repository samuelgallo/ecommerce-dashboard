const express = require('express')
const routes = express.Router()

const upload = require('../config/multer')

// Controllers
const Dashboard = require('../controllers/DashboardController')
const Settings = require('../controllers/SettingsController')
const Products = require('../controllers/ProductsController')

// Routes
routes.get('/', Dashboard.index)

routes.get('/settings', Settings.index)
routes.post('/settings/save', upload.single('logo'), Settings.save)

routes.get('/products', Products.index)
routes.get('/products/new', Products.new)
routes.post('/products/save', Products.save)
routes.get('/products/edit/:id', Products.edit)
routes.post('/products/edit/:id', Products.saveEdit)
routes.get('/products/delete/:id', Products.delete)

// routes.get('/products', (req, res) => {
//   res.status(200).render('products', {title: 'Products'})
// })

routes.get('/categories', (req, res) => {
  res.status(200).render('catalog/index', {title: 'Category'})
})

routes.get('/pages', (req, res) => {
  res.status(200).render('pages/index', {title: 'Products'})
})

routes.get('/customers', (req, res) => {
  res.status(200).render('customer/index', {title: 'Customers'})
})
/*
routes.get('/dashboard/products', (req, res) => {});
routes.get('/dashboard/product:id', (req, res) => {});
routes.get('/dashboard/categories', (req, res) => {});
routes.get('/dashboard/category/:id', (req, res) => {});
routes.get('/dashboard/configuration', (req, res) => {});
routes.get('/dashboard/pages', (req, res) => {});
routes.get('/dashboard/page/:id', (req, res) => {});

routes.get('/login', (req, res) => {
  res.render('dashboard/login', {title: 'Login'});
});
routes.get('/dashboard/register', (req, res) => {});
routes.get('/dashboard/forgot-password', (req, res) => {});
*/

module.exports = routes
