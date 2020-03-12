// exports.index = (req, res) => {
//   res.render('home', {
//     title: 'Home'
//   });
// };
const upload = require('../config/multer')

// Models
const Settings = require('../models/Settings')

exports.index = async (req, res) => {
  try{
    const data = await Settings.findOne()
    res.render('settings', {store: data})
  }catch(e) {
    res.render('404', {store: data})
  }
}

exports.save = (req, res) =>{
  // const data = new Settings({
  //   store_name: req.body.store_name,
  // })
  
  let data = new Settings(req.body)


  console.log(data)

  Settings.findOne().then(info => {
    if(info) {
      info.deleteOne({ _id: info._id })
      console.log(info._id)
    }
    data.save()
    res.redirect('/dashboard/settings')
  }).catch(err => {
    console.log(err)
  })
}