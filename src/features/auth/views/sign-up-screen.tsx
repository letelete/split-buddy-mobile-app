import { Image } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { LoginWithAppleButton } from '~/features/auth/views/login-button';

import { ScreenContainer } from '~/ui:lib/molecules/screen-container';
import { Typography } from '~/ui:lib/molecules/typography';

const SignUpScreen = () => {
  const { styles } = useStyles(stylesheet);

  return (
    <ScreenContainer>
      <Typography.LargeTitle>Bring tranquility to your finances</Typography.LargeTitle>

      <Typography.Body>
        Split, manage, and track your shared expenses among your friends, roommates, co-workers, and
        more.
      </Typography.Body>

      <ScreenContainer.FullWidthBox containerStyle={styles.expander}>
        <Image source={require('./img/buddies.png')} style={styles.backgroundImage} />
      </ScreenContainer.FullWidthBox>

      <LoginWithAppleButton />
    </ScreenContainer>
  );
};

SignUpScreen.displayName = 'SignUpScreen';

export { SignUpScreen };

const stylesheet = createStyleSheet(() => ({
  backgroundImage: {
    position: 'absolute',
    left: 0,
    top: -96,
    width: '100%',
  },
  expander: {
    flex: 1,
    zIndex: -1,
  },
}));
