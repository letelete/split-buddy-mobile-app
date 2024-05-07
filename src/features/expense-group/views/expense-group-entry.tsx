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
    () => group.userBalance.borrowed.sort(balancesComparator),
    [group.userBalance.borrowed]
  );
  const lent = useMemo(
    () => group.userBalance.lent.sort(balancesComparator),
    [group.userBalance.lent]
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
