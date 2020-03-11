const express = require('express')
const app = express()
const port = process.env.PORT || 8080

const startTestServer = () => {
  app.get('/test', (req, res) => {
    res.status(200).json({
      always10Num: 10,
      always10String: '10',
      always15Num: 15,
      always15String: '15',
      always20Num: 20,
      always20String: '20',
      tooHigh: 99
    })
  })

  app.get('/error', (req, res) => {
    res.status(500).send()
  })

  app.listen(port)
}

const stopTestServer = () => {
  process.exit()
}

exports.startTestServer = startTestServer
exports.stopTestServer = stopTestServer
