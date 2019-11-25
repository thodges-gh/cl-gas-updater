const rp = require('request-promise')

const authenticate = async () => {
  const cookie = rp.jar()
  await rp({
    uri: process.env.CL_URL + '/sessions',
    jar: cookie,
    method: 'POST',
    json: {
      'email': process.env.CL_EMAIL,
      'password': process.env.CL_PASSWORD
    }
  })
  return cookie
}

const updateChainlinkGasPrice = async (cookie, newGasPrice) => {
  return await rp({
    uri: process.env.CL_URL + '/v2/config',
    method: 'PATCH',
    jar: cookie,
    json: {
      'ethGasPriceDefault': newGasPrice
    }
  })
}

exports.updateChainlinkGasPrice = updateChainlinkGasPrice
exports.authenticate = authenticate
