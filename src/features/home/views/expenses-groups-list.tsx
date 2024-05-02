import { useCallback } from 'react';
import { FlatList, Image } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { ScreenContainer } from '~/ui:lib/molecules/screen-container';
import { Typography } from '~/ui:lib/molecules/typography';

export interface ExpensesGroupsListProps {
  data: unknown[];
}

const ExpensesGroupsList = ({ data }: ExpensesGroupsListProps) => {
  const { styles } = useStyles(stylesheet);

  const renderItem = useCallback(() => null, []);

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

  return <FlatList data={data} renderItem={renderItem} />;
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
}));

ExpensesGroupsList.displayName = 'ExpensesGroupsList';

export { ExpensesGroupsList };
