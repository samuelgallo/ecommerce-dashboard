const Login = require('../models/LoginModel')


exports.index = async (req, res) => {
  try {
    res.status(200).render('login', { title: 'Login' })
    // //console.log(req.session)
    // if (req.session) {
    //   res.redirect('/dashboard')
    // } else {
    //   res.status(200).render('login', { title: 'Login' })
    // }


  } catch (err) {
    res.status(500).render('login', { message: 'Can\'t load login page' })
  }
}

exports.auth = async (req, res, next) => {
  //console.log('auth')
  try {

    Login.findOne({ email: req.body.email }, (err, user) => {
      if (!user) {
        res.render('login', { title: 'Login', message: 'Invalid login or password' })
      } else {
        if (req.body.password === user.password) {
          user = {

            email: user.email,
            password: user.password,
            name: user.name,
            id: user._id
          }
          req.session.user = user
          res.redirect('/dashboard')
          //console.log(user)
        } else {
          res.render('login', { title: 'Login', message: 'Invalid password' })
        }
      }
    })

  } catch (err) {
    res.status(500).render('503', { message: 'Can\'t load login' })
  }
}



// app.get('/login', function (req, res) {
//   if (!req.query.username || !req.query.password) {
//     res.send('login failed');    
//   } else if(req.query.username === "amy" || req.query.password === "amyspassword") {
//     req.session.user = "amy";
//     req.session.admin = true;
//     res.send("login success!");
//   }
// });
