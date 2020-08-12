const Products = require('../models/ProductModel')
const Categories = require('../models/CategoriesModel')
const Pages = require('../models/PagesModel')

// Route to index
exports.index = async (req, res) => {
  try {
    res.status(200).json({ message: 'ecommerce dashboard api' })
  } catch (err) {
    res.status(500).json({ error: 'Can\' show index' })
  }
}

// Route to show all products
exports.products = async (req, res) => {
  try {
    const data = await Products.find()
    res.status(200).json({ products: data })
  } catch (err) {
    res.status(500).json({ error: 'Can\' show products' })
  }
}

// Route to show all categories
exports.categories = async (req, res) => {
  try {
    const data = await Categories.find()
    res.status(200).json({ categories: data })
  } catch (err) {
    res.status(500).json({ error: 'Can\' show categories' })
  }
}

// Route to show all categories
exports.pages = async (req, res) => {
  try {
    const data = await Pages.find()
    res.status(200).json({ pages: data })
  } catch (err) {
    res.status(500).json({ error: 'Can\' show pages' })
  }
}
