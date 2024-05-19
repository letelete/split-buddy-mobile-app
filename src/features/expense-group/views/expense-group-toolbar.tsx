import { useCallback } from 'react';

import { Toolbar, ToolbarProps } from '~/ui:lib/molecules/toolbar';

import { NOT_IMPLEMENTED } from '~/utils/mock';

/* -------------------------------------------------------------------------------------------------
 * ExpenseGroupToolbar
 * -----------------------------------------------------------------------------------------------*/

interface HomeToolbarProps extends ToolbarProps {}

const ExpenseGroupToolbar = ({ ...rest }: Partial<HomeToolbarProps>) => {
  const handleAddExpense = useCallback(() => {
    NOT_IMPLEMENTED();
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

/* -----------------------------------------------------------------------------------------------*/

export { ExpenseGroupToolbar };
export type { HomeToolbarProps };
