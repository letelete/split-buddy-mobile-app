import { Text, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

const SignUpScreen = () => {
  const { styles } = useStyles(stylesheet);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello, World!</Text>
    </View>
  );
};

SignUpScreen.displayName = 'SignUpScreen';

const stylesheet = createStyleSheet((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: theme.colors.typography,
  },
}));

export { SignUpScreen };
