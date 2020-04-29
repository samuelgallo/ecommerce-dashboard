const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const http = require('http')
const bodyParser = require('body-parser')
const session = require('express-session')

const app = express()

const auth = require('./config/auth')

// Configurations express
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use('/public', express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(session({
  name: 'gR3en',
  secret: '@fR-7RlWOY1bxnXOXeggoubdpe$2GNSei}Inf$tu',
  resave: true,
  saveUninitialized: false,
  cookie: {
    secure: (process.env.NODE_ENV === 'development') ? false : true,
    expires: 604800,
    maxAge: 1209600000 //two weeks in milliseconds
  }
}))

app.disable('x-powered-by')

// Routes
//app.use('/', require('./routes/dashboard'))
app.use('/dashboard', require('./routes/dashboard'))
app.use('/login', require('./routes/login'))
app.use('/logout', require('./routes/logout'))

//routes.get('/register', Register.index)
//routes.post('/register/save', Register.save)

// Server
const port = process.env.PORT || 3000
const server = http.createServer(app)

server.listen(port, () => console.log(`Server running on port ${port} - mode: ${process.env.NODE_ENV}`))
