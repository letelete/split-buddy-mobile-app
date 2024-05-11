import { useMemo, useState } from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { ExpenseGroupDetails } from '~/api/types';

import { ExpenseGroupToolbar } from '~/features/expense-group/views/expense-group-toolbar';

import { AvatarsStack, AvatarsStackProps } from '~/ui:lib/molecules/labeled-avatars-stack';
import { ScreenContainer } from '~/ui:lib/molecules/screen-container';
import { Typography } from '~/ui:lib/molecules/typography';

export interface ExpenseGroupHomeControllerProps {
  data: ExpenseGroupDetails;
}

const ExpenseGroupHomeController = ({ data }: ExpenseGroupHomeControllerProps) => {
  const { styles } = useStyles(stylesheet);

  const [toolbarHeight, setToolbarHeight] = useState(0);

  const membersAvatars = useMemo<AvatarsStackProps['images']>(
    () =>
      data.members.map((member) => ({
        displayName: member.displayName,
        id: member.id,
        imageUri: member.imageUrl,
      })),
    [data.members]
  );

  return (
    <ScreenContainer paddingHorizontal={false}>
      <AvatarsStack.Labeled images={membersAvatars} label={data.name} />
      <Typography.Body>{data.name}</Typography.Body>
      <ExpenseGroupToolbar onLayout={(e) => setToolbarHeight(e.nativeEvent.layout.height)} />
    </ScreenContainer>
  );
};

const stylesheet = createStyleSheet((theme) => ({}));

ExpenseGroupHomeController.displayName = 'ExpenseGroupHomeController';

export { ExpenseGroupHomeController };
