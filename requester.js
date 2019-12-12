const rp = require('request-promise')
const convertToWei = require('./helpers').convertToWei
const logger = require('./logger').logger

const getPrice = async (url, speed, multiplyBy) => {
  try {
    logger.debug('Creating request for: ' + url)
    const response = await rp({
      uri: url,
      json: true
    })
    logger.debug(response)
    return convertToWei(response[speed], multiplyBy)
  } catch (error) {
    throw error
  }
}

exports.getPrice = getPrice
