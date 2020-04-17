const jwt = require('jsonwebtoken')
require('dotenv').config()

function auth(req, res, next) {
  const token = req.header('auth-token')
  if (!token) return res.redirect('login')

  try {
    //const verified = jwt.verify(token, process.env.TOKEN_SECRET)
    //req.user = verifiedconsole.log(verified)
    next()
  } catch (err) {
    res.status(400).send('Invalid Token')
  }
}

module.exports = auth