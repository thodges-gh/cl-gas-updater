const convertToWei = (input, amount) => {
  return Math.floor(parseInt(input, 10) * amount)
}

exports.convertToWei = convertToWei
