const rp = require('request-promise')

const convertToWei = (input) => {
  return Math.floor(input * 100000000)
}

const getEthGasStationInfoPrice = (callback) => {
  rp({
    uri: 'https://ethgasstation.info/json/ethgasAPI.json',
    json: true
  }).then(response => {
    callback(convertToWei(response.fast))
  }).catch(error => {
    console.log(error)
    callback(error)
  })
}

exports.getEthGasStationInfoPrice = getEthGasStationInfoPrice
