const multer = require('multer')

const upload = multer({ storage: multer.diskStorage({

  destination: function (req, file, cb) {
    cb(null, './public/images/');
  },

  filename: function (req, file, cb) {
    var ext = require('path').extname(file.originalname);
    ext = ext.length>1 ? ext : "." + require('mime').extension(file.mimetype);
    cb(null, file.originalname);
  }

})})

module.exports = upload

