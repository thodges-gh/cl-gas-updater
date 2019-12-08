const rp = require('request-promise')

const authenticate = async (chainlink) => {
  const cookie = rp.jar()
  await rp({
    uri: chainlink.url + '/sessions',
    jar: cookie,
    method: 'POST',
    json: {
      'email': chainlink.email,
      'password': chainlink.password
    }
  })
  return cookie
}

const updateChainlinkGasPrice = async (url, cookie, newGasPrice) => {
  return await rp({
    uri: url + '/v2/config',
    method: 'PATCH',
    jar: cookie,
    json: {
      'ethGasPriceDefault': newGasPrice
    }
  })
}

exports.updateChainlinkGasPrice = updateChainlinkGasPrice
exports.authenticate = authenticate
