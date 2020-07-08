const fs = require('fs')
const { parse } = require('json2csv')

const download = (res, fileName, data, fields) => {
  const opts = { fields }
  const csv = parse(data, opts)
  var path = './public/media/upload/' + fileName + Date.now() + '.csv'
  fs.writeFile(path, csv, function (err, data) {
    if (err) {
      throw err
    } else {
      res.download(path)
    }
  });
}

module.exports = download
