const assert = require('chai').assert
const createRequests = require('../requests').createRequests
const genericRequest = require('../requester').getPrice
const testServer = require('./helpers')

describe('ethgasstation', () => {
  it('returns a number', async () => {
    const gasPrice = await genericRequest('https://ethgasstation.info/json/ethgasAPI.json', 'fastest', 100000000)
    assert.isNumber(gasPrice)
    assert.isAbove(gasPrice, 0)
  })
})

describe('anyblock', () => {
  it('returns a number', async () => {
    const gasPrice = await genericRequest('https://api.anyblock.tools/latest-minimum-gasprice', 'instant', 1000000000)
    assert.isNumber(gasPrice)
    assert.isAbove(gasPrice, 0)
  })
})

describe('poanetwork', () => {
  it('returns a number', async () => {
    const gasPrice = await genericRequest('https://gasprice.poa.network', 'instant', 1000000000)
    assert.isNumber(gasPrice)
    assert.isAbove(gasPrice, 0)
  })
})

describe('etherchain', () => {
  it.skip('returns a number', async () => {
    const gasPrice = await genericRequest('https://www.etherchain.org/api/gasPriceOracle', 'fastest', 1000000000)
    assert.isNumber(gasPrice)
    assert.isAbove(gasPrice, 0)
  })
})

describe('createRequests', () => {
  before(() => {
    testServer.startTestServer()
  })

  context('when all data is well formed', () => {
    const details = {
      urls: 'http://localhost:8080/test,http://localhost:8080/test,http://localhost:8080/test',
      fields: 'always10Num,always15Num,always20String',
      wei: '1000000000,1000000000,1000000000',
      fallbackGasPrice: 25000000000,
      addedGasPrice: 1000000000,

    }

    const expected = 21000000000

    it('returns the expected result', async () => {
      const gasPrice = await createRequests(details)
      assert.isNumber(gasPrice)
      assert.equal(gasPrice, expected)
    })
  })

  context('when data is not well formed', () => {
    context('mismatched lengths', () => {
      const details = {
        urls: 'http://localhost:8080/test,http://localhost:8080/test,http://localhost:8080/test',
        fields: 'always10Num,always15Num',
        wei: '1000000000,1000000000',
        fallbackGasPrice: 25000000000,
        addedGasPrice: 1000000000,
      }

      const expected = 16000000000

      it('returns the expected result', async () => {
        const gasPrice = await createRequests(details)
        assert.isNumber(gasPrice)
        assert.equal(gasPrice, expected)
      })
    })

    context('invalid field', () => {
      const details = {
        urls: 'http://localhost:8080/test,http://localhost:8080/test,http://localhost:8080/test',
        fields: 'always10Num,always15Num,doesNotExist',
        wei: '1000000000,1000000000,1000000000',
        fallbackGasPrice: 25000000000,
        addedGasPrice: 1000000000,
      }

      const expected = 16000000000

      it('returns the expected result', async () => {
        const gasPrice = await createRequests(details)
        assert.isNumber(gasPrice)
        assert.equal(gasPrice, expected)
      })
    })

    context('all invalid fields', () => {
      const details = {
        urls: 'http://localhost:8080/test,http://localhost:8080/test,http://localhost:8080/test',
        fields: 'doesNotExist,doesNotExist,doesNotExist',
        wei: '1000000000,1000000000,1000000000',
        fallbackGasPrice: 25000000000,
        addedGasPrice: 1000000000,
      }
      const expected = 26000000000

      it('returns the expected result', async () => {
        const gasPrice = await createRequests(details)
        assert.isNumber(gasPrice)
        assert.equal(gasPrice, expected)
      })
    })
  })

  context('when an endpoint returns an error', () => {
    const details = {
      urls: 'http://localhost:8080/test,http://localhost:8080/error,http://localhost:8080/test',
      fields: 'always10Num,always15Num,always20String',
      wei: '1000000000,1000000000,1000000000',
      fallbackGasPrice: 25000000000,
      addedGasPrice: 1000000000,

    }

    const expected = 21000000000

    it('returns the expected result', async () => {
      const gasPrice = await createRequests(details)
      assert.isNumber(gasPrice)
      assert.equal(gasPrice, expected)
    })
  })

  after(() => {
    testServer.stopTestServer()
  })
})
