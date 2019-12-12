const createRequests = require('./requests').createRequests
const updateChainlinkGasPrice = require('./chainlink').updateChainlinkGasPrice
const authenticate = require('./chainlink').authenticate
const logger = require('./logger').logger

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
  fields: process.env.FIELDS || 'fast,fast,fast',
  wei: process.env.WEI || '100000000,1000000000,1000000000'
}

app.use(bodyParser.json())

app.get('/health', (req, res) => {
  res.status(200).send('ok')
})

cron.schedule('0 * * * * *', async () => {
  // Special case for authenticate since it will always fail on standby nodes
  try {
    const cookie = await authenticate(chainlink)
    try {
      const gasPrice = await createRequests(details)
      const result = await updateChainlinkGasPrice(chainlink.url, cookie, gasPrice)
      logger.info('Gas price updated: ' + gasPrice.toString())
    } catch (error) {
      logger.error(error)
    }
  } catch (error) {
    // This keeps the log quiet for standby nodes unless set to debug
    logger.debug(error)
  }
})

app.listen(port, () => logger.info(`Listening on port ${port}!`))

process.on('SIGINT', () => {
  logger.info('Shutting down')
  process.exit()
})
