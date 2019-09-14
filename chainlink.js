const rp = require('request-promise')

const authenticate = (callback) => {
  let cookieJar = rp.jar()
  rp({
    uri: process.env.CL_URL,
    jar: cookieJar,
    path: '/sessions',
    method: 'POST',
    json: {
      'email': process.env.CL_EMAIL,
      'password': process.env.CL_PASSWORD
    }
  }).then(cookie => {
    cookieJar.setCookie(cookie)
    callback(cookieJar)
  }).catch(error => {
    console.log(error)
    callback(error)
  })
}

const updateChainlinkGasPrice = (cookie, newGasPrice, callback) => {
  rp({
    uri: process.env.CL_URL,
    path: '/v2/config',
    method: 'PATCH',
    jar: cookie,
    json: {
      'ethGasPriceDefault': newGasPrice
    }
  }).then(response => {
    callback(response)
  }).catch(error => {
    console.log(error)
    callback(error)
  })
}

exports.updateChainlinkGasPrice = updateChainlinkGasPrice
exports.authenticate = authenticate
