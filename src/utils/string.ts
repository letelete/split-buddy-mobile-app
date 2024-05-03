export const formatCurrency = (value: number, currencyCode: string) => {
  const sign = value === 0 ? '' : value > 0 ? '+' : '-';
  const formatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
    currencyDisplay: 'symbol',
  })
    .format(Math.abs(value))
    .replace(/^([^0-9]+)\s*(.+)$/, '$2 $1');

  return `${sign}${formatted}`;
};
