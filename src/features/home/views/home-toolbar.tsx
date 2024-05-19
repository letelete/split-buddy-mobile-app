import { useCallback } from 'react';

import { Toolbar, ToolbarProps } from '~/ui:lib/molecules/toolbar';

import { NOT_IMPLEMENTED } from '~/utils/mock';

/* -------------------------------------------------------------------------------------------------
 * HomeToolbar
 * -----------------------------------------------------------------------------------------------*/

interface HomeToolbarProps extends ToolbarProps {
  disableNewExpense: boolean;
}

const HomeToolbar = ({ disableNewExpense, ...rest }: Partial<HomeToolbarProps>) => {
  const handleAddExpense = useCallback(() => {
    NOT_IMPLEMENTED();
  }, []);

  const handleAddBuddy = useCallback(() => {
    NOT_IMPLEMENTED();
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

/* -----------------------------------------------------------------------------------------------*/

export { HomeToolbar };
export type { HomeToolbarProps };
