// exports.index = (req, res) => {
//   res.render('home', {
//     title: 'Home'
//   });
// };
//const upload = require('../config/multer').single('logo')
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



		//console.log(req.file)

		const data = new Settings(req.body)

		const getFirstData = await Settings.findOne()

		// const data = new Settings({
		//   _id: getFirstData._id,
		//   store_name: req.body.store_name,
		//   hours: req.body.hours,
		//   welcome: req.body.welcome,
		// })

		if (req.file) {

			data.logo = await req.file
		} else {

			data.logo = await getFirstData.logo
		}



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

