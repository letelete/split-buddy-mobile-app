import { useCallback } from 'react';

import { Toolbar, ToolbarProps } from '~/ui:lib/molecules/toolbar';

export interface HomeToolbarProps extends ToolbarProps {
  disableNewExpense: boolean;
}

const HomeToolbar = ({ disableNewExpense, ...rest }: Partial<HomeToolbarProps>) => {
  const handleAddExpense = useCallback(() => {
    console.warn('Not implemented');
  }, []);

  const handleAddBuddy = useCallback(() => {
    console.warn('Not implemented');
  }, []);

  return (
    <Toolbar
      {...rest}
      items={[
        {
          icon: 'add-circle',
          title: 'New expense',
          disabled: disableNewExpense,
          onPress: handleAddExpense,
        },
        {
          title: 'Add buddy',
          disabled: false,
          onPress: handleAddBuddy,
        },
      ]}
    />
  );
};

HomeToolbar.displayName = 'HomeToolbar';

export { HomeToolbar };
