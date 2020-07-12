const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const bodyParser = require('body-parser')
const session = require('express-session')
const passport = require('passport')

const app = express()

// Auth middleware
const auth = require('../config/auth')

// Configurations express
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use('/public', express.static(path.join(__dirname, '../public')))
app.use(passport.initialize())
app.use(passport.session())

app.set('views', path.join(__dirname, '../views'))
app.set('view engine', 'ejs')

// Set session
app.use(session({
  name: 'gR3en',
  secret: '@fR-7RlWOY1bxnXOXeggoubdpe$2GNSei}Inf$tu',
  resave: true,
  saveUninitialized: false,
  cookie: {
    secure: false,
    expires: 604800,
    maxAge: 1209600000 //two weeks in milliseconds
  }
}))

// Disable for security questions
app.disable('x-powered-by')

// Routes
app.use('/', require('../routes/index'))
app.use('/dashboard', auth, require('../routes/dashboard'))
app.use('/login', require('../routes/login'))
app.use('/logout', require('../routes/logout'))
app.use('/register', require('../routes/register'))
app.use('/auth', require('../routes/auth'))
app.use('/api', require('../routes/api'))

module.exports = app