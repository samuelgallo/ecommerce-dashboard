const Categories = require('../models/CategoriesModel')
const Products = require('../models/ProductModel')

exports.index = async (req, res) => {
  try {
    const data = await Categories.find()
    res.status(200).render('categories/index', { title: 'Categories', categories: data })
  } catch (err) {
    res.status(500).render('503', { message: 'Can\'t render all Categories' })
  }
}

exports.create = async (req, res) => {
  try {
    const dataProducts = await Products.find()
    res.status(200).render('categories/create', { title: 'Create New Category', products: dataProducts })
  } catch (err) {
    res.status(500).render('504', { message: 'Can\'t create this Category' })
  }
}

exports.save = async (req, res) => {
  try {
    const data = new Categories(req.body)
    if (req.params.id) {
      data._id = req.params.id
      Categories.updateOne({ _id: req.params.id }, { $set: data }).exec()
    } else {
      data.save()
    }
    res.redirect('/dashboard/categories')
  } catch (err) {
    res.status(500).render('503', { message: 'Can\'t save this Category' })
  }
}

exports.edit = async (req, res) => {
  try {
    const data = await Categories.findOne({ _id: req.params.id })
    const dataProducts = await Products.find()

    res.status(200).render('categories/edit', { title: 'Edit this Category', categories: data, products: dataProducts })
  } catch (err) {
    res.status(500).render('503', { message: 'Can\'t edit this Category' })
  }
}

exports.delete = async (req, res) => {
  try {
    const id = await req.params.id
    Categories.deleteOne({ _id: id }).exec()
    res.redirect('/dashboard/categories')
  } catch (err) {
    res.status(500).render('503', { message: 'Can\'t delete this Category' })
  }
}