const assert = require('chai').assert
const createRequests = require('../requests').createRequests
const genericRequest = require('../requester').getPrice

describe('ethgasstation', () => {
  it('returns a number', async () => {
    const gasPrice = await genericRequest('https://ethgasstation.info/json/ethgasAPI.json', 'fast', 100000000)
    assert.isNumber(gasPrice)
    assert.isAbove(gasPrice, 0)
  })
})

describe('anyblock', () => {
  it('returns a number', async () => {
    const gasPrice = await genericRequest('https://api.anyblock.tools/latest-minimum-gasprice', 'fast', 1000000000)
    assert.isNumber(gasPrice)
    assert.isAbove(gasPrice, 0)
  })
})

describe('poanetwork', () => {
  it('returns a number', async () => {
    const gasPrice = await genericRequest('https://gasprice.poa.network', 'fast', 1000000000)
    assert.isNumber(gasPrice)
    assert.isAbove(gasPrice, 0)
  })
})

describe('createRequests', () => {
  it('returns a number', async () => {
    const gasPrice = await createRequests()
    assert.isNumber(gasPrice)
    assert.isAbove(gasPrice, 0)
  })
})
