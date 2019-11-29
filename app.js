const createRequests = require('./requests').createRequests
const updateChainlinkGasPrice = require('./chainlink').updateChainlinkGasPrice
const authenticate = require('./chainlink').authenticate

const express = require('express')
const bodyParser = require('body-parser')
const cron = require('node-cron')
const app = express()
const port = process.env.PORT || 8080

app.use(bodyParser.json())

app.get('/health', (req, res) => {
  res.status(200).send('ok')
})

cron.schedule('0 * * * * *', async () => {
  const cookie = await authenticate()
  const gasPrice = await createRequests()
  const result = await updateChainlinkGasPrice(cookie, gasPrice)
  console.log('Gas price updated:', gasPrice)
})

app.listen(port, () => console.log(`Listening on port ${port}!`))

process.on('SIGINT', () => {
  process.exit()
})
