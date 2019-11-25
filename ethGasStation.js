const rp = require('request-promise')

const convertToWei = (input) => {
  return Math.floor(input * 100000000)
}

const getEthGasStationInfoPrice = async () => {
  const response = await rp({
    uri: 'https://ethgasstation.info/json/ethgasAPI.json',
    json: true
  })
  return convertToWei(response.fast)
}

exports.getEthGasStationInfoPrice = getEthGasStationInfoPrice
