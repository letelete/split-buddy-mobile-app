/* -------------------------------------------------------------------------------------------------
 * Currency
 * -----------------------------------------------------------------------------------------------*/

interface CurrencyFormatterOptions {
  includeSign?: boolean;
}

const formatCurrency = (
  value: number,
  currencyCode: string,
  options: CurrencyFormatterOptions = {
    includeSign: true,
  }
) => {
  const sign = value === 0 ? '' : value > 0 ? '+' : '-';
  const formatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
    currencyDisplay: 'symbol',
  })
    .format(Math.abs(value))
    .replace(/^([^0-9]+)\s*(.+)$/, '$2 $1');

  if (!options.includeSign) {
    return formatted;
  }

  return `${sign}${formatted}`;
};

/* -----------------------------------------------------------------------------------------------*/

export { formatCurrency };
export type { CurrencyFormatterOptions };
