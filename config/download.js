const AWS = require('aws-sdk')
const fs = require('fs')
const { parse } = require('json2csv')
const request = require('request')

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  Bucket: process.env.AWS_BUCKET
})

const download = (res, fileName, data, fields) => {
  const opts = { fields }
  const csv = parse(data, opts)

  if (process.env.NODE_ENV == 'development') {
    const path = './public/media/upload/' + fileName + Date.now() + '.csv'
    fs.writeFile(path, csv, function (err, data) {
      if (err) {
        throw err
      } else {
        res.download(path)
      }
    })
  } else {
    const params = {
      Bucket: process.env.AWS_BUCKET,
      Key: 'download/' + fileName + Date.now() + '.csv',
      Body: csv,
      ACL: 'public-read',
    }
    s3.upload(params, function (err, data) {
      if (err) {
        res.status(500).render('503', { error: err })

      } else {
        var filePath = data.Location
        res.setHeader('Content-Type', 'text/csv')
        res.setHeader('Content-Disposition', 'attachment; filename=products.csv')
        res.send(filePath)
      }
    })
  }
}
