import { Text, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

const HomeScreen = () => {
  const { styles } = useStyles(stylesheet);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Screen</Text>
    </View>
  );
};

HomeScreen.displayName = 'HomeScreen';

export { HomeScreen };

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
}));
