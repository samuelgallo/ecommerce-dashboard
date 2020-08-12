const http = require('http')
const app = require('./config/app')
// Server
const port = process.env.PORT || 3000
const server = http.createServer(app)

// Running server
server.listen(port, () => console.log(`🚀 Server running on port ${port} - mode: ${process.env.NODE_ENV}`))
