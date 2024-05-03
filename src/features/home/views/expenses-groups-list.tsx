import { ComponentType, useCallback } from 'react';
import { ActivityIndicator, FlatList, Image, ListRenderItemInfo, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { ExpenseGroup } from '~/api/types';

import { ExpenseGroupItem } from '~/features/home/views/expense-group-entry';

import { Typography } from '~/ui:lib/molecules/typography';
import { Stylable, Suspensible } from '~/ui:lib/shared/interfaces';

export interface ExpensesGroupsListProps extends Suspensible, Stylable {
  data: ExpenseGroup[];
  StickyHeaderComponent: ComponentType;
}

const ExpensesGroupsList = ({
  data,
  loading,
  containerStyle,
  StickyHeaderComponent,
}: ExpensesGroupsListProps) => {
  const { styles, theme } = useStyles(stylesheet);

  const renderItem = useCallback(
    (info: ListRenderItemInfo<ExpenseGroup>) => <ExpenseGroupItem group={info.item} />,
    []
  );

  return (
    <FlatList
      ListEmptyComponent={
        <View style={styles.placeholderContainer}>
          {loading ? (
            <ActivityIndicator />
          ) : (
            <>
              <Image
                source={require('./img/buddy-neutral-shadow.png')}
                style={styles.placeholderImageShadow}
              />
              <Image source={require('./img/buddy-neutral.png')} />
              <Typography.Body color='secondary'>
                Add your first buddy to start tracking expenses!
              </Typography.Body>
            </>
          )}
        </View>
      }
      contentContainerStyle={containerStyle}
      data={data}
      indicatorStyle={theme.traits.scrollable.indicator}
      ItemSeparatorComponent={() => <View style={{ height: theme.margins.md }} />}
      keyExtractor={(item) => item.id.toString()}
      ListHeaderComponent={StickyHeaderComponent}
      renderItem={renderItem}
      style={styles.list}
    />
  );
};

const stylesheet = createStyleSheet((theme) => ({
  placeholderContainer: {
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
