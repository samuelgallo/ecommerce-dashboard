const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const http = require('http')
const bodyParser = require('body-parser')


const app = express()

const verify = require('./config/auth')

// Configurations express
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use('/public', express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')


// Routes
app.use('/dashboard', require('./routes/dashboard'))
app.use('/login', require('./routes/login'))

//routes.get('/register', Register.index)
//routes.post('/register/save', Register.save)

// Server
const port = process.env.PORT || 3000
const server = http.createServer(app)

server.listen(port, () => console.log(`Server running on port ${port} - mode: ${process.env.NODE_ENV}`))
