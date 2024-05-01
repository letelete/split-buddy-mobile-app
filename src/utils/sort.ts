import { Balance, CompareFn } from '~/utils/types';

const balancesComparator: CompareFn<Balance> = (a, b) => {
  const delta = a.value - b.value;
  if (delta === 0) {
    return a.currency.code.localeCompare(b.currency.code);
  }
  return delta < 0 ? -1 : 1;
};

export const createBalancesComparator = () => {
  return balancesComparator;
};
