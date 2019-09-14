const getEthGasStationInfoPrice = require('./ethGasStation').getEthGasStationInfoPrice
const updateChainlinkGasPrice = require('./chainlink').updateChainlinkGasPrice
const authenticate = require('./chainlink').authenticate

const express = require('express')
const bodyParser = require('body-parser')
const cron = require('node-cron')
const app = express()
const port = process.env.EA_PORT || 8080

app.use(bodyParser.json())

app.get('/health', (req, res) => {
	res.status(200).send('ok')
})

cron.schedule('* * * * *', () => {
  authenticate(cookie => {
    getEthGasStationInfoPrice(gasPrice => {
      updateChainlinkGasPrice(cookie, gasPrice, result => {
        console.log("Gas price updated:", gasPrice)
      })
    })
  })
})

app.listen(port, () => console.log(`Listening on port ${port}!`))
