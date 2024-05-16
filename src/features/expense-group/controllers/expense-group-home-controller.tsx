import { useState } from 'react';

import { ExpenseGroupDetails } from '~/api/types';

import { ExpenseGroupBalanceSummary } from '~/features/expense-group/views/expense-group-balance-summary';
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
      <ExpenseGroupBalanceSummary group={data} userDisplayName='Bruno' />

      <ScreenContainer.HorizontalPaddingBox>
        <Typography.SectionTitle spacingTop='large'>Expenses</Typography.SectionTitle>
      </ScreenContainer.HorizontalPaddingBox>

      <ExpenseGroupToolbar onLayout={(e) => setToolbarHeight(e.nativeEvent.layout.height)} />
    </ScreenContainer>
  );
};

ExpenseGroupHomeController.displayName = 'ExpenseGroupHomeController';

export { ExpenseGroupHomeController };
