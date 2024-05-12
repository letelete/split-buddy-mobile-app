import { useNavigation } from '@react-navigation/native';
import { ReactNode, useCallback } from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Header, HeaderBackButton, HeaderProps } from '~/ui:lib/atoms/header';
import { AvatarsStack, LabeledAvatarsStackProps } from '~/ui:lib/molecules/labeled-avatars-stack';

export interface AppHeaderProps extends Omit<HeaderProps, 'renderBack'> {
  renderBack?: (props: { defaultBackBehavior: () => void }) => ReactNode;
}

const AppHeader = ({ renderBack, ...rest }: AppHeaderProps) => {
  const navigation = useNavigation();

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const renderDefaultBack = useCallback(
    () => <HeaderBackButton onPress={handleBack} />,
    [handleBack]
  );

  const renderUserBackWithProps = useCallback(
    () => renderBack?.({ defaultBackBehavior: handleBack }),
    [handleBack, renderBack]
  );

  return <Header {...rest} renderBack={renderBack ? renderUserBackWithProps : renderDefaultBack} />;
};

AppHeader.displayName = 'AppHeader';

export { AppHeader };

export interface AppHeaderAvatarsStackTitleProps extends LabeledAvatarsStackProps {}

const AppHeaderAvatarsStackTitle = ({
  containerStyle,
  labelContainerStyle,
  ...rest
}: AppHeaderAvatarsStackTitleProps) => {
  const { styles } = useStyles(appHeaderAvatarsStackTitleStylesheet);
  return (
    <AvatarsStack.Labeled
      containerStyle={[styles.container, containerStyle]}
      labelContainerStyle={[styles.labelContainer, labelContainerStyle]}
      {...rest}
    />
  );
};

AppHeaderAvatarsStackTitle.displayName = 'AppHeaderAvatarsStackTitle';

export { AppHeaderAvatarsStackTitle };

const appHeaderAvatarsStackTitleStylesheet = createStyleSheet(() => ({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  labelContainer: {
    flex: -1,
  },
}));
