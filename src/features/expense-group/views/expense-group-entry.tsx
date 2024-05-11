import { useNavigation } from '@react-navigation/native';
import { useCallback, useMemo } from 'react';

import { ExpenseGroup } from '~/api/types';

import { ExpenseGroupCard } from '~/features/expense-group/views/expense-group-card';

import { ExpenseGroupRoutes } from '~/router/app-navigator';

import { Stylable } from '~/ui:lib/shared/interfaces';

import { createBalancesComparator } from '~/utils/sort';

export interface ExpenseGroupItemProps extends Stylable {
  group: ExpenseGroup;
}

const balancesComparator = createBalancesComparator();

const ExpenseGroupItem = ({ group, containerStyle }: ExpenseGroupItemProps) => {
  const navigation = useNavigation();

  const userBalance = useMemo(
    () => ({
      total: group.userBalance.total.sort(balancesComparator),
      borrowed: group.userBalance.borrowed.sort(balancesComparator),
      lent: group.userBalance.lent.sort(balancesComparator),
    }),
    [group.userBalance.borrowed, group.userBalance.lent, group.userBalance.total]
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
    navigation.navigate(ExpenseGroupRoutes.HOME);
  }, [navigation]);

  return (
    <ExpenseGroupCard
      containerStyle={containerStyle}
      members={members}
      name={group.name}
      userBalance={userBalance}
      onPress={handleOpenGroupDetails}
    />
  );
};

ExpenseGroupItem.displayName = 'ExpenseGroupItem';

export { ExpenseGroupItem };
