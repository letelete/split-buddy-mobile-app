import { useCallback } from 'react';

import { Toolbar, ToolbarProps } from '~/ui:lib/molecules/toolbar';

export interface HomeToolbarProps extends ToolbarProps {}

const ExpenseGroupToolbar = ({ ...rest }: Partial<HomeToolbarProps>) => {
  const handleAddExpense = useCallback(() => {
    console.warn('Not implemented');
  }, []);

  return (
    <Toolbar
      {...rest}
      items={[
        {
          icon: 'add-circle',
          title: 'New expense',
          onPress: handleAddExpense,
        },
      ]}
    />
  );
};

ExpenseGroupToolbar.displayName = 'ExpenseGroupToolbar';

export { ExpenseGroupToolbar };
