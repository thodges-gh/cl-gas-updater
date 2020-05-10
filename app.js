const createRequests = require('./requests').createRequests
const updateChainlinkGasPrice = require('./chainlink').updateChainlinkGasPrice
const authenticate = require('./chainlink').authenticate
const extrapolate = require('./extrapolator').extrapolate
const logger = require('./logger').logger
const config = require('./config').config

const express = require('express')
const bodyParser = require('body-parser')
const cron = require('node-cron')
const app = express()

let gasPriceHistory = []

app.use(bodyParser.json())

app.get('/health', (req, res) => {
  res.status(200).send('ok')
})

cron.schedule(config.schedule, async () => {
  // Special case for authenticate since it will always fail on standby nodes
  try {
    const cookie = await authenticate(config.chainlink)
    try {
      const currentGasPrice = await createRequests(config.details)
      gasPriceHistory.push(currentGasPrice)
      gasPriceHistory = gasPriceHistory.slice(
        Math.max(gasPriceHistory.length - config.details.extrapolationDatasetSize, 0)
        )
      const extrapolatedGasPrice = extrapolate(gasPriceHistory)
      const gasPrice = Math.max(currentGasPrice, extrapolatedGasPrice)
      await updateChainlinkGasPrice(config.chainlink.url, cookie, gasPrice)
      logger.info('Gas price updated: ' + gasPrice.toString())
    } catch (error) {
      logger.error(error)
    }
  } catch (error) {
    // This keeps the log quiet for standby nodes unless set to debug
    logger.debug(error)
  }
})

app.listen(config.port, () => logger.info(`Listening on port ${config.port}!`))

process.on('SIGINT', () => {
  logger.info('Shutting down')
  process.exit()
})
