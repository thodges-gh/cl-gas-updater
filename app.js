const createRequests = require('./requests').createRequests
const updateChainlinkGasPrice = require('./chainlink').updateChainlinkGasPrice
const authenticate = require('./chainlink').authenticate

const express = require('express')
const bodyParser = require('body-parser')
const cron = require('node-cron')
const app = express()
const port = process.env.PORT || 8080
const chainlink = {
  url: process.env.CL_URL || 'http://localhost:6688',
  email: process.env.CL_EMAIL || '',
  password: process.env.CL_PASSWORD || ''
}
const details = {
  urls: process.env.URLS || 'https://ethgasstation.info/json/ethgasAPI.json,https://api.anyblock.tools/latest-minimum-gasprice,https://gasprice.poa.network',
  fields: process.env.FIELDS || 'fastest,fast,fast',
  wei: process.env.WEI || '100000000,1000000000,1000000000'
}

app.use(bodyParser.json())

app.get('/health', (req, res) => {
  res.status(200).send('ok')
})

cron.schedule('0 * * * * *', async () => {
  const cookie = await authenticate(chainlink)
  const gasPrice = await createRequests(details)
  const result = await updateChainlinkGasPrice(chainlink.url, cookie, gasPrice)
  console.log('Gas price updated:', gasPrice)
})

app.listen(port, () => console.log(`Listening on port ${port}!`))

process.on('SIGINT', () => {
  process.exit()
})
