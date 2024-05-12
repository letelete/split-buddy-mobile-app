import { useCallback, useMemo } from 'react';

import { ExpenseGroupDetails } from '~/api/types';

import { HeaderButton } from '~/ui:lib/atoms/header';
import { AvatarsStack, AvatarsStackProps } from '~/ui:lib/molecules/labeled-avatars-stack';
import { AppHeader } from '~/ui:lib/widgets/app-header';

export interface ExpenseGroupHomeHeaderProps {
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
    console.warn('Not implemented');
  }, []);

  return (
    <AppHeader
      title={
        <AvatarsStack.Labeled
          containerStyle={{
            flex: 1,
            justifyContent: 'center',
          }}
          images={groupMembersImages}
          label={group.name}
          labelContainerStyle={{ flex: -1 }}
        />
      }
      right={<HeaderButton icon='ellipsis-horizontal-circle' onPress={handleOpenGroupSettings} />}
      hasBack
    />
  );
};

ExpenseGroupHomeHeader.displayName = 'ExpenseGroupHomeHeader';

export { ExpenseGroupHomeHeader };
