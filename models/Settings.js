const mongoose = require('../config/database')

const Settings = new mongoose.Schema({
	store_name: { type: String, required: true },
	email: { type: String, lowercase: true, trim: true, required: true },
	phone: { type: String, required: true },
	copyright: String,
	hours: String,
	welcome: String,
	store_mode: Boolean,

	street_address_1: String,
	street_address_2: String,
	street_address_3: String,
	city: String,
	state: String,
	zip_code: String,

	//logo: Buffer, Object
	logo: Array
},
	{
		timestamps: true
	})

module.exports = mongoose.model('Settings', Settings)
