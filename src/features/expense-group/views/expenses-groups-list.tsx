import { ComponentType, useCallback } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ListRenderItemInfo,
  StyleProp,
  View,
  ViewStyle,
} from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { ExpenseGroup } from '~/api/types';

import { ExpenseGroupItem } from '~/features/expense-group/views/expense-group-entry';

import { Typography } from '~/ui:lib/molecules/typography';
import { Stylable, Suspensible } from '~/ui:lib/shared/interfaces';

export interface ExpensesGroupsListProps extends Suspensible, Stylable {
  data: ExpenseGroup[];
  ListHeaderComponent: ComponentType;
  itemContainerStyle?: StyleProp<ViewStyle>;
  placeholderContainerStyle?: StyleProp<ViewStyle>;
}

const ExpensesGroupsList = ({
  data,
  loading,
  containerStyle,
  ListHeaderComponent,
  itemContainerStyle,
  placeholderContainerStyle,
}: ExpensesGroupsListProps) => {
  const { styles, theme } = useStyles(stylesheet);

  const renderItem = useCallback(
    (info: ListRenderItemInfo<ExpenseGroup>) => (
      <ExpenseGroupItem containerStyle={itemContainerStyle} group={info.item} />
    ),
    [itemContainerStyle]
  );

  return (
    <FlatList
      ListEmptyComponent={
        <View style={[styles.placeholderContainer, placeholderContainerStyle]}>
          {loading ? (
            <ActivityIndicator />
          ) : (
            <>
              <Image
                source={require('./img/buddy-neutral-shadow.png')}
                style={styles.placeholderImageShadow}
              />
              <Image source={require('./img/buddy-neutral.png')} />
              <Typography.Body color='secondary' containerStyle={styles.placeholderText}>
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
      keyExtractor={(item) => item.id}
      ListHeaderComponent={ListHeaderComponent}
      renderItem={renderItem}
      style={styles.list}
    />
  );
};

const stylesheet = createStyleSheet((theme, runtime) => ({
  placeholderContainer: {
    alignItems: 'center',
    rowGap: theme.margins.md,
  },
  placeholderImageShadow: {
    position: 'absolute',
    left: 0,
    right: 0,
    width: runtime.screen.width,
    top: -200,
    zIndex: -1,
  },
  placeholderText: {
    textAlign: 'center',
    maxWidth: '80%',
  },
  list: {
    flex: 1,
  },
}));

ExpensesGroupsList.displayName = 'ExpensesGroupsList';

export { ExpensesGroupsList };
