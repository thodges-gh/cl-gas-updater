const config = {
  port: process.env.PORT || 8080,
  chainlink: {
    url: process.env.CL_URL || 'http://localhost:6688',
    email: process.env.CL_EMAIL || '',
    password: process.env.CL_PASSWORD || ''
  },
  details: {
    urls: process.env.URLS || 'https://ethgasstation.info/json/ethgasAPI.json,https://api.anyblock.tools/latest-minimum-gasprice,https://gasprice.poa.network,https://www.etherchain.org/api/gasPriceOracle',
    fields: process.env.FIELDS || 'fast,fast,fast,fast',
    wei: process.env.WEI || '100000000,1000000000,1000000000,1000000000',
    fallbackGasPrice: process.env.FALLBACK_GAS_PRICE || 25000000000,
    addedGasPrice: process.env.ADD_GAS_PRICE || 1000000000,
    maxGasPrice: process.env.MAX_GAS_PRICE || 1000000000000,
    extrapolationHistory: process.env.EXTRAPOLATION_HISTORY || 3
  },
  schedule: process.env.CRON_SCHEDULE || '0 * * * * *'
}

exports.config = config
