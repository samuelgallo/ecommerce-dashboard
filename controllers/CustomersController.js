const Customers = require('../models/CustomersModel')

const bcrypt = require('bcrypt')

exports.index = async (req, res) => {
  try {
    const data = await Customers.find()

    res.status(200).render('customers/index', { title: 'Customers', customers: data })
  } catch (err) {
    res.status(500).render('503', { message: 'Can\' list All Customers' })
  }
}

exports.create = async (req, res) => {
  try {
    res.status(200).render('customers/create', { title: 'Create New Customer' })
  } catch (err) {
    res.status(500).render('503', { message: 'Can\'t create this customer' })
  }
}

exports.save = async (req, res) => {
  try {
    const data = new Customers(req.body)
    const user = Customers.findOne({ email: req.body.email })
    if (req.params.id) {
      data._id = req.params.id
      Customers.updateOne({ _id: req.params.id }, { $set: data }).exec()
    } else {
      if (user) {
        // const salt = await bcrypt.genSalt(10)
        // data.password = await bcrypt.hash(data.password, salt)
        await data.save()
      } else {
        res.status(200).render('customers/create', { title: 'Create New Customer', message: 'This user already exisits' })
      }

    }

    res.redirect('/dashboard/customers')
  } catch (err) {
    res.status(500).render('503', { message: 'Can\'t save this customer' })
  }
}

exports.edit = async (req, res) => {
  try {
    const data = await Customers.findOne({ _id: req.params.id })

    res.status(200).render('customers/edit', { title: 'Edit Customer', customers: data })
  } catch (err) {
    res.status(500).render('503', { message: 'Can\'t edit this customer' })
  }
}

exports.delete = async (req, res) => {
  try {
    const id = await req.params.id
    Customers.deleteOne({ _id: id }).exec()

    res.redirect('/dashboard/customers')
  } catch (err) {
    res.status(500).render('503', { message: 'Cnt\'t delete this customer' })
  }
}
