const fs = require('fs')

// Models
const Settings = require('../models/Settings')

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
    const data = new Settings(req.body)

    // checking if exists data in db
    const getFirstData = await Settings.findOne()

    // if have input image save that, else not change image
    if (req.file) {
      data.logo = await req.file
    } else {
      data.logo = await getFirstData.logo
    }

    // if already has data only update, else save new data
    if (getFirstData) {
      data._id = await getFirstData._id

      Settings.updateOne(data).exec()
    } else {
      data.save()
    }

    res.redirect('/dashboard/settings')

  } catch (err) {
    res.render('503')
  }
}

