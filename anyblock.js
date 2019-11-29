const rp = require('request-promise')
const convertToWei = require('./helpers').convertToWei

const getPrice = async () => {
  const response = await rp({
    uri: 'https://api.anyblock.tools/latest-minimum-gasprice',
    json: true
  })
  return convertToWei(response.fast, 1000000000)
}

exports.getPrice = getPrice
