const Products = require('../models/ProductModel')
const formidable = require('formidable')

// Route to show all products
exports.index = async (req, res) => {
  try{
    const data = await Products.find()
    res.status(200).render('product/index', {title: 'Products', products: data})
  }catch(err) {
    res.status(500).render('503')
  }
}

// Route to new products
exports.new = async (req, res) => {
  try{
    res.status(200).render('product/new', {title: 'New Product'})
  }catch(err) {
    res.status(500).render('503', {error: err})
  }
}

// Route to save a new product
exports.save = async (req, res) => {
  try{
    const form = formidable({ multiples: true});
    
    form.parse(req, (err, fields, files) => {
      const data = new Products(fields)
      data.images = files.images

      // save db
      data.save()

      res.redirect('/dashboard/products')

    }).on('fileBegin', (name, file) => {
      file.path = './public/media/' + file.name
    })

  } catch(err) {
    res.status(500).render('503', {error: err})
  }
}

// Route to edit one product
exports.edit = async (req, res) => {
  try{
    // retry by prduct id
    const data = await Products.findOne({_id: req.params.id})
    res.status(200).render('product/edit', {title: 'Edit', product: data})
  }catch(err) {
    res.status(500).render('503', {error: err})
  }
}

// Route to sabe a product edition
exports.saveEdit = async (req, res, next) => {
  try{
    const data = new Products(req.body)
    data._id = await req.params.id

    // update by product id
    Products.updateOne({_id: req.params.id}, {$set: data}).exec()

    res.status(200).render('product/edit', {title: 'Edit', product: data, message: 'Product successfully changed!'})

  }catch(err) {
    res.status(500).render('503', {error: err})
  }
}

//Route do delete a product
exports.delete = async (req, res) => {
  try{
    const id = await req.params.id

    // detele by product id
    Products.deleteOne({_id: id}).exec()

    res.redirect('/dashboard/products')
  }catch(err) {
    res.status(500).render('503', {error: err})
  }
}