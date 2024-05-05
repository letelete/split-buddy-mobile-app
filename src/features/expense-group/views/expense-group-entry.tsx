import { useCallback, useMemo } from 'react';

import { ExpenseGroup } from '~/api/types';

import { ExpenseGroupCard } from '~/features/expense-group/views/expense-group-card';

import { createBalancesComparator } from '~/utils/sort';

export interface ExpenseGroupItemProps {
  group: ExpenseGroup;
}

const balancesComparator = createBalancesComparator();

const ExpenseGroupItem = ({ group }: ExpenseGroupItemProps) => {
  const borrowed = useMemo(
    () => group.balances.filter((balance) => balance.value < 0).sort(balancesComparator),
    [group.balances]
  );
  const lent = useMemo(
    () => group.balances.filter((balance) => balance.value > 0).sort(balancesComparator),
    [group.balances]
  );
  const members = useMemo(
    () =>
      group.members.map((member) => ({
        id: member.id,
        imageUri: member.imageUrl,
        displayName: member.displayName,
      })),
    [group.members]
  );

  const handleOpenGroupDetails = useCallback(() => {
    console.warn('Not implemented');
  }, []);

  return (
    <ExpenseGroupCard
      borrowed={borrowed}
      lent={lent}
      members={members}
      name={group.name}
      onPress={handleOpenGroupDetails}
    />
  );
};

ExpenseGroupItem.displayName = 'ExpenseGroupItem';

export { ExpenseGroupItem };
