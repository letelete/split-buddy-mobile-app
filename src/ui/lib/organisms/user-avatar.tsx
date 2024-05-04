import { ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { useStyles } from 'react-native-unistyles';

import { Balance } from '~/api/types';

import { useGradientForBalance } from '~/ui:hooks/use-color-for-balance';

import { BorderGradient } from '~/ui:lib/atoms/border-gradient';
import { PersonAvatar } from '~/ui:lib/atoms/person-avatar';
import { Stylable } from '~/ui:lib/shared/interfaces';

export interface UserAvatarProps extends Stylable {
  balances: Balance[];
  displayName: string;
  imageUri?: string;
}

const UserAvatar = ({ balances, displayName, imageUri, containerStyle }: UserAvatarProps) => {
  const { theme } = useStyles();
  const GradientForBalance = useGradientForBalance(balances);

  return (
    <BorderGradient
      borderRadius={theme.rounded.full}
      borderWidth={1}
      containerStyle={containerStyle}
      renderGradient={(style) => <GradientForBalance containerStyle={style} fill />}
    >
      <PersonAvatar displayName={displayName} imageUri={imageUri} />
    </BorderGradient>
  );
};

UserAvatar.displayName = 'UserAvatar';

export { UserAvatar };
