const assert = require('chai').assert
const extrapolate = require('../extrapolator').extrapolate

describe('extrapolate', () => {
  const details = {
    extrapolationHistory: 3
  }

  it('extrapolates correctly', () => {
    // Returns the current gas price if the history is empty
    // History: []
    let extrapolatedGasPrice = extrapolate(details, 10 * 10 ** 9)
    assert.equal(extrapolatedGasPrice, 10 * 10 ** 9)

    // Still extrapolates if we have less than extrapolationHistory readings
    // History: [10 gwei]
    extrapolatedGasPrice = extrapolate(details, 12 * 10 ** 9)
    assert.equal(extrapolatedGasPrice, 14 * 10 ** 9)

    // Extrapolates correctly with extrapolationHistory-many readings
    // History: [10 gwei, 12 gwei]
    extrapolatedGasPrice = extrapolate(details, 14 * 10 ** 9)
    assert.equal(extrapolatedGasPrice, 16 * 10 ** 9)

    // Extrapolates correctly with decreasing values
    extrapolate(details, 12 * 10 ** 9)
    // History: [... 14 gwei, 12 gwei]
    extrapolatedGasPrice = extrapolate(details, 10 * 10 ** 9)
    assert.equal(extrapolatedGasPrice, 8 * 10 ** 9)
  })
})
