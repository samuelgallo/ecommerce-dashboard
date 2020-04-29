const jwt = require('jsonwebtoken')
require('dotenv').config()

function auth(req, res, next) {

  try {
    //console.log('auth.js')
    //console.log(req.session)
    //const verified = jwt.verify(token, process.env.TOKEN_SECRET)
    //req.user = verifiedconsole.log(verified)
    if (req.session) {
      return next()

    } else {
      return res.redirect('/login')
    }

    next()
  } catch (err) {
    res.status(400).send('Invalid Token')
  }
}

module.exports = auth