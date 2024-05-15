import { useState } from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { ExpenseGroupDetails } from '~/api/types';

import { ExpenseGroupBalanceCarousel } from '~/features/expense-group/views/expense-group-balance-carousel';
import { ExpenseGroupHomeHeader } from '~/features/expense-group/views/expense-group-home-header';
import { ExpenseGroupToolbar } from '~/features/expense-group/views/expense-group-toolbar';

import { ScreenContainer } from '~/ui:lib/molecules/screen-container';
import { Typography } from '~/ui:lib/molecules/typography';

export interface ExpenseGroupHomeControllerProps {
  data: ExpenseGroupDetails;
}

const ExpenseGroupHomeController = ({ data }: ExpenseGroupHomeControllerProps) => {
  const [toolbarHeight, setToolbarHeight] = useState(0);

  return (
    <ScreenContainer containerStyle={[{ paddingBottom: toolbarHeight }]} variant='fullscreen'>
      <ExpenseGroupHomeHeader group={data} />

      {/* TODO: propagate authenticated user data */}
      <ExpenseGroupBalanceCarousel group={data} userDisplayName='John' />

      <ScreenContainer.HorizontalPaddingBox>
        <Typography.SectionTitle spacingTop='large'>Expenses</Typography.SectionTitle>
      </ScreenContainer.HorizontalPaddingBox>

      <ExpenseGroupToolbar onLayout={(e) => setToolbarHeight(e.nativeEvent.layout.height)} />
    </ScreenContainer>
  );
};

ExpenseGroupHomeController.displayName = 'ExpenseGroupHomeController';

export { ExpenseGroupHomeController };
