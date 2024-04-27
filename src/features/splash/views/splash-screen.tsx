import { Text, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

const SplashScreen = () => {
  const { styles } = useStyles(stylesheet);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Just Split, Buddy.</Text>
      <Text style={styles.body}>
        Split, manage, and track your shared expenses among your friends, roommates, co-workers, and
        more.
      </Text>
    </View>
  );
};

SplashScreen.displayName = 'SplashScreen';

export { SplashScreen };

const stylesheet = createStyleSheet((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: theme.fontSizes.lg,
    color: theme.colors.typography.primarySoft,
  },
  body: {
    fontSize: theme.fontSizes.base,
    color: theme.colors.typography.secondary,
  },
}));
