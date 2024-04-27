import { Text, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

const SignUpScreen = () => {
  const { styles } = useStyles(stylesheet);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign up</Text>
    </View>
  );
};

SignUpScreen.displayName = 'SignUpScreen';

export { SignUpScreen };

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
