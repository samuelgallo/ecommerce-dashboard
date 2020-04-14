const Pages = require('../models/PagesModel')

exports.index = async (req, res) => {
  try {
    const data = await Pages.find()
    res.status('200').render('pages/index', { title: 'Pages', pages: data })
  } catch (err) {
    res.status(500).render('500', { 'message': 'Can\'t load this page' })
  }
}

exports.create = async (req, res) => {
  try {
    res.status(200).render('pages/create', { title: 'Create New Page' })
  } catch (err) {
    res.status(500).render('500', { 'message': 'Can\' create this page' })
  }
}

exports.edit = async (req, res) => {
  try {
    const data = await Pages.findOne({ _id: req.params.id })
    res.status(200).render('pages/edit', { title: 'Edit Page', pages: data })
  } catch (err) {
    res.status(500).render('500', { 'message': 'Can\'t edit this page' })
  }
}

exports.save = async (req, res) => {
  try {
    const fields = new Pages(req.body)
    if (req.params.id) {
      fields._id = req.params.id
      Pages.updateOne({ _id: req.params.id }, { $set: fields }).exec()
    } else {
      fields.save()
    }
    res.redirect('/dashboard/pages')
  } catch (err) {
    res.status(500).render('pages/index', { 'title': 'Can\'t save this page' })
  }
}

exports.delete = async (req, res) => {
  try {
    const id = await req.params.id
    Pages.deleteOne({ _id: id }).exec()

    res.redirect('/dashboard/pages')
  } catch (err) {
    res.status(500).render('500', { 'message': 'Can\'t delete this page' })
  }
}
