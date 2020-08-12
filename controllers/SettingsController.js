const Transform = require('stream').Transform
const AWS = require('aws-sdk')

const Settings = require('../models/Settings')
const formidable = require('formidable')

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

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

    var dataNow = Date.now()

    form.parse(req, (err, fields, files) => {
      const data = new Settings(fields)

      // if have input image save that, else not change image
      if (files.logo.name != '') {
        data.logo = files.logo
        data.logo[0].name = dataNow + '-' + files.logo.name
        if (process.env.NODE_ENV == 'development') {
          data.logo[0].path = '/public/media/' + files.logo.name
        } else {
          data.logo[0].path = 'https://' + process.env.AWS_BUCKET + '.s3.amazonaws.com/' + files.logo.name
        }
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


      setTimeout(function () {
        res.redirect('/dashboard/settings')
      }, 3000)


    }).on('fileBegin', (name, file) => {
      if (file.name != '') {

        if (process.env.NODE_ENV == 'development') {
          file.path = './public/media/' + dataNow + '-' + file.name
        } else {


          file.on('error', e => this._error(e))

          file.open = function () {
            this._writeStream = new Transform({
              transform(chunk, encoding, callback) { callback(null, chunk) }
            })

            this._writeStream.on('error', e => this.emit('error', e))

            s3.upload({
              ACL: 'public-read',
              Bucket: process.env.AWS_BUCKET,
              Key: dataNow + '-' + file.name,
              Body: this._writeStream,
              ContentType: file.type
            }, onUpload)
          }

          file.end = function (cb) {
            this._writeStream.on('finish', () => {
              this.emit('end')
              cb()
            })
            this._writeStream.end()
          }
        }


      }
    })

    // continue execution here
    function onUpload(err, res) {
      //err ? console.log('error:\n', err) : console.log('response:\n', res)
    }

  } catch (err) {
    res.render('503', { message: `can't save this configurations` })
  }
}
