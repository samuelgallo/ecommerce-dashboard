const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const http = require('http')
const bodyParser = require('body-parser')
const session = require('express-session')

const app = express()

// Auth middleware
const auth = require('./config/auth')

// Configurations express
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use('/public', express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
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
app.use('/', require('./routes/index'))
app.use('/dashboard', auth, require('./routes/dashboard'))
app.use('/login', require('./routes/login'))
app.use('/logout', require('./routes/logout'))
app.use('/register', require('./routes/register'))

// Server
const port = process.env.PORT || 3000
const server = http.createServer(app)

// Running server
server.listen(port, () => console.log(`Server running on port ${port} - mode: ${process.env.NODE_ENV}`))
