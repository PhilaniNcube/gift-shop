const formatCurrency = (amount: number):string => {
  let zaCurrency = Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR'
  })

  return zaCurrency.format(amount)
}

export default formatCurrency
