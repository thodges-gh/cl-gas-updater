const extrapolate = (ys) => {
  if (ys.length === 0) {
    throw new Error('Attempted to extrapolate with no data points')
  } else if (ys.length === 1) {
    return ys[0]
  }

  const n = ys.length
  const xs = Array.from(Array(n).keys())

  // Calculate the slope with least squares
  // https://en.wikipedia.org/wiki/Simple_linear_regression#Numerical_example
  const Sx = xs.reduce((a, b) => a + b, 0)
  const Sy = ys.reduce((a, b) => a + b, 0)
  const Sxx = xs.reduce((a, b) => a + b * b, 0)
  const Sxy = ys.reduce((a, b, i) => a + b * xs[i], 0)
  const slope = (n * Sxy - Sx * Sy) / (n * Sxx - Sx * Sx)

  return ys[n - 1] + slope
}

exports.extrapolate = extrapolate
