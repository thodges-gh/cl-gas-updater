const anyblock = require('./anyblock').getPrice
const ethGasStation = require('./ethGasStation').getPrice

const createRequests = async () => {
  const promises = [
    anyblock(),
    ethGasStation(),
  ]
  const results = promises.map(async (getPrice) => await getPrice)
  const prices = []
  for (const result of results) {
    prices.push(await result)
  }
  return Math.max(...prices)
}

exports.createRequests = createRequests
