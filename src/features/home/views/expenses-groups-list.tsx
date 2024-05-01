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
      <ScreenContainer.FullWidthBox containerStyle={styles.expander}>
        <Image
          source={require('./img/buddy-neutral-shadow.png')}
          style={styles.placeholderImageShadow}
        />
        <Image source={require('./img/buddy-neutral.png')} />
        <Typography.Body style={styles.placeholderText}>
          Add your first buddy to start tracking expenses!
        </Typography.Body>
      </ScreenContainer.FullWidthBox>
    );
  }

  return <FlatList data={data} renderItem={renderItem} />;
};

const stylesheet = createStyleSheet((theme) => ({
  expander: {
    flex: 1,
    zIndex: -1,
  },
  placeholderImageShadow: {
    position: 'absolute',
    left: 0,
    top: -96,
    width: '100%',
    zIndex: -1,
  },
  placeholderText: {
    marginTop: theme.margins.lg,
  },
}));

ExpensesGroupsList.displayName = 'ExpensesGroupsList';

export { ExpensesGroupsList };
