const assert = require('chai').assert
const extrapolate = require('../extrapolator').extrapolate

describe('extrapolate', () => {
  context('when history is empty', () => {
    const gasPriceHistory = []
    it('throws', () => {
      try {
        extrapolate(gasPriceHistory)
      } catch (error) {
        assert.equal(error.message, 'Attempted to extrapolate with no data points')
      }
    })
  })

  context('when history has only one data point', async () => {
    const gasPriceHistory = [10 * 10**9]
    it('returns that one data point', async () => {
      const extrapolatedGasPrice = extrapolate(gasPriceHistory)
      assert.equal(extrapolatedGasPrice, gasPriceHistory[0])
    })
  })

  context('when there are increasing data points', () => {
    const gasPriceHistory = [10 * 10**9, 12 * 10**9, 14 * 10**9]
    it('extrapolates correctly', () => {
        const extrapolatedGasPrice = extrapolate(gasPriceHistory)
        assert.equal(extrapolatedGasPrice, 16 * 10**9)
    })
  })

  context('when there are decreasing data points', () => {
    const gasPriceHistory = [14 * 10**9, 12 * 10**9, 10 * 10**9]
    it('extrapolates correctly', () => {
        const extrapolatedGasPrice = extrapolate(gasPriceHistory)
        assert.equal(extrapolatedGasPrice, 8 * 10**9)
    })
  })
})