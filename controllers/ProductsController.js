const Products = require('../models/ProductModel')
const formidable = require('formidable')

// import products
const csv = require('csv-parser')
const fs = require('fs')

var https = require('https');

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
    const form = formidable({ multiples: true });

    form.parse(req, (err, fields, files) => {
      const data = new Products(fields)
      data.images = files.images

      // save db
      data.save()

      res.redirect('/dashboard/products')

    }).on('fileBegin', (name, file) => {
      file.path = './public/media/' + file.name
    })

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

    const form = formidable({ multiples: true });

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
    const form = formidable({ multiples: true });

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