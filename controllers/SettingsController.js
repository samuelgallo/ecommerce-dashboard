const Settings = require('../models/Settings')
const formidable = require('formidable')

exports.index = async (req, res) => {
  try {
    const data = await Settings.findOne()
    res.render('settings', { title: 'Settings', store: data })
  } catch (e) {
    res.render('404')
  }
}

exports.save = async (req, res) => {

  try {
    // checking if exists data in db
    const getFirstData = await Settings.findOne()

    var form = new formidable.IncomingForm()

    form.parse(req, (err, fields, files) => {
      const data = new Settings(fields)

      // if have input image save that, else not change image
      if (files.logo.name != '') {
        data.logo = files.logo
      } else {
        data.logo = getFirstData.logo
      }

      // if already has data only update, else save new data
      if (getFirstData) {
        data._id = getFirstData._id

        Settings.updateOne(data).exec()
      } else {
        data.save()
      }

      res.redirect('/dashboard/settings')

    }).on('fileBegin', (name, file) => {
      if (file.name != '') {
        file.path = './public/media/' + file.name
      }
    })



  } catch (err) {
    res.render('503', { message: `can't save this configurations` })
  }
}

