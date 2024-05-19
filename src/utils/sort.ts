import { Balance } from '~/api/types';

import { CompareFn } from '~/utils/types';

/* -------------------------------------------------------------------------------------------------
 * Balance
 * -----------------------------------------------------------------------------------------------*/

const balancesAscendingComparator: CompareFn<Balance> = (a, b) => {
  const delta = a.value - b.value;
  if (delta === 0) {
    return a.currency.code.localeCompare(b.currency.code);
  }
  return delta < 0 ? -1 : 1;
};

const balancesDescendingComparator: CompareFn<Balance> = (a, b) => {
  return balancesAscendingComparator(a, b) * -1;
};

const balancesAbsoluteDescending: CompareFn<Balance> = (a, b) => {
  if (a.value > 0 && b.value > 0) {
    return balancesDescendingComparator(a, b);
  }
  if (a.value < 0 && b.value < 0) {
    return balancesAscendingComparator(a, b);
  }
  return balancesAscendingComparator(a, b);
};

type SortBalancesStrategy = 'ascending' | 'descending' | 'absolute-descending';

const createBalancesComparator = ({
  strategy = 'absolute-descending',
}: {
  strategy?: SortBalancesStrategy;
} = {}) => {
  return (
    {
      ascending: balancesAscendingComparator,
      descending: balancesDescendingComparator,
      'absolute-descending': balancesAbsoluteDescending,
    } satisfies Record<SortBalancesStrategy, CompareFn<Balance>>
  )[strategy];
};

/* -----------------------------------------------------------------------------------------------*/

export { createBalancesComparator };
export type { SortBalancesStrategy };
