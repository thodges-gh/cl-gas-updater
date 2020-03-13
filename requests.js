const genericRequest = require('./requester').getPrice
const logger = require('./logger').logger

const buildRequestDetails = (details) => {
  const urls = details.urls.split(',')
  const fields = details.fields.split(',')
  const wei = details.wei.split(',')
  const promises = []
  for (i = 0; i < urls.length; i++) {
    promises.push(genericRequest(urls[i], fields[i], wei[i]))
  }
  return promises
}

const createRequests = async (details) => {
  const promises = buildRequestDetails(details)
  const results = await Promise.all(promises)
  let prices = []
  for (const result of results) {
    prices.push(await result)
  }
  logger.debug(prices)
  prices = prices.filter(p => p)
  if (prices.length == 0) {
    prices.push(parseInt(details.fallbackGasPrice))
  }
  logger.debug(prices)
  const gasPrice = Math.max(...prices) + parseInt(details.addedGasPrice)
  return Math.min(gasPrice, details.maxGasPrice)
}

exports.createRequests = createRequests
