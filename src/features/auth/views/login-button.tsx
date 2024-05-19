import * as AppleAuthentication from 'expo-apple-authentication';
import { useMemo } from 'react';
import { ActivityIndicator, Platform, View } from 'react-native';
import { UnistylesRuntime, createStyleSheet, useStyles } from 'react-native-unistyles';

import { useLoginWithProvider } from '~/features/auth/hooks/use-login-with-provider';

import { Typography } from '~/ui:lib/molecules/typography';

import { AppThemes } from '~/ui:styles/unistyles';

/* -------------------------------------------------------------------------------------------------
 * LoginWithAppleButton
 * -----------------------------------------------------------------------------------------------*/

const LoginWithAppleButton = () => {
  const { login, isLoading, error } = useLoginWithProvider('apple');
  const { theme, styles } = useStyles(stylesheet);

  const buttonStyle = useMemo(() => {
    return (UnistylesRuntime.themeName as keyof AppThemes) === 'dark'
      ? AppleAuthentication.AppleAuthenticationButtonStyle.WHITE
      : AppleAuthentication.AppleAuthenticationButtonStyle.BLACK;
  }, []);

  if (isLoading) {
    return <ActivityIndicator color={theme.colors.typography.primary} size='small' />;
  }

  if (Platform.OS === 'ios')
    return (
      <View style={styles.container}>
        <AppleAuthentication.AppleAuthenticationButton
          buttonStyle={buttonStyle}
          buttonType={AppleAuthentication.AppleAuthenticationButtonType.CONTINUE}
          cornerRadius={theme.rounded.full}
          style={styles.button}
          onPress={login}
        />
        {error && <Typography.ErrorBody>{error}</Typography.ErrorBody>}
      </View>
    );

  return null;
};

LoginWithAppleButton.displayName = 'LoginWithAppleButton';

const stylesheet = createStyleSheet(() => ({
  container: {
    width: '100%',
  },
  button: {
    width: '100%',
    height: 56,
  },
}));

/* -----------------------------------------------------------------------------------------------*/

export { LoginWithAppleButton };
