const genericRequest = require('./requester').getPrice

const createRequests = async () => {
  const promises = [
    genericRequest('https://ethgasstation.info/json/ethgasAPI.json', 'fast', 100000000),
    genericRequest('https://api.anyblock.tools/latest-minimum-gasprice', 'fast', 1000000000),
    genericRequest('https://gasprice.poa.network', 'fast', 1000000000),
    // Etherchain returns a 403 currently
    // genericRequest('https://www.etherchain.org/api/gasPriceOracle', 'fast', 1000000000),
  ]
  const results = await Promise.all(promises)
  let prices = []
  for (const result of results) {
    prices.push(await result)
  }
  prices = prices.filter(p => p)
  return Math.max(...prices)
}

exports.createRequests = createRequests
