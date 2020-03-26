const express = require('express')
const routes = express.Router()

const upload = require('../config/multer')

// Controllers
const Dashboard = require('../controllers/DashboardController')
const Settings = require('../controllers/SettingsController')

// Routes
routes.get('/', Dashboard.index)

routes.get('/settings', Settings.index)
routes.post('/settings/save', upload.single('logo'), Settings.save)
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
