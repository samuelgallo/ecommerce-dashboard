const mongoose = require('../config/database')

const Pages = new mongoose.Schema({
	title: { type: String, required: true },
	content: String,
	path: String,
	status: Boolean,

}, {
	timestamps: true
})

module.exports = mongoose.model('Pages', Pages)
