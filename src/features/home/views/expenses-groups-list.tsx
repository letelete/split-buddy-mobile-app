import { useCallback } from 'react';
import { ActivityIndicator, FlatList, Image, ListRenderItemInfo, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { ExpenseGroup } from '~/api/types';

import { ExpenseGroupItem } from '~/features/home/views/expense-group-entry';

import { ScreenContainer } from '~/ui:lib/molecules/screen-container';
import { Typography } from '~/ui:lib/molecules/typography';
import { Suspensible } from '~/ui:lib/shared/interfaces';

export interface ExpensesGroupsListProps extends Suspensible {
  data: ExpenseGroup[];
}

const ExpensesGroupsList = ({ data, loading }: ExpensesGroupsListProps) => {
  const { styles, theme } = useStyles(stylesheet);

  const renderItem = useCallback(
    (info: ListRenderItemInfo<ExpenseGroup>) => <ExpenseGroupItem group={info.item} />,
    []
  );

  if (loading) {
    return <ActivityIndicator />;
  }

  if (data.length === 0) {
    return (
      <ScreenContainer.FullWidthBox containerStyle={styles.placeholderContainer}>
        <Image
          source={require('./img/buddy-neutral-shadow.png')}
          style={styles.placeholderImageShadow}
        />
        <Image source={require('./img/buddy-neutral.png')} />
        <Typography.Body color='secondary'>
          Add your first buddy to start tracking expenses!
        </Typography.Body>
      </ScreenContainer.FullWidthBox>
    );
  }

  return (
    <FlatList
      data={data}
      ItemSeparatorComponent={() => <View style={{ height: theme.margins.md }} />}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      style={styles.list}
    />
  );
};

const stylesheet = createStyleSheet((theme) => ({
  placeholderContainer: {
    flex: 1,
    zIndex: -1,
    alignItems: 'center',
    rowGap: theme.margins.md,
  },
  placeholderImageShadow: {
    position: 'absolute',
    left: 0,
    top: -200,
    width: '100%',
    zIndex: -1,
  },
  list: {
    flex: 1,
  },
}));

ExpensesGroupsList.displayName = 'ExpensesGroupsList';

export { ExpensesGroupsList };
