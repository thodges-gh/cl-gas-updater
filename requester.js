const rp = require('request-promise')
const convertToWei = require('./helpers').convertToWei

const getPrice = async (url, speed, multiplyBy) => {
  try {
    const response = await rp({
      uri: url,
      json: true
    })
    return convertToWei(response[speed], multiplyBy)
  } catch (error) {
    console.log(error.message)
  }
}

exports.getPrice = getPrice
