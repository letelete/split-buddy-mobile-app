import { ActivityIndicator, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Typography } from '~/ui:lib/molecules/typography';

const SplashController = () => {
  const { styles } = useStyles(stylesheet);

  return (
    <View style={styles.container}>
      <View>
        <Typography.Body>Just Split, Buddy.</Typography.Body>

        <ActivityIndicator />
      </View>
    </View>
  );
};

SplashController.displayName = 'SplashController';

export { SplashController };

const stylesheet = createStyleSheet((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
}));
