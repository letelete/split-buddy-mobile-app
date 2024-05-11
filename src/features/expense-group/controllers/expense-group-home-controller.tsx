import { useState } from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { ExpenseGroupToolbar } from '~/features/expense-group/views/expense-group-toolbar';

import { ScreenContainer } from '~/ui:lib/molecules/screen-container';
import { Typography } from '~/ui:lib/molecules/typography';

const ExpenseGroupHomeController = () => {
  const { styles } = useStyles(stylesheet);

  const [toolbarHeight, setToolbarHeight] = useState(0);

  return (
    <ScreenContainer paddingHorizontal={false}>
      <Typography.Body>Expense group home</Typography.Body>
      <ExpenseGroupToolbar onLayout={(e) => setToolbarHeight(e.nativeEvent.layout.height)} />
    </ScreenContainer>
  );
};

const stylesheet = createStyleSheet((theme) => ({}));

ExpenseGroupHomeController.displayName = 'ExpenseGroupHomeController';

export { ExpenseGroupHomeController };
