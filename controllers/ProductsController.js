const Transform = require('stream').Transform
const AWS = require('aws-sdk')
const formidable = require('formidable')
const downloadTool = require('../config/download')
var https = require('https')

// import products
const csv = require('csv-parser')
const fs = require('fs')



const Products = require('../models/ProductModel')

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

//Node.js Function to save image from External URL.
function fetchImage(url, localPath) {
  var fullUrl = url;
  var file = fs.createWriteStream(localPath);
  var request = https.get(url, function (response) {
    response.pipe(file)
  });
}

// Route to show all products
exports.index = async (req, res) => {
  try {
    // find all products
    const data = await Products.find()
    res.status(200).render('product/index', { title: 'Products', products: data })
  } catch (err) {
    res.status(500).render('503')
  }
}

// Route to new products
exports.new = async (req, res) => {
  try {
    res.status(200).render('product/new', { title: 'New Product' })
  } catch (err) {
    res.status(500).render('503', { error: err })
  }
}

// Route to save a new product
exports.save = async (req, res) => {
  try {
    const form = formidable({ multiples: true })

    var dataNow = Date.now()

    form.parse(req, (err, fields, files) => {
      const data = new Products(fields)
      data.images = files.images

      data.images = files.images
      data.images[0].name = dataNow + '-' + files.images.name
      if (process.env.NODE_ENV == 'production') {
        data.images[0].path = 'https://' + process.env.AWS_BUCKET + '.s3.amazonaws.com/' + files.images.name
      } else {
        data.images[0].path = '/public/media/' + files.images.name
      }


      // save db
      data.save()

      res.redirect('/dashboard/products')

    }).on('fileBegin', (name, file) => {

      if (file.name != '') {

        if (process.env.NODE_ENV == 'dev') {
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
              Body: this._writeStream
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
    res.status(500).render('503', { error: err })
  }
}

// Route to edit one product
exports.edit = async (req, res) => {
  try {
    // retry by product id
    const data = await Products.findOne({ _id: req.params.id })
    res.status(200).render('product/edit', { title: 'Edit', product: data })
  } catch (err) {
    res.status(500).render('503', { error: err })
  }
}

// Route to sabe a product edition
exports.saveEdit = async (req, res, next) => {
  try {
    const data = new Products(req.body)
    data._id = await req.params.id

    // update by product id
    Products.updateOne({ _id: req.params.id }, { $set: data }).exec()

    res.status(200).render('product/edit', { title: 'Edit', product: data, message: 'Product successfully changed!' })

  } catch (err) {
    res.status(500).render('503', { error: err })
  }
}

//Route do delete a product
exports.delete = async (req, res) => {
  try {
    const id = await req.params.id

    // detele by product id
    Products.deleteOne({ _id: id }).exec()

    res.redirect('/dashboard/products')
  } catch (err) {
    res.status(500).render('503', { error: err })
  }
}

// import products
exports.import = async (req, res) => {
  res.status(200).render('product/upload', { title: 'Import Products' })
}

// upload by file .csv
exports.upload = (req, res, next) => {

  try {

    const form = formidable({ multiples: true })

    form.parse(req, (err, fields, files) => {
      console.log(files.upload.path)
      fs.createReadStream(files.upload.path)
        .pipe(csv())
        .on('data', (row) => {

          let image_name = Date.now() + '.jpg';
          let image_path = './public/media/upload/' + image_name;
          fetchImage(row.images, image_path);
          const data = new Products(row)

          data.images[1] = image_name

          data.save()

          console.log(data.images['path'])
        })
        .on('end', () => {
          console.log('CSV file successfully processed');
        })

    }).on('fileBegin', (name, file) => {
      file.path = './public/media/upload/' + file.name

    })

    res.redirect('/dashboard/products/import')

  } catch (e) {
    console.log(e);
  }
}

exports.uploadImage = async (req, res, next) => {
  try {
    const form = formidable({ multiples: true })

    form.parse(req, (err, fields, files) => {
      console.log('upload image')

    }).on('fileBegin', (name, file) => {
      file.path = './public/media/' + file.name
    })
    res.status(200)
    console.log('success')
  } catch (err) {
    res.status(500).render('503', { error: err })
  }
}

exports.download = async (req, res) => {
  const data = await Products.find()

  const fields = ['sku', 'name', 'status', 'description', 'special_price', 'price', 'path', 'quantity', 'images']
  try {
    await downloadTool(res, 'products', data, fields)
  } catch (err) {
    res.status(500).render('503', { error: err })
  }
}
