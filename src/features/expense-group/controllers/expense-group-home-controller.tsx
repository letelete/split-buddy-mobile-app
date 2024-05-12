import { useState } from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { ExpenseGroupDetails } from '~/api/types';

import { ExpenseGroupHomeHeader } from '~/features/expense-group/views/expense-group-home-header';
import { ExpenseGroupToolbar } from '~/features/expense-group/views/expense-group-toolbar';

import { ScreenContainer } from '~/ui:lib/molecules/screen-container';
import { Typography } from '~/ui:lib/molecules/typography';

export interface ExpenseGroupHomeControllerProps {
  data: ExpenseGroupDetails;
}

const ExpenseGroupHomeController = ({ data }: ExpenseGroupHomeControllerProps) => {
  const { styles } = useStyles(stylesheet);

  const [toolbarHeight, setToolbarHeight] = useState(0);

  return (
    <ScreenContainer containerStyle={[{ paddingBottom: toolbarHeight }]} variant='fullscreen'>
      <ExpenseGroupHomeHeader group={data} />

      <ScreenContainer.HorizontalPaddingBox>
        <Typography.Body>{data.name}</Typography.Body>
      </ScreenContainer.HorizontalPaddingBox>

      <ExpenseGroupToolbar onLayout={(e) => setToolbarHeight(e.nativeEvent.layout.height)} />
    </ScreenContainer>
  );
};

const stylesheet = createStyleSheet((theme) => ({}));

ExpenseGroupHomeController.displayName = 'ExpenseGroupHomeController';

export { ExpenseGroupHomeController };
