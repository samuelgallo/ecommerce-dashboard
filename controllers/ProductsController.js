const Products = require('../models/ProductModel')

const formidable = require('formidable')

exports.index = async (req, res) => {
  console.log(__dirname)
  try{
    const data = await Products.find()
    res.status(200).render('product/index', {title: 'Products', products: data})
  }catch(err) {
    res.status(500).render('503')
  }
}

exports.new = async (req, res) => {
  try{
    res.status(200).render('product/new', {title: 'New Product'})
  }catch(err) {
    res.status(500).render('503', {error: err})
  }
}

exports.save = async (req, res) => {

  

  try{
    const form = formidable({ multiples: true, uploadDir: '../public/images/products' });

    
 
form.parse(req, (err, fields, files) => {
  const data = new Products(fields)
  console.log('fields:', fields)
  console.log('files:', files.images)
  data.images = files.images
  data.save()

  res.redirect('/dashboard/products')

});


  } catch(err) {
    res.status(500).render('503', {error: err})
  }
}

exports.edit = async (req, res) => {
  try{
    const data = await Products.findOne({_id: req.params.id})
    res.status(200).render('product/edit', {title: 'Edit', product: data})
  }catch(err) {
    res.status(500).render('503', {error: err})
  }
}

exports.saveEdit = async (req, res, next) => {
  try{
    console.log(req.params.id)
    const data = new Products(req.body)
    data._id = await req.params.id
    console.log(data)
    Products.updateOne({_id: req.params.id}, {$set: data}).exec()

    res.status(200).render('product/edit', {title: 'Edit', product: data, message: 'Product successfully changed!'})
    //res.redirect('back')
  }catch(err) {
    console.log(err)
    res.status(500).render('503', {error: err})
  }
}

exports.delete = async (req, res) => {
  try{
    const id = await req.params.id

    Products.deleteOne({_id: id}).exec()

    res.redirect('/dashboard/products')
  }catch(err) {
    res.status(500).render('503', {error: err})
  }
}