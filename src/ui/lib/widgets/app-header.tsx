import { useNavigation } from '@react-navigation/native';
import { ReactNode, useCallback } from 'react';

import { Header, HeaderBackButton, HeaderProps } from '~/ui:lib/atoms/header';

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
