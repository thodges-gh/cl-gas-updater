const rp = require('request-promise')
const logger = require('./logger').logger

const authenticate = async (chainlink) => {
  const cookie = rp.jar()
  try {
    await rp({
      uri: chainlink.url + '/sessions',
      jar: cookie,
      method: 'POST',
      json: {
        email: chainlink.email,
        password: chainlink.password
      }
    })
    logger.debug('Authenticated with Chainlink')
  } catch (error) {
    throw 'Could not authenticate with Chainlink'
  }
  return cookie
}

const updateChainlinkGasPrice = async (url, cookie, newGasPrice) => {
  try {
    return await rp({
      uri: url + '/v2/config',
      method: 'PATCH',
      jar: cookie,
      json: {
        ethGasPriceDefault: newGasPrice
      }
    })
  } catch (error) {
    throw 'Could not updated Chainlink gas price'
  }
}

exports.updateChainlinkGasPrice = updateChainlinkGasPrice
exports.authenticate = authenticate
