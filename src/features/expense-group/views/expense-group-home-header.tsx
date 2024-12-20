import { useCallback, useMemo } from 'react';

import { ExpenseGroupDetails } from '~/api/types';

import { HeaderButton } from '~/ui:lib/atoms/header';
import { AvatarsStackProps } from '~/ui:lib/molecules/labeled-avatars-stack';
import { AppHeader, AppHeaderAvatarsStackTitle } from '~/ui:lib/widgets/app-header';

import { NOT_IMPLEMENTED } from '~/utils/mock';

/* -------------------------------------------------------------------------------------------------
 * ExpenseGroupHomeHeader
 * -----------------------------------------------------------------------------------------------*/

interface ExpenseGroupHomeHeaderProps {
  group: ExpenseGroupDetails;
}

const ExpenseGroupHomeHeader = ({ group }: ExpenseGroupHomeHeaderProps) => {
  const groupMembersImages = useMemo<AvatarsStackProps['images']>(
    () =>
      group.members.map((member) => ({
        displayName: member.displayName,
        id: member.id,
        imageUri: member.imageUrl,
      })),
    [group.members]
  );

  const handleOpenGroupSettings = useCallback(() => {
    NOT_IMPLEMENTED();
  }, []);

  return (
    <AppHeader
      right={<HeaderButton icon='ellipsis-horizontal-circle' onPress={handleOpenGroupSettings} />}
      title={<AppHeaderAvatarsStackTitle images={groupMembersImages} label={group.name} />}
      hasBack
    />
  );
};

ExpenseGroupHomeHeader.displayName = 'ExpenseGroupHomeHeader';

/* -----------------------------------------------------------------------------------------------*/

export { ExpenseGroupHomeHeader };
export type { ExpenseGroupHomeHeaderProps };
