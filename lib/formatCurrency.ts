const formatCurrency = (amount: number):string => {
  const zaCurrency = Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR'
  })

  return zaCurrency.format(amount)
}

export default formatCurrency
