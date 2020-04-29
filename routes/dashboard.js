const express = require('express')
const routes = express.Router()

const upload = require('../config/multer')

// Controllers
const Dashboard = require('../controllers/DashboardController')
const Settings = require('../controllers/SettingsController')
const Products = require('../controllers/ProductsController')
const Pages = require('../controllers/PagesController')
const Categories = require('../controllers/CategoriesController')
const Customers = require('../controllers/CustomersController')

// Routes
routes.get('/', Dashboard.index)

routes.get('/settings', Settings.index)
routes.post('/settings/save', upload.single('logo'), Settings.save)

// Products
routes.get('/products', Products.index)
routes.get('/products/new', Products.new)
routes.post('/products/save', Products.save)
routes.get('/products/edit/:id', Products.edit)
routes.post('/products/edit/:id', Products.saveEdit)
routes.get('/products/delete/:id', Products.delete)
routes.get('/products/import', Products.import)
routes.post('/products/upload', Products.upload)
routes.post('/products/upload/image', Products.uploadImage)

// routes.get('/products', (req, res) => {
//   res.status(200).render('products', {title: 'Products'})
// })

// Categories
routes.get('/categories', Categories.index)
routes.get('/categories/create', Categories.create)
routes.get('/categories/delete/:id', Categories.delete)
routes.get('/categories/edit/:id', Categories.edit)
routes.post('/categories/save', Categories.save)
routes.post('/categories/save/edit/:id', Categories.save)


// Routes Pages
routes.get('/pages', Pages.index)
routes.get('/pages/create', Pages.create)
routes.get('/pages/edit/:id', Pages.edit)
routes.get('/pages/delete/:id', Pages.delete)
routes.post('/pages/save', Pages.save)
routes.post('/pages/save/edit/:id', Pages.save)

// Customers controller
routes.get('/customers', Customers.index)
routes.get('/customers/create', Customers.create)
routes.get('/customers/edit/:id', Customers.edit)
routes.get('/customers/delete/:id', Customers.delete)
routes.post('/customers/save', Customers.save)
routes.post('/customers/save/edit/:id', Customers.save)


/*
routes.get('/login', (req, res) => {
  res.render('dashboard/login', {title: 'Login'});
});
routes.get('/dashboard/register', (req, res) => {});
routes.get('/dashboard/forgot-password', (req, res) => {});
*/

module.exports = routes
